import express from 'express'
import { addResource, getResources } from '../controllers/resource.controller.js'

const router = express.Router()

router.post('/',addResource)
router.get('/',getResources)

export default router