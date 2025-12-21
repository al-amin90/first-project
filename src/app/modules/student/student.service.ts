import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import StudentModal from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  /// ========> this custom instance methods
  // const student = new StudentModal(studentData)

  // if (await student.isUserExist(student.id)) {
  //   throw new Error('User Already Exist')
  // }

  /// ========> this custom static instance methods

  if (await StudentModal.isUserExist2(studentData.id)) {
    throw new Error('User Already Exist')
  }

  const result = await StudentModal.create(studentData)
  return result
}

// const createStudentIntoDB = async (student: TStudent) => {
//   const result = await StudentModal.create(studentData) //=========>  buit in instant method
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
  const result = await StudentModal.updateOne({ _id: id }, { isDeleted: true })
  return result
}

export const studentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
