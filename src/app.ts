import express, { Application, Request, Response } from 'express'
import { studentRouters } from './app/modules/student/student.route'
import cors from 'cors'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// all application route here
app.use('/api/v1/students/', studentRouters)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

export default app
