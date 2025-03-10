import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will call controller fun
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
