import { defineSecret } from 'firebase-functions/params'
import { mcpClient } from 'genkitx-mcp'
import * as dotenv from 'dotenv';
dotenv.config();

export const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY || defineSecret(`GOOGLE_MAPS_API_KEY`);

export const mapsClient = mcpClient({
  name: 'maps',
  serverProcess: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-google-maps'],
    env: {
      ...process.env as Record<string, string>,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
    },
  },
})