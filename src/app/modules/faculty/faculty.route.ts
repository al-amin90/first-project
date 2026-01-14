import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { facultyControllers } from './faculty.controller'
import { updateFacultyValidationSchema } from './faculty.validate'

const router = express.Router()

router.get('/', facultyControllers.getAllFaculty)
router.get('/:id', facultyControllers.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  facultyControllers.updateSingleFaculty,
)
router.delete('/:id', facultyControllers.deleteSingleFaculty)

const facultyRouter = router

export default facultyRouter
