import status from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import AcademicSemesterModel from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import StudentModal from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentDateIntoDB = async (
  password: string,
  studentDate: TStudent,
) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = 'student'

  const admissionSemester = await AcademicSemesterModel.findById(
    studentDate.admissionSemester,
  )
  if (!admissionSemester) {
    throw new AppError(status.NOT_FOUND, 'Admission semester not found')
  }

  user.id = await generateStudentId(admissionSemester)

  const result = await UserModel.create(user)

  if (Object.keys(result).length) {
    studentDate.id = result.id
    studentDate.user = result._id
  }

  const result2 = await StudentModal.create(studentDate)
  return result2
}

export default {
  createStudentDateIntoDB,
}
