import { academicSemesterNameCodeMapped } from './AcademicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import AcademicSemesterModel from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapped[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemesterModel.create(payload)
  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id)
  return result
}

const updateAcademicSemesterInDB = async (
  id: string,
  payload: TAcademicSemester,
) => {
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  )
  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterInDB,
}
