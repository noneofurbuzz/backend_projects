import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
const port = process.env.PORT;
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];
app.get('/', (req, res) => {
    res.json(messages);
    console.log(messages);
});
app.get('/new', (req, res) => {
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
//# sourceMappingURL=app.js.map