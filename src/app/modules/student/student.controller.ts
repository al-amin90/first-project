import { NextFunction, Request, Response } from 'express'
import { studentService } from './student.service'
import sendResponse from '../../utils/SendResponse'
import status from 'http-status'

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudentFromDB()

    sendResponse(res, {
      statusCode: status.OK,
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

    sendResponse(res, {
      statusCode: status.OK,
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

    sendResponse(res, {
      statusCode: status.OK,
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
