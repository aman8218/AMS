import express from 'express'
import { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

// Route to add a new student
router.post('/add', addStudent);

// Route to get all students
router.get('/', getAllStudents);

// Route to get a single student by ID
router.get('/:id', getStudentById);

// Route to update a student by ID
router.put('/:id', updateStudent);

// Route to delete a student by ID
router.delete('/:id', deleteStudent);

export default router;
