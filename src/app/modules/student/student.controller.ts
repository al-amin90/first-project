import { Request, Response } from 'express'
import { studentService } from './student.service'
import { TStudent } from './student.interface'
import Joi from 'joi'

// User Name Validation Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': 'First name must be capitalized (e.g., John)',
      'string.empty': 'First name is required',
      'any.required': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
    }),
  middleName: Joi.string().allow('').optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': 'Last name must contain only letters',
      'string.empty': 'Last name is required',
      'any.required': 'Last name is required',
    }),
})

// Guardian Validation Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required(),
  motherContactNo: Joi.string().required(),
})

// Local Guardian Validation Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
})

// Main Student Validation Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().trim(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().required().email(),
  contactNumber: Joi.string().required(),
  avatar: Joi.string().uri().allow('').optional(),
  emergencyContactNo: Joi.string().allow('').optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().allow('').optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked',
  }),
})

const createStudent = async (req: Request, res: Response) => {
  try {
    const student: TStudent = req.body
    const { value, error } = studentValidationSchema.validate(student)

    if (error) {
      res.status(400).json({
        success: false,
        message: 'Student is not create Successfully',
        error,
      })
    }

    const result = await studentService.createStudentIntoDB(value)
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
