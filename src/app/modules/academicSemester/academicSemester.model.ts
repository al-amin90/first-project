import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './AcademicSemester.constant'

const academicSemester = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    year: { type: String, required: true },
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

const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemester,
)

export default AcademicSemesterModel
