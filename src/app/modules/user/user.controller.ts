import { NextFunction, Request, Response } from 'express'
import userService from './user.service'
import sendResponse from '../../utils/SendResponse'
import status from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentDate } = req.body

    const result = await userService.createStudentDateIntoDB(
      password,
      studentDate,
    )

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is create Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createStudent,
}
