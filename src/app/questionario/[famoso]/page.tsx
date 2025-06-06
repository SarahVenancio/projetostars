'use client'; // Indica que este componente é um Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Para navegação programática
import ComponentePergunta from '@/app/ui/ComponentePergunta'; // Importa o ComponentePergunta

// Re-exporta a interface Pergunta para ser usada aqui, se necessário,
// ou se o ComponentePergunta a exportar.
// Ou, se a interface já estiver no ComponentePergunta.tsx,
// basta garantir que a tipagem esteja correta.
// Vamos manter a interface aqui para clareza, pois a lógica de estado a utiliza.
interface Pergunta {
  pergunta: string;
  alternativas: string[];
  respostaCorreta: string;
}


export default function PaginaQuestionarioFamoso() {
  const params = useParams();
  const nomeFamosoCodificado = Array.isArray(params.famoso) ? params.famoso[0] : params.famoso;
  const nomeFamoso = decodeURIComponent(nomeFamosoCodificado || '');

  const router = useRouter();

  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState<{ [key: number]: string }>({});
  const [questionarioFinalizado, setQuestionarioFinalizado] = useState<boolean>(false);
  const [pontuacao, setPontuacao] = useState<number>(0);
  const [respostasCorretas, setRespostasCorretas] = useState<number>(0);
  const [respostasErradas, setRespostasErradas] = useState<number>(0);

  useEffect(() => {
    async function carregarQuestionario() {
      if (!nomeFamoso) {
        setErro("Nome do famoso não encontrado na URL.");
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro(null);
      setPerguntas([]);
      setRespostasSelecionadas({});
      setQuestionarioFinalizado(false);
      setPontuacao(0);
      setRespostasCorretas(0);
      setRespostasErradas(0);

      try {
        const resposta = await fetch('/api/gerar-questionario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nomeFamoso }),
        });

        if (!resposta.ok) {
          const dadosErro = await resposta.json();
          throw new Error(dadosErro.erro || `Erro HTTP: ${resposta.status}`);
        }

        const dados: { questionario: Pergunta[] } = await resposta.json(); // Tipando a resposta
        if (dados.questionario && Array.isArray(dados.questionario) && dados.questionario.length > 0) {
          setPerguntas(dados.questionario);
        } else {
          setErro("O questionário retornado está vazio ou em formato inválido.");
        }
      } catch (e: unknown) { // CORRIGIDO: usando unknown
        console.error("Erro ao buscar questionário:", e);
        if (e instanceof Error) {
          setErro(e.message || "Não foi possível carregar o questionário. Tente novamente.");
        } else {
          setErro("Um erro desconhecido ocorreu ao carregar o questionário. Tente novamente.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarQuestionario();
  }, [nomeFamoso]);

  const lidarComSelecaoResposta = (indicePergunta: number, resposta: string) => {
    setRespostasSelecionadas((prev) => ({
      ...prev,
      [indicePergunta]: resposta,
    }));
  };

  const lidarComEnvioQuestionario = () => {
    let acertos = 0;
    perguntas.forEach((pergunta, indice) => {
      if (respostasSelecionadas[indice] === pergunta.respostaCorreta) {
        acertos++;
      }
    });
    setPontuacao(acertos * 10);
    setRespostasCorretas(acertos);
    setRespostasErradas(perguntas.length - acertos);
    setQuestionarioFinalizado(true);
  };

  const lidarComNovoQuestionario = () => {
    router.push('/');
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <p className="text-2xl text-gray-700">Carregando questionário sobre {nomeFamoso}...</p>
        <div className="mt-4 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erro ao carregar o questionário!</h1>
        <p className="text-xl text-gray-700 mb-8">{erro}</p>
        <button
          onClick={lidarComNovoQuestionario}
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold"
        >
          Tentar Outro Famoso
        </button>
      </main>
    );
  }

  if (perguntas.length === 0 && !carregando && !erro) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">Nenhum questionário encontrado!</h1>
        <p className="text-xl text-gray-700 mb-8">Não foi possível gerar perguntas para &quot;{nomeFamoso}&quot;. Tente um famoso diferente.</p>
        <button
          onClick={lidarComNovoQuestionario}
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold"
        >
          Voltar para a Página Inicial
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Questionário sobre <span className="text-blue-600">{nomeFamoso}</span>
        </h1>

        {perguntas.map((pergunta, indice) => (
          <ComponentePergunta
            key={indice}
            indice={indice}
            pergunta={pergunta}
            respostaSelecionada={respostasSelecionadas[indice]}
            onSelectResposta={(resposta) => lidarComSelecaoResposta(indice, resposta)}
            questionarioFinalizado={questionarioFinalizado}
          />
        ))}

        {!questionarioFinalizado ? (
          <button
            onClick={lidarComEnvioQuestionario}
            disabled={Object.keys(respostasSelecionadas).length !== perguntas.length}
            className={`
              w-full p-4 rounded-md text-xl font-semibold mt-8
              ${Object.keys(respostasSelecionadas).length === perguntas.length
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }
              transition duration-300 ease-in-out
            `}
          >
            Enviar Questionário
          </button>
        ) : (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center shadow-inner">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Resultados do Questionário!</h2>
            <p className="text-2xl text-gray-800 mb-2">Sua Pontuação: <span className="font-bold text-purple-700">{pontuacao}</span> de {perguntas.length * 10}</p>
            <p className="text-xl text-green-700">Acertos: <span className="font-bold">{respostasCorretas}</span></p>
            <p className="text-xl text-red-700 mb-6">Erros: <span className="font-bold">{respostasErradas}</span></p>
            <button
              onClick={lidarComNovoQuestionario}
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold"
            >
              Fazer Outro Questionário
            </button>
          </div>
        )}
      </div>
    </main>
  );
}