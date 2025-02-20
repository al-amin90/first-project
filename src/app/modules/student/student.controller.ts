import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { z } from 'zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //creating a schema validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //will call service fun to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    }

    //sent response
    res.status(200).json({
      success: true,
      message: 'Student is create successfully',
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Something went wrong',
    //   Error: err,
    // });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'single Student data retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  createStudent,
  getSingleStudent,
};
