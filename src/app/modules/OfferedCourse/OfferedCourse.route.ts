import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { offeredCourseValidations } from './OfferedCourse.validation'
import { offeredCourseControllers } from './OfferedCourse.controller'

const router = Router()

router.post(
  '/create',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
)

router.get('/', offeredCourseControllers.getAllOfferedCourse)

router.get('/:id', offeredCourseControllers.getSingleOfferedCourse)

router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
)
export const offeredCourseRouter = router
