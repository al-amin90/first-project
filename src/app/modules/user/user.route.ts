import { Router } from 'express'
import userController from './user.controller'
import { createStudentValidationSchema } from '../student/student.validate'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validate'

const router = Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
)

const userRouter = router
export default userRouter
