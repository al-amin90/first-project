import { Router } from 'express'
import studentRouter from '../modules/student/student.route'
import userRouter from '../modules/user/user.route'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
import facultyRouter from '../modules/faculty/faculty.route'
import adminRouter from '../modules/admin/admin.route'
import courseRouter from '../modules/Course/course.route'

const router = Router()

const moduleRouters = [
  {
    path: '/admins',
    route: adminRouter,
  },
  {
    path: '/faculties',
    route: facultyRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouter,
  },
  {
    path: '/courses',
    route: courseRouter,
  },
]

moduleRouters.forEach(route => {
  router.use(route.path, route.route)
})

export default router
