import z from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './AcademicSemester.constant'

export const academicSemesterZodSchema = z.object({
  name: z.enum([...AcademicSemesterName]),
  year: z.date(),
  code: z.enum([...AcademicSemesterCode]),
  startMonth: z.enum([...Months]),
  endMonth: z.enum([...Months]),
})
