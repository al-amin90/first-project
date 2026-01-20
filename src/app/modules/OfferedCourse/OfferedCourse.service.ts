import status from 'http-status'
import AppError from '../../errors/AppError'
import { TOfferedCourse } from './OfferedCourse.interface'
import OfferedCourseModel from './OfferedCourse.model'
import AcademicSemesterModel from '../academicSemester/academicSemester.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './OfferedCourse.constant'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourseModel.create(payload)
  return result
}

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {}

const getSingleOfferedCourseFromDB = async (id: string) => {
  // const result = await OfferedCourseModel.findById(id)
  // return result
}

const updateOfferedCourseInDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {}

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseInDB,
}
