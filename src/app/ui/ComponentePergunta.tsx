// app/ui/ComponentePergunta.tsx
import React from 'react';

// Interface para a estrutura de uma pergunta
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
    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
      <p className="text-xl font-semibold mb-4 text-gray-900">
        {indice + 1}. {pergunta.pergunta}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pergunta.alternativas.map((alternativa, altIndice) => (
          <button
            key={altIndice}
            onClick={() => !questionarioFinalizado && onSelectResposta(alternativa)}
            className={`
              p-3 text-left rounded-md border-2
              ${
                questionarioFinalizado
                  ? alternativa === pergunta.respostaCorreta
                    ? 'bg-green-200 border-green-500 text-green-800 font-bold' // Correta
                    : respostaSelecionada === alternativa
                      ? 'bg-red-200 border-red-500 text-red-800 font-bold'    // Errada selecionada
                      : 'bg-gray-100 border-gray-300 text-gray-700'          // Outras
                  : respostaSelecionada === alternativa
                    ? 'bg-blue-100 border-blue-500 text-blue-800 font-semibold' // Selecionada
                    : 'bg-white border-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out' // Não selecionada
              }
              ${questionarioFinalizado ? 'cursor-default' : 'cursor-pointer'}
            `}
            disabled={questionarioFinalizado}
          >
            {String.fromCharCode(65 + altIndice)}. {alternativa}
          </button>
        ))}
      </div>
    </div>
  );
}