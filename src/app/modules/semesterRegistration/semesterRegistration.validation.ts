import z from 'zod'

const semesterRegistrationZodSchema = z.object({})

const updateSemesterRegistrationZodSchema = z.object({})

export const semesterRegistrationValidation = {
  semesterRegistrationZodSchema,
  updateSemesterRegistrationZodSchema,
}
