import express, {Request, Response } from "express";
import { genkit, z} from 'genkit';
import { vertexAI, gemini20FlashLitePreview0205 } from '@genkit-ai/vertexai';

const ai = genkit({
  plugins: [vertexAI()],
  model: gemini20FlashLitePreview0205,
});

async () => {
  const response = await ai.generate('hi Gemini!');
  if (!response) {
    throw new Error('No response from AI');
  }
  const { text } = response;
  console.log(text);
};

export const chatFlow = ai.defineFlow(
  {
    name: "chat",
    inputSchema: z.preprocess(
      (data) => (typeof data === "string" ? { message: data } : data),
      z.object({
        message: z.string(),
      })
    ),
  },
  async (input) => {
    // チャット用プロンプト例（必要に応じて調整してください）
    const prompt = input.message;
    
    const response = await ai.generate({
      prompt: prompt,
      config: {
        temperature: 0.7,
      },
      output: {
        format: `text`,
      },
    });

    console.log("Chat Response:", response);
    return response.text;
  }
);

const app = express()
const port :number = 3000

app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

app.get('/chat', async (req: Request, res:Response) => {
  const input = req.body.data;    
  console.log(`リクエスト`);
  
  // フローを実行
  const result = await chatFlow.run(input);
  
  // レスポンスを返す
  res.json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})