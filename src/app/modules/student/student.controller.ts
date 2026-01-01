import { NextFunction, Request, Response } from 'express'
import { studentService } from './student.service'

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student Retrieve data Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params

  try {
    const result = await studentService.getSingleStudentFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Student Retrieve single data Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params

  try {
    const result = await studentService.deleteStudentFromDB(id)
    res.status(200).json({
      success: true,
      message: 'Delete Student single data Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
}
