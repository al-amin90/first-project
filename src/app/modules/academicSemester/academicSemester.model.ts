import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'

const studentSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true, unique: true },
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

  profileImg: String,
  isDeleted: { type: Boolean, default: false },
})

const StudentModal = model<TStudent, IStudentModel>('Student', studentSchema)

export default StudentModal
