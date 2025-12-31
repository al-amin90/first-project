import { Router } from 'express'

const userRouter = Router()

userRouter.post('/create-student', studentControllers.createStudent)
