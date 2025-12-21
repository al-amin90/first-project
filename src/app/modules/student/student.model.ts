import { Schema, model } from 'mongoose'
import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import validator from 'validator'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First is Required'],
    trim: true,
    maxlength: [20, 'Not more then 20'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstName =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    //     return firstName === value
    //   },
    //   message: '{VALUE} is not in Capitalize formate',
    // },
  },
  middleName: String,
  lastName: {
    type: String,
    required: [true, 'Last is Required'],
    // validate: {
    //   validator: value => validator.isAlpha(value),
    //   message: '{VALUE} is not Valid',
    // },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardian = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: "{VALUE} is no gender other then ['male', 'female']",
    },
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // validate: {
    //   validator: value => validator.isEmail(value),
    //   message: '{VALUE} is not Valid Email',
    // },
  },
  contactNumber: { type: String, required: true },
  avatar: String,
  emergencyContactNo: String,
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardian,
    required: true,
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
  },
})

studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await StudentModal.findOne({ id })
  return existingUser
}

const StudentModal = model<TStudent, StudentModel>('Student', studentSchema)

export default StudentModal
