import { Router } from 'express'
import userController from './user.controller'

const userRouter = Router()

const middleware = (req, res, next) => {
  console.log('i am middleware')
  next()
}

userRouter.post('/create-student', middleware, userController.createStudent)

export default userRouter
