import { Schema, model } from 'mongoose'
import { TAcademicSemester, TMonths } from './academicSemester.interface'

const AcademicSemesterName = ['Autumn', 'Summer', 'Fall'] as const
const AcademicSemesterCode = ['01', '02', '03'] as const
const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const studentSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    year: { type: Date, required: true },
    code: {
      type: String,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: { type: String, required: true, enum: Months },
  },
  { timestamps: true },
)

const StudentModal = model<TAcademicSemester>('Student', studentSchema)

export default StudentModal
