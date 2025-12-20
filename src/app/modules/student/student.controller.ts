import { Request, Response } from 'express'
import { studentService } from './student.service'
import { TStudent } from './student.interface'

import Joi from 'joi'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student: TStudent = req.body

    const JoiValidation = Joi.object({
      id: Joi.string().max(20).required(),
    })

    const result = await studentService.createStudentIntoDB(student)
    res.status(200).json({
      success: true,
      message: 'Student is create Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Student is not create Successfully',
      data: error,
    })
  }
}

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student Retrieve data Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Student is not Retrieve data Successfully',
      data: error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await studentService.getSingleStudentFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Student Retrieve single data Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Student data not Retrieve Successfully',
      data: error,
    })
  }
}

const deleteSingleStudent = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await studentService.deleteStudentFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Delete Student single data Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Failed Retrieve Student data',
      data: error,
    })
  }
}

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
}
