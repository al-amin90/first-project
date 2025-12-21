import * as z from 'zod'

// ---------------- User Name ----------------
const userNameZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(20, 'Not more than 20 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
})

// ---------------- Guardian ----------------
const guardianZodSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
})

// ---------------- Local Guardian ----------------
const localGuardianZodSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
})

// ---------------- Student ----------------
export const studentZodSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z.string(),
  name: userNameZodSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({
      message: "Gender must be either 'male' or 'female'",
    }),
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  avatar: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']),
})
