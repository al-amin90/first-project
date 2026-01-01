/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express'
import { studentRouters } from './app/modules/student/student.route'
import cors from 'cors'
import userRouter from './app/modules/user/user.route'
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// all application route here
app.use('/api/v1/students/', studentRouters)
app.use('/api/v1/users/', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

// global error handler
app.use(GlobalErrorHandler)

export default app
