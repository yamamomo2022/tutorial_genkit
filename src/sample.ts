import express, { Express, Request, Response } from "express";

const app = express()
const port = 3000

app.get('/', (req: express.Request, res:express.Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})