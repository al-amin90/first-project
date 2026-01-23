import status from 'http-status'
import AppError from '../../errors/AppError'
import { TLoginUser, TSemesterRegistration } from './auth.interface'
import SemesterRegistrationModel from './semesterRegistration.model'
import AcademicSemesterModel from '../academicSemester/academicSemester.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'
import OfferedCourseModel from '../OfferedCourse/OfferedCourse.model'
import mongoose from 'mongoose'

const loginUser = async (payload: TLoginUser) => {
  console.log(payload)
  return []
}

export const userServices = {
  loginUser,
}
