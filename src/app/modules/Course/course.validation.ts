import z from 'zod'

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const createCourseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
})

const assignFacultiesValidationSchema = z.object({
  faculties: z.array(z.string()),
})

const updateCourseValidationSchema = createCourseValidationSchema.partial()

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultiesValidationSchema,
}
