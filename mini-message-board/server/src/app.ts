import express from 'express'
import cors from 'cors'
import indexRouter from './routes/index.ts'
import newMessagesRouter from './routes/newMessage.ts'
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT

app.use('/',indexRouter)
app.use('/new',newMessagesRouter)

app.listen(port,() => {
    console.log(`server listening on port ${port}`)
})