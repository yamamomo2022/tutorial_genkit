## HOWTO

サーバー起動前の打つコマンド

```bash
gcloud auth login
export GOOGLE_GENAI_API_KEY=your_api_key
```

サーバー起動コマンド

```bash
npm run dev src/sample.ts
```

ローカルでの試し打ちコマンド

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "ここにメッセージを入力"}'
```


