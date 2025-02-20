import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message('First name must start with a capital letter and be alphabetic')
    .required(),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .message('Last name must contain only letters')
    .required(),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().isoDate(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().allow(''),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
