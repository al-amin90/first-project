import mongoose from 'mongoose'
import StudentModal from './student.model'
import AppError from '../../errors/AppError'
import status from 'http-status'
import { UserModel } from '../user/user.model'
import { TStudent } from './student.interface'

// const createStudentIntoDB = async (studentData: TStudent) => {
//   /// ========> this custom instance methods
//   // const student = new StudentModal(studentData)

//   // if (await student.isUserExist(student.id)) {
//   //   throw new Error('User Already Exist')
//   // }

//   /// ========> this custom static instance methods

//   if (await StudentModal.isUserExist2(studentData.id)) {
//     throw new Error('User Already Exist')
//   }

//   const result = await StudentModal.create(studentData)
//   return result
// }

// const createStudentIntoDB = async (student: TStudent) => {
//   const result = await StudentModal.create(studentData) //=========>  buit in instant method
//   return result
// }

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const searchTerm = query.searchTerm as string

  const fields = ['email', 'name.lastName', 'presentAddress']

  const filter = searchTerm
    ? {
        $or: fields?.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      }
    : {}

  return await StudentModal.find(filter)
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModal.aggregate([{ $match: { id: id } }])
  const result = await StudentModal.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const updateStudentInDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload

  const modifiedData: Record<string, unknown> = { ...remainingData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value
    }
  }

  const result = await StudentModal.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
  })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (!(await StudentModal.isUserExist2(id))) {
      throw new AppError(status.NOT_FOUND, 'Student is not found')
    }
    const result = await StudentModal.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!result) {
      throw new AppError(status.BAD_GATEWAY, 'Failed to delete Student')
    }

    const result2 = await UserModel.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!result2) {
      throw new AppError(status.BAD_GATEWAY, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (err) {
    console.log('err', err)
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
}

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
}
