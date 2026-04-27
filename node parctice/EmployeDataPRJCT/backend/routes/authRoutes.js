 import express, { Router } from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'



export const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)