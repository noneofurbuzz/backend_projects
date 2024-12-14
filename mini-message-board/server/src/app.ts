import express, { response } from 'express'
import cors from 'cors'
import { messages } from './types.ts'
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT
let id = 1
const messages: messages[] = [];
      

app.get('/',(req,res) => {
    res.json(messages)
    console.log(messages)
})
app.post('/new',(req,res) => {
  messages.push({
    id : id ++,
    text: req.body.message,
    user: req.body.name,
    image: `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 826) + 1}.jpeg`,
    added: new Date()
  })
  res.status(200).send()
  console.log(req.body)
})
app.listen(port,() => {
    console.log(`server listening on port ${port}`)
})