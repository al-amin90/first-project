import { Router } from 'express'
import studentRouter from '../modules/student/student.route'
import userRouter from '../modules/user/user.route'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route'

const router = Router()

const moduleRouters = [
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
]

moduleRouters.forEach(route => {
  router.use(route.path, route.route)
})

export default router
