// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stars Trivia",
  description: "Gerador de Questionários Interativos sobre Famosos com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Mudança aqui: bg-gradient-to-br from-blue-950 to-gray-900 para um fundo escuro e elegante */}
      {/* text-gray-100 para que o texto padrão seja claro */}
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 to-blue-950 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}