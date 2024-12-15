import {Request,Response} from 'express'
import messages from '../data.ts'

const getMessages = ((req: Request,res: Response) => {
    res.json(messages)
})

export default getMessages