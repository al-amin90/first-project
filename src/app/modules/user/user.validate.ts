import z from 'zod'

export const userZodSchema = z.object({
  id: z.string(),
  password: z.string(),
  needsPasswordChange: z.boolean(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['blocked', 'in-progress']),
  isDeleted: z.boolean(),
})
