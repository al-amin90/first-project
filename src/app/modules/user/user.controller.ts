import { NextFunction, Request, Response } from 'express'
import userService from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentDate } = req.body

    // const zodParserData = studentZodSchema.parse(studentDate)

    const result = await userService.createStudentDateIntoDB(
      password,
      studentDate,
    )
    res.status(200).json({
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
