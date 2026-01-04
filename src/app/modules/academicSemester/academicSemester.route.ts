import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterZodSchema } from './academicSemester.validation'
import { academicSemesterControllers } from './academicSemester.controller'

const router = Router()

router.post(
  '/create',
  validateRequest(academicSemesterZodSchema),
  academicSemesterControllers.createAcademicSemester,
)

export const academicSemesterRouter = router
