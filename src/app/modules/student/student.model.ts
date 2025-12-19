import { Schema } from 'mongoose'
import { TStudent } from './student.interface'

const studentSchema = new Schema<TStudent>({
  id: { type: String },
  name: {
    firstName: { type: String, require: true },
    middleName: String,
    lastName: { type: String, require: true },
  },
  gender: ['male', 'female'],
  dateOfBirth: String,
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  avatar: String,
  emergencyContactNo: String,
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherContactNo: { type: String, required: true },
  },
  localGuardian: {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  profileImg: String,
  isActive: ['active', 'blocked'],
})
