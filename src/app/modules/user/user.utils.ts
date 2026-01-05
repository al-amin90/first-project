import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './user.model'

const findLastStudentId = async (semesterYearCode: string) => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
      id: { $regex: new RegExp(`^${semesterYearCode}`) },
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean()

  console.log('lastStudent', lastStudent)
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  const { code, year } = payload

  const currentId =
    (await findLastStudentId(`${year}${code}`)) || (0).toString()

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  return `${payload.year}${payload.code}${incrementId}`
}
