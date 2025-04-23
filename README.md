## HOWTO

サーバー起動前の打つコマンド

```bash
gcloud auth login
```

## Set environment variables

```bash
export GCLOUD_PROJECT="your-google-cloud-project-id"
export GOOGLE_GENAI_API_KEY="your-api-key"
export GENKIT_ENV="dev"
export GOOGLE_MAPS_API_KEY="your-maps-api-key"
```

サーバー起動コマンド

```bash
npx genkit start -o -- tsx --watch src/index.ts
```

ローカルでの試し打ちコマンド

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "ここにメッセージを入力"}'
```

