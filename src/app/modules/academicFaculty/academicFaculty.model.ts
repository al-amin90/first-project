import { model, Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({ name: this.name })

  if (isExist) {
    throw new Error('This Faculty is already exist')
  }
  next()
})

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
)
