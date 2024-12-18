import express from 'express'
import postMessages from '../controllers/newMessage.ts'
import { validateData } from '../middleware/Validation.ts'

const router = express.Router()

router.post('/',validateData,postMessages)
export default router