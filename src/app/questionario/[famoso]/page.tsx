// app/questionario/[famoso]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ComponentePergunta from '@/app/ui/ComponentePergunta';

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

        const dados: { questionario: Pergunta[] } = await resposta.json();
        if (dados.questionario && Array.isArray(dados.questionario) && dados.questionario.length > 0) {
          setPerguntas(dados.questionario);
        } else {
          setErro("O questionário retornado está vazio ou em formato inválido.");
        }
      } catch (e: unknown) {
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
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-900 to-blue-950 text-gray-100">
        <p className="text-3xl text-yellow-400 animate-pulse">
          Carregando questionário sobre <span className="font-bold">{nomeFamoso}</span>...
        </p>
        <div className="mt-8 w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-900 to-blue-950 text-gray-100 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-6 animate-bounce">Erro ao carregar o questionário!</h1>
        <p className="text-2xl text-gray-300 mb-10">{erro}</p>
        <button
          onClick={lidarComNovoQuestionario}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-lg text-xl font-bold uppercase tracking-wide
                     hover:from-yellow-600 hover:to-orange-700 transition duration-300 ease-in-out
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Tentar Outro Famoso
        </button>
      </main>
    );
  }

  if (perguntas.length === 0 && !carregando && !erro) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-900 to-blue-950 text-gray-100 text-center">
        <h1 className="text-4xl font-bold text-orange-400 mb-6">Nenhum questionário encontrado!</h1>
        <p className="text-2xl text-gray-300 mb-10">Não foi possível gerar perguntas para &quot;{nomeFamoso}&quot;. Tente um famoso diferente.</p>
        <button
          onClick={lidarComNovoQuestionario}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-lg text-xl font-bold uppercase tracking-wide
                     hover:from-yellow-600 hover:to-orange-700 transition duration-300 ease-in-out
                     shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Voltar para a Página Inicial
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-slate-900 to-blue-950 text-gray-100">
      <div className="w-full max-w-4xl bg-gray-100 p-10 rounded-xl shadow-2xl mt-8 mb-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gray-600 drop-shadow-lg">
          Questionário sobre <span className="capitalize">{nomeFamoso}</span>
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
              w-full p-5 rounded-lg text-2xl font-bold uppercase tracking-wide mt-10
              ${Object.keys(respostasSelecionadas).length === perguntas.length
                ? 'bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }
              transition duration-300 ease-in-out
            `}
          >
            Enviar Questionário
          </button>
        ) : (
          <div className="mt-10 p-8 bg-blue-50 rounded-xl text-center shadow-inner border-4 border-gray-500">
            <h2 className="text-4xl font-extrabold text-gray-600 mb-6 drop-shadow-md">Resultados do Questionário</h2>
            <p className="text-3xl text-gray-800 mb-3">Sua Pontuação: <span className="font-bold text-yellow-700">{pontuacao}</span> de {perguntas.length * 10}</p>
            <p className="text-2xl text-green-700 mb-2">Acertos: <span className="font-bold">{respostasCorretas}</span></p>
            <p className="text-2xl text-red-700 mb-8">Erros: <span className="font-bold">{respostasErradas}</span></p>
            <button
              onClick={lidarComNovoQuestionario}
              className="bg-gradient-to-r from-yellow-600 to-orange-700 text-white p-4 rounded-lg text-xl font-bold uppercase tracking-wide
                         hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out
                         shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Fazer Outro Questionário
            </button>
          </div>
        )}
      </div>
    </main>
  );
}