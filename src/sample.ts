import express, {Request, Response } from "express";
import { genkit, z} from 'genkit';
import { vertexAI, gemini15Flash } from '@genkit-ai/vertexai';
import { enableGoogleCloudTelemetry } from '@genkit-ai/google-cloud'
import { logger } from 'genkit/logging'

logger.setLogLevel(`debug`)

enableGoogleCloudTelemetry()

const ai = genkit({
  plugins: [vertexAI()],
  model: gemini15Flash,
});

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
// JSONボディパーサーを追加
app.use(express.json());
app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

app.post('/chat', async (req: Request, res:Response) => {
  // フローを実行
  try {
    const input = req.body;    
    console.log(`リクエスト`);
    console.log(input);
    
    const result = await chatFlow.run(input);
    // レスポンスを返す
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})