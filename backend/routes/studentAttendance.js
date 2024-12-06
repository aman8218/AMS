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

// Create a new attendance record
router.post("/", createStudentAttendance);

// Get attendance records for a specific student using registrationNo
router.get("/:registrationNo", getStudentAttendance);

// Update a specific attendance record by attendanceId
router.put("/:attendanceId", updateStudentAttendance);

// Delete a specific attendance record by attendanceId
router.delete("/:attendanceId", deleteStudentAttendance);

// Fetch attendance for all students on a specific date
router.get("/date/:date", getAttendanceByDate);

export default router;
