import { Request, Response } from 'express'
import userService from './user.service'

const createStudent = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: error.message || 'Student is not create Successfully',
      error,
    })
  }
}

export default {
  createStudent,
}
