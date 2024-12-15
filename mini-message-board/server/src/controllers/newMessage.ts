import { Request,Response } from "express"
import messages from "../data.ts"

const postMessages = ((req: Request,res: Response) => {
    let id = 1
    messages.push({
        id : id ++,
        text: req.body.message,
        user: req.body.name,
        image: `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 826) + 1}.jpeg`,
        added: new Date()
      })
      res.status(200).send()
})

export default postMessages