import { Request, Response } from 'express'
import { studentService } from './student.service'
import { TStudent } from './student.interface'
import studentJoiValidationSchema from './student.joi.validate'
import { studentZodSchema } from './student.validate'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student: TStudent = req.body

    // ========> joi validate
    // const { value, error } = studentJoiValidationSchema.validate(student)
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Student is not create Successfully',
    //     error,
    //   })
    // }

    const zodParserData = studentZodSchema.parse(student)

    const result = await studentService.createStudentIntoDB(zodParserData)
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
