import status from 'http-status'
import AppError from '../../errors/AppError'
import { TLoginUser, TSemesterRegistration } from './auth.interface'
import SemesterRegistrationModel from './semesterRegistration.model'
import AcademicSemesterModel from '../academicSemester/academicSemester.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'
import OfferedCourseModel from '../OfferedCourse/OfferedCourse.model'
import mongoose from 'mongoose'
import StudentModal from '../student/student.model'
import { UserModel } from '../user/user.model'

import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
  console.log(payload)

  const isUserExists = await UserModel.isUserExistByCustomId(payload.id)

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "The User Does't exists")
  }

  const isDeleted = isUserExists.isDeleted
  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'The User is Deleted')
  }

  if (isUserExists.status === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'The User is Blocked')
  }

  if (
    !(await UserModel.isPasswordMatch(payload.password, isUserExists.password))
  ) {
    throw new AppError(status.FORBIDDEN, 'Password do not match')
  }

  return []
}

export const userServices = {
  loginUser,
}
