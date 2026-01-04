import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './AcademicSemester.constant'

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
