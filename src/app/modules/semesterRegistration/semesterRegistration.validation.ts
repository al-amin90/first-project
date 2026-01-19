import z from 'zod'
import { SemesterRegistrationStatus } from './semesterRegistration.constant'

const semesterRegistrationZodSchema = z.object({
  academicSemester: z.string(),
  status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
})

const updateSemesterRegistrationZodSchema =
  semesterRegistrationZodSchema.partial()

export const semesterRegistrationValidation = {
  semesterRegistrationZodSchema,
  updateSemesterRegistrationZodSchema,
}
