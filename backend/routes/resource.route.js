import express from 'express'
import { addResource } from '../controllers/resource.controller.js'

const router = express.Router()

router.post('/resource',addResource)

export default router