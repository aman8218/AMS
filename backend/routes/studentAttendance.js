import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  createStudentAttendance,
  getStudentAttendance,
  updateStudentAttendance,
  deleteStudentAttendance,
  getAttendanceByDate,
} from "../controllers/studentattendanceControllers.js";

const router = express.Router();

router.post("/",authMiddleware, createStudentAttendance);                // Create a new attendance record
router.get("/:studentId",authMiddleware, getStudentAttendance);          // Get attendance records for a specific student
router.put("/:attendanceId",authMiddleware, updateStudentAttendance);    // Update a specific attendance record
router.delete("/:attendanceId",authMiddleware, deleteStudentAttendance); // Delete a specific attendance record
router.get("/date/:date",authMiddleware, getAttendanceByDate); // Fetch attendance for all students on a specific date

export default router