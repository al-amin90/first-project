import express from 'express'
import { studentControllers } from './student.controller'

const studentRouter = express.Router()

studentRouter.get('/', studentControllers.getAllStudent)
studentRouter.get('/:id', studentControllers.getSingleStudent)
studentRouter.delete('/:id', studentControllers.deleteSingleStudent)

export default studentRouter
