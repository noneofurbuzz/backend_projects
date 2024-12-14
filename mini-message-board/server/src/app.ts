import express, { response } from 'express'
import cors from 'cors'
import { messages } from './types.ts'
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT

const messages: messages[] = [
    
        {
            id: 1,
          text: "Hi there!",
          user: "Amando",
          added: new Date()
        },
        {
        id:2,
          text: "Hello World!",
          user: "Charles",
          added: new Date()
        },
        {
        id:3,
        text: "Hello World!",
        user: "Charles",
        added: new Date()
      },
      ];
      

app.get('/',(req,res) => {
    res.json(messages)
    console.log(messages)
})
app.post('/new',(req,res) => {
  res.status(200).send()
  console.log(req.body)
})
app.listen(port,() => {
    console.log(`server listening on port ${port}`)
})