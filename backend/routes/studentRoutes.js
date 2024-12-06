import express from 'express'
import { addStudent, getAllStudents, getStudentByRegistrationNumber, deleteStudentByRegistrationNumber, updateStudentByRegistrationNumber, upload } from '../controllers/studentController.js';

const router = express.Router();

router.post("/", upload.array("images", 5), addStudent);
router.get("/", getAllStudents);
router.get("/:registrationNumber", getStudentByRegistrationNumber);
router.put("/:registrationNumber", upload.array("images", 5), updateStudentByRegistrationNumber);
router.delete("/:registrationNumber", deleteStudentByRegistrationNumber);

// // Route to add a new student
// router.post('/add', addStudent);

// // Route to get all students
// router.get('/', getAllStudents);

// // Route to get a single student by ID
// router.get('/:id', getStudentByRegistrationNumber);

// // Route to update a student by ID
// router.put('/:id', updateStudent);

// // Route to delete a student by ID
// router.delete('/:id', deleteStudent);

export default router;
