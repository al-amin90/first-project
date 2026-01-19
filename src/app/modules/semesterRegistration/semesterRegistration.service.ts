import status from 'http-status'
import AppError from '../../errors/AppError'
import { SemesterRegistrationNameCodeMapped } from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'
import SemesterRegistrationModel from './semesterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  if (SemesterRegistrationNameCodeMapped[payload.name] !== payload.code) {
    throw new AppError(status.BAD_REQUEST, 'Invalid Semester Code')
  }

  const result = await SemesterRegistrationModel.create(payload)
  return result
}

const getAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistrationModel.find()
  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id)
  return result
}

const updateSemesterRegistrationInDB = async (
  id: string,
  payload: TSemesterRegistration,
) => {
  if (
    payload.name &&
    payload.year &&
    SemesterRegistrationNameCodeMapped[payload.name] !== payload.code
  ) {
    throw new AppError(status.BAD_REQUEST, 'Invalid Semester Code')
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  )
  return result
}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
}
