import express from 'express'
import { addResource, deleteResource, getResources, updateResource } from '../controllers/resource.controller.js'

const router = express.Router()

router.post('/',addResource)
router.get('/',getResources)
router.delete('/:id',deleteResource)
router.put('/:id',updateResource)

export default router