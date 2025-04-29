import { genkit } from 'genkit'
import googleAI, { gemini25FlashPreview0417 } from '@genkit-ai/googleai'
import { defineSecret } from 'firebase-functions/params'
import { logger } from 'genkit/logging'
import { mapsClient } from './client'
import { onCallGenkit } from 'firebase-functions/https'
import * as dotenv from 'dotenv';
dotenv.config();

// Set logging level to debug for detailed operation logs
logger.setLogLevel(`debug`)

// API keys stored in Google Cloud Secret Manager
export const googleAIapiKey = process.env.GOOGLE_GENAI_API_KEY || defineSecret(`GOOGLE_GENAI_API_KEY`);

// Initialize Genkit
export const ai = genkit({
  plugins: [googleAI(), mapsClient],
  model: gemini25FlashPreview0417,
})


const { googleMapsFlow } = require('./google-maps-flow');

export const callGoogleMaps = onCallGenkit({
  secrets: [googleAIapiKey],
  region: 'asia-northeast1',
  cors: true,
},
  googleMapsFlow
)


export const helloFlow = ai.defineFlow(
  {
    name: "hello",
  },
  async () => {

    const helloPrompt = ai.prompt('hello');
    const response = await helloPrompt();

    console.log("Chat Response:", response);
    return response.text;
  }
);