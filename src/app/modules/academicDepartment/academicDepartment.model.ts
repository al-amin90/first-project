import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

class AppError extends Error {
  public statusCode: number

  constructor(statusCode: number, message: string, stack = '') {
    super(message)
    this.statusCode = statusCode

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ name: this.name })

  if (isExist) {
    throw new Error('This Department iss already exist')
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  console.log('query', query)

  const isExist = await AcademicDepartment.findOne(query)

  if (!isExist) {
    throw new AppError(404, 'This Department is not found')
  }

  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
