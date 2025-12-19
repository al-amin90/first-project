import { Request, Response } from 'express'
import { studentService } from './student.service'
import { TStudent } from './student.interface'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student: TStudent = req.body

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

export const studentControllers = {
  createStudent,
}
