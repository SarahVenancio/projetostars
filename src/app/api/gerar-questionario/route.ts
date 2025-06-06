import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Interface para a estrutura de uma pergunta (igual à do frontend)
interface PerguntaAPI {
    pergunta: string;
    alternativas: string[];
    respostaCorreta: string;
}

// Interface para a estrutura completa do questionário esperado
interface QuestionarioAPI {
    questionario: PerguntaAPI[];
}

// Função para formatar o texto para JSON
function extrairJson(texto: string): QuestionarioAPI | null {
  try {
    const inicio = texto.indexOf('{');
    const fim = texto.lastIndexOf('}');
    if (inicio !== -1 && fim !== -1 && fim > inicio) {
      const jsonString = texto.substring(inicio, fim + 1);
      return JSON.parse(jsonString);
    }
    return null;
  } catch (erro) {
    console.error("Erro ao extrair e parsear JSON:", erro);
    return null;
  }
}

export async function POST(requisicao: Request) {
  try {
    const { nomeFamoso } = await requisicao.json();

    if (!nomeFamoso) {
      return NextResponse.json(
        { erro: "Nome do famoso não fornecido." },
        { status: 400 }
      );
    }

    const chaveApi = process.env.GEMINI_API_KEY;

    if (!chaveApi) {
      return NextResponse.json(
        { erro: "Chave da API do Gemini não configurada." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(chaveApi);

    // Usando o modelo `gemini-pro` para geração de texto
    const modelo = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Configurações de segurança para evitar conteúdo inadequado
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const prompt = `Crie um questionário de 10 perguntas e 4 alternativas (sendo uma correta) sobre a vida e carreira do famoso "${nomeFamoso}". O formato deve ser um JSON.
    O JSON deve ter a seguinte estrutura:
    {
      "questionario": [
        {
          "pergunta": "Qual a data de nascimento de ${nomeFamoso}?",
          "alternativas": [
            "29 de agosto de 1958",
            "15 de janeiro de 1960",
            "20 de março de 1955",
            "10 de fevereiro de 1962"
          ],
          "respostaCorreta": "29 de agosto de 1958"
        },
        // ... mais 9 perguntas
      ]
    }
    As perguntas devem ser variadas e cobrir aspectos importantes da vida do famoso. Não inclua informações sensíveis ou inadequadas. As alternativas devem ser plausíveis.`;

    const resultado = await modelo.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
    });

    const resposta = resultado.response;
    const textoResposta = resposta.text();

    // Tenta extrair e parsear o JSON
    const dadosQuestionario = extrairJson(textoResposta);

    if (dadosQuestionario && dadosQuestionario.questionario && dadosQuestionario.questionario.length > 0) {
      return NextResponse.json(dadosQuestionario, { status: 200 });
    } else {
      console.error("Resposta do Gemini não contém JSON válido ou questionário vazio:", textoResposta);
      return NextResponse.json(
        { erro: "Não foi possível gerar um questionário válido. Tente outro famoso ou o Gemini retornou uma resposta inesperada." },
        { status: 500 }
      );
    }

  } catch (erro) {
    console.error("Erro ao gerar questionário:", erro);
    return NextResponse.json(
      { erro: "Erro interno do servidor ao gerar o questionário. Verifique sua chave de API e a disponibilidade do serviço Gemini." },
      { status: 500 }
    );
  }
}