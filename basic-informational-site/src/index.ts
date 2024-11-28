import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(path.dirname(__filename))
const app = express()
// setup static folder
//app.use(express.static(path.join(__dirname,'views')))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
    res.status(200)
})
app.get('/about',(req,res) => {
    res.sendFile(path.join(__dirname,'views','about.html'))
    res.status(200)
})
app.get('/contact-me', (req,res) => {
    res.sendFile(path.join(__dirname,'views','contact-me.html'))
    res.status(200)
})
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'views','404.html'))
    res.status(404)
})
app.listen(port,()=> {
    console.log(`app listening on port ${port}`)
})