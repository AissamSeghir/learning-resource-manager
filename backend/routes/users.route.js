import express, { Router } from 'express'
import { addUser } from "../controllers/user.controller.js";
const router = express.Router()

router.post('/',addUser)

export default router