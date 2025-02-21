import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  TStudentModel,
  TUserName,
} from './student/studentInterface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    maxlength: [20, 'Name can not be more than 20  '],
    // validate: {
    //   validator: function (values: string) {
    //     const firstNameStr = values.charAt(0).toUpperCase() + values.slice(1);
    //     return firstNameStr === values;
    //   },
    //   message: '{VALUE} is not in capitalize from',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last is required'],
    // validate: {
    //   validator: (values) => validator.isAlpha(values),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'FatherName is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//. student.modal file
const studentSchema = new Schema<TStudent, TStudentModel, StudentMethods>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "{VALUE} is one of the following: 'male' , 'female' or 'other'",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (values) => validator.isEmail(values),
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact No is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local Guardian is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
