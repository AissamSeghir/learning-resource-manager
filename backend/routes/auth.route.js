import express from 'express'
import { getMe, login } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middelwares/authMiddleware.js'

const router = express.Router()

router.post('/login',login)
router.get('/me',authMiddleware,getMe)

export default router