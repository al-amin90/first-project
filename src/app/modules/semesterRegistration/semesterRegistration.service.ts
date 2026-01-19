import status from 'http-status'
import AppError from '../../errors/AppError'
import { TSemesterRegistration } from './semesterRegistration.interface'
import SemesterRegistrationModel from './semesterRegistration.model'
import AcademicSemesterModel from '../academicSemester/academicSemester.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester

  const isAcademicSemesterExists =
    await AcademicSemesterModel.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new AppError(status.BAD_REQUEST, 'Academic Semester is Not Found')
  }

  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  })

  if (isSemesterRegistrationExists) {
    throw new AppError(status.CONFLICT, 'This Semester is already registered')
  }

  const result = await SemesterRegistrationModel.create(payload)
  return result
}

const getAllSemesterRegistrationFromDB = async () => {
  // const result = await SemesterRegistrationModel.find()
  // return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  // const result = await SemesterRegistrationModel.findById(id)
  // return result
}

const updateSemesterRegistrationInDB = async (
  id: string,
  payload: TSemesterRegistration,
) => {
  // if (
  //   payload.name &&
  //   payload.year &&
  //   SemesterRegistrationNameCodeMapped[payload.name] !== payload.code
  // ) {
  //   throw new AppError(status.BAD_REQUEST, 'Invalid Semester Code')
  // }
  // const result = await SemesterRegistrationModel.findByIdAndUpdate(
  //   { _id: id },
  //   payload,
  //   { new: true },
  // )
  // return result
}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
}
