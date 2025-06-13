// app/ui/ComponentePergunta.tsx
import React from 'react';

interface PerguntaProps {
  indice: number;
  pergunta: {
    pergunta: string;
    alternativas: string[];
    respostaCorreta: string;
  };
  respostaSelecionada: string | undefined;
  onSelectResposta: (resposta: string) => void;
  questionarioFinalizado: boolean;
}

export default function ComponentePergunta({
  indice,
  pergunta,
  respostaSelecionada,
  onSelectResposta,
  questionarioFinalizado,
}: PerguntaProps) {
  return (
    <div className="mb-8 p-6 border-2 border-slate-700 rounded-lg bg-slate-800 shadow-xl">
      <p className="text-xl font-semibold mb-4 text-gray-100">
        <span className="text-yellow-400">{indice + 1}.</span> {pergunta.pergunta}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pergunta.alternativas.map((alternativa, altIndice) => (
          <button
            key={altIndice}
            onClick={() => !questionarioFinalizado && onSelectResposta(alternativa)}
            className={`
              p-4 text-left rounded-md border-2 text-lg font-medium
              ${
                questionarioFinalizado
                  ? alternativa === pergunta.respostaCorreta
                    ? 'bg-green-600 border-green-700 text-white font-bold' // Correta e Finalizada
                    : respostaSelecionada === alternativa
                      ? 'bg-red-600 border-red-700 text-white font-bold'    // Errada selecionada e Finalizada
                      : 'bg-slate-700 border-slate-600 text-gray-300'          // Outras quando finalizado
                  : respostaSelecionada === alternativa
                    ? 'bg-yellow-500 border-yellow-600 text-slate-900 font-bold shadow-md' // Selecionada antes de finalizar
                    : 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600 transition duration-150 ease-in-out' // Não selecionada
              }
              ${questionarioFinalizado ? 'cursor-default' : 'cursor-pointer'}
            `}
            disabled={questionarioFinalizado}
          >
            <span className="font-bold">{String.fromCharCode(65 + altIndice)}.</span> {alternativa}
          </button>
        ))}
      </div>
    </div>
  );
}