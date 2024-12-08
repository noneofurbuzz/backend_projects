import express, { response } from 'express'
import cors from 'cors'
import axios from 'axios'
import { messages } from './types.ts'
const app = express()
app.use(cors())
const port = process.env.PORT

const messages: messages[] = [
    {
        id : 1,
        text: "Hi there!",
        user: "Amando",
        added: new Date()
      },
      {
        id: 2,
        text: "Hello Worldjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjgggggggggggggggggggggggggggggg!",
        user: "Charles",
        added: new Date()
      }
]

app.get('/',(req,res) => {
    res.json(messages)
    console.log(messages)
})
app.get('/new',(req,res) => {

})
app.listen(port,() => {
    console.log(`server listening on port ${port}`)
})