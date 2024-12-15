import express from 'express'
import getMessages from '../controllers/index.ts'

const router = express.Router()

router.get('/', getMessages)

export default router