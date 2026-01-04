import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapped,
} from './academicSemester.interface'
import AcademicSemesterModel from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const academicSemesterNameCodeMapped: TAcademicSemesterNameCodeMapped = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }

  if (academicSemesterNameCodeMapped[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemesterModel.create(payload)
  return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
}
