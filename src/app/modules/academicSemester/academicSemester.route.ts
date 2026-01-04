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

router.get('/', academicSemesterControllers.getAllAcademicSemester)
router.put('/:id', academicSemesterControllers.updateAcademicSemester)
router.get('/:id', academicSemesterControllers.getSingleAcademicSemester)

export const academicSemesterRouter = router
