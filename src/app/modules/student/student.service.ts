import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import StudentModal from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  const student = new StudentModal(studentData)
  const result = await student.save() // buit in instant method
  return result
}

// const createStudentIntoDB = async (student: TStudent) => {
//   const result = await StudentModal.create(student)
//   return result
// }

const getAllStudentFromDB = async () => {
  const result = await StudentModal.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModal.findOne({ id: id })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid student ID')
  }
  const result = await StudentModal.deleteOne({ _id: id })
  return result
}

export const studentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
