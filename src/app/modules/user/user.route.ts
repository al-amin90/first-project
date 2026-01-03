import { Router } from 'express'
import userController from './user.controller'
import { createStudentValidationSchema } from '../student/student.validate'
import validateRequest from '../../middlewares/validateRequest'

const userRouter = Router()

userRouter.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
)

export default userRouter
