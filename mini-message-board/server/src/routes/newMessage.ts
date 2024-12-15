import express from 'express'
import postMessages from '../controllers/newMessage.ts'

const router = express.Router()

router.post('/',postMessages)
export default router