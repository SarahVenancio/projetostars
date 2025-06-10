# 🌟 StarsTrivia 🌟

## Gerador de Questionários Interativos sobre Famosos com Inteligência Artificial

![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-Blue?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)


## 🚀 Sobre o Projeto

O **StarQuiz AI** é uma aplicação web inovadora que permite aos usuários gerar questionários de múltipla escolha interativos sobre seus famosos favoritos. Utilizando o poder da inteligência artificial do **Google Gemini**, o aplicativo pesquisa informações sobre a vida e carreira das celebridades e as transforma em perguntas e respostas desafiadoras em tempo real.

Ideal para fãs de cultura pop, curiosos ou qualquer um que queira testar seus conhecimentos de forma divertida e dinâmica!

## ✨ Funcionalidades

* **Geração de Questionários sob Demanda:** Digite o nome de qualquer famoso e o app cria um questionário personalizado.
* **Perguntas e Alternativas Dinâmicas:** As perguntas e suas 4 alternativas (com uma resposta correta) são geradas pela IA.
* **Interface Intuitiva:** Design limpo e responsivo construído com Tailwind CSS.
* **Validação de Respostas:** O usuário seleciona suas respostas e vê os resultados ao final do quiz.
* **Integração com Google Gemini API:** O coração da aplicação, responsável pela inteligência na criação do conteúdo.
* **Segurança:** A chave da API do Gemini é protegida no backend (Next.js API Routes).
* **Deploy Fácil:** Projetado para deploy contínuo na Vercel.

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * [**Next.js (App Router)**](https://nextjs.org/) - Framework React para aplicações web.
    * [**React**](https://react.dev/) - Biblioteca JavaScript para construir interfaces de usuário.
    * [**TypeScript**](https://www.typescriptlang.org/) - Superset de JavaScript para tipagem estática.
    * [**Tailwind CSS**](https://tailwindcss.com/) - Framework CSS utilitário para estilização rápida e responsiva.
* **Backend (Next.js API Routes):**
    * [**Google Gemini API**](https://ai.google.dev/models/gemini) - Modelo de linguagem grande para geração de conteúdo.
    * [**@google/generative-ai**](https://www.npmjs.com/package/@google/generative-ai) - SDK oficial do Google para interagir com a API Gemini.
* **Controle de Versão:**
    * [**Git**](https://git-scm.com/)
* **Deploy:**
    * [**Vercel**](https://vercel.com/)

## 🚀 Como Rodar o Projeto Localmente

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* Node.js (versão 18.x ou superior)
* npm (gerenciador de pacotes do Node.js) ou Yarn ou pnpm
* Conta no Google Cloud/Google AI Studio e uma [chave da API do Google Gemini](https://ai.google.dev/gemini-api/docs/get-started/node).

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd star-quiz-ai # Ou o nome da sua pasta do projeto