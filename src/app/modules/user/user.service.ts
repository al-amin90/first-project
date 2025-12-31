import config from '../../config'
import StudentModal from '../student/student.model'
import { IUser, newUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentDateIntoDB = async (
  password: string,
  studentDate: IUser,
) => {
  const user: newUser = {}

  user.password = password || (config.default_password as string)
  user.role = 'student'
  user.id = '22033'

  const result = await UserModel.create(user)
  console.log('result', result)
  console.log('result', result)

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
