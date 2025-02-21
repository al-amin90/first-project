import { StudentModel } from '../student.model';
import { TStudent } from './studentInterface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await StudentModel.create(studentData); //built in static model

  // const student = new StudentModel(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = student.save(); //built in instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
