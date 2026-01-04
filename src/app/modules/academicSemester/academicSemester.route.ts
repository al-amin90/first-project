import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterZodSchema } from './academicSemester.validation'
import { academicSemesterController } from './academicSemester.controller'

const router = Router()

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
)

export const academicSemesterRouter = router
