import config from '../../config'
import { TStudent } from '../student/student.interface'
import StudentModal from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentDateIntoDB = async (
  password: string,
  studentDate: TStudent,
) => {
  const user: Partial<IUser> = {}

  user.password = password || (config.default_password as string)
  user.role = 'student'
  user.id = 'ST002'

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
