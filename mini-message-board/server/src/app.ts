import express, { response } from 'express'
import cors from 'cors'
import { messages } from './types.ts'
const app = express()
app.use(cors())
const port = process.env.PORT

const messages: messages[] = [
    

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