import express from 'express'
import { CourseControllers } from './course.controller'

const router = express.Router()

router.post('/create', CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourse)
router.get('/:id', CourseControllers.getSingleCourse)
// router.patch(
//   '/:id',
//   validateRequest(updateFacultyValidationSchema),
//   facultyControllers.updateSingleFaculty,
// )
router.delete('/:id', CourseControllers.deleteSingleCourse)

const courseRouter = router

export default courseRouter
