import { TStudent } from './student.interface'
import StudentModal from './student.model'

const createStudentIntoDB = async (student: TStudent) => {
  const result = await StudentModal.create(student)
  return result
}

export const studentService = {
  createStudentIntoDB,
}
