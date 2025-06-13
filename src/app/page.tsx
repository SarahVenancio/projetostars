// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [nomeFamoso, setNomeFamoso] = useState('');
  const router = useRouter();

  const lidarComEnvio = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (nomeFamoso.trim()) {
      const nomeCodificado = encodeURIComponent(nomeFamoso.trim());
      router.push(`/questionario/${nomeCodificado}`);
    }
  };

  return (
    <>
      <main className="flex min-h-[82vh] flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-blue-950 text-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-6 drop-shadow-lg">
            ⭐Stars Trivia⭐
          </h1>
          <p className="text-xl text-gray-700 mb-8 font-light">
            Gere um questionário divertido sobre qualquer famoso que você quiser!
          </p>

          <form onSubmit={lidarComEnvio} className="flex flex-col gap-5">
            <input
              type="text"
              value={nomeFamoso}
              onChange={(e) => setNomeFamoso(e.target.value)}
              placeholder="Ex: Beyoncé, Albert Einstein..."
              className="p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition duration-300 ease-in-out text-gray-900 placeholder-gray-500 text-lg shadow-sm"
              required
            />
            <p className="text-sm text-gray-700 font-light">
            Para uma melhor experiência, utilize nomes completos ou mais conhecidos, além de especificar com produções.
            </p>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-lg text-xl font-bold uppercase tracking-wide
                        hover:from-yellow-600 hover:to-orange-700 transition duration-300 ease-in-out
                        shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!nomeFamoso.trim()}
            >
              Gerar Questionário
            </button>
          </form>
        </div>
      </main>
      <footer className="w-full py-6 text-sm text-center text-gray-400 bg-gradient-to-t from-slate-900 to-blue-950">
        <p className="mb-1">© 2025 | Desenvolvido com 💙 por Sarah Dias Venancio</p>
        <p className="mb-3">Projeto desenvolvido com a IA GEMINI da Google</p>

        <div className="flex justify-center space-x-4">
          <a href="https://www.instagram.com/_sarah.venancio_" target="_blank" aria-label="Instagram">
            <svg className="w-7 h-7 hover:scale-110 transition-transform text-pink-400 hover:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
            </svg>
          </a>

          <a href="https://github.com/SarahVenancio" target="_blank" aria-label="GitHub">
            <svg className="w-7 h-7 hover:scale-110 transition-transform text-white hover:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.686 2 12.262c0 4.496 2.865 8.316 6.839 9.666.5.092.683-.22.683-.486 0-.24-.01-1.038-.015-1.88-2.782.626-3.369-1.378-3.369-1.378-.455-1.184-1.11-1.5-1.11-1.5-.908-.634.07-.621.07-.621 1.004.073 1.532 1.073 1.532 1.073.893 1.576 2.341 1.12 2.91.856.092-.66.35-1.12.636-1.378-2.22-.26-4.555-1.15-4.555-5.115 0-1.13.393-2.05 1.04-2.773-.105-.258-.45-1.3.1-2.71 0 0 .84-.278 2.75 1.06a9.432 9.432 0 0 1 2.5-.344c.85.004 1.71.115 2.5.344 1.91-1.338 2.75-1.06 2.75-1.06.55 1.41.205 2.452.1 2.71.65.723 1.04 1.643 1.04 2.773 0 3.973-2.34 4.852-4.57 5.106.36.33.68.986.68 1.99 0 1.436-.015 2.596-.015 2.95 0 .268.18.582.69.484A10.267 10.267 0 0 0 22 12.262C22 6.686 17.523 2 12 2z" clipRule="evenodd"/>
            </svg>
          </a>

          <a href="https://www.linkedin.com/in/sarahdvenanciooo/" target="_blank" aria-label="LinkedIn">
            <svg className="w-7 h-7 hover:scale-110 transition-transform text-blue-400 hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zm.02 6H2v12h3V9.5zm4 0H7v12h3V15c0-1.65.75-2.5 2-2.5s2 .85 2 2.5v6.5h3V14c0-3-1.5-4.5-4-4.5s-3 1.25-3 1.25V9.5z"/>
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}