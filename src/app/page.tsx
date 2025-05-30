'use client'; // Indica que este componente é um Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaginaInicial() {
  const [nomeFamoso, setNomeFamoso] = useState<string>('');
  const router = useRouter();

  const lidarComEnvio = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (nomeFamoso.trim()) {
      // Redireciona para a página do questionário com o nome do famoso na URL
      router.push(`/questionario/${encodeURIComponent(nomeFamoso.trim())}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Gerador de Questionário de Famosos
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Digite o nome de um famoso para gerar um questionário interativo!
        </p>
        <form onSubmit={lidarComEnvio} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ex: Michael Jackson, Beyoncé, Ayrton Senna"
            value={nomeFamoso}
            onChange={(e) => setNomeFamoso(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold"
          >
            Gerar Questionário
          </button>
        </form>
      </div>
    </main>
  );
}