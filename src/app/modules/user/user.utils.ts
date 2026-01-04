import { TAcademicSemester } from '../academicSemester/academicSemester.interface'

export const generateStudentId = (payload: TAcademicSemester) => {
  const startWith = (0).toString()
  const incrementId = (Number(startWith) + 1).toString().padStart(4, '0')

  return `${payload.year}${payload.code}${incrementId}`
}
