
import express from "express";
import { markAttendance, modifyAttendance, getAllAttendance, getUserAttendance, getAttendanceByDate } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// Route to mark attendance
router.post("/mark",authMiddleware, markAttendance);

// Route to modify attendance
router.put("/modify/:id",authMiddleware, modifyAttendance);

// Route to get all attendance records
router.get("/",authMiddleware, getAllAttendance);

// Route to get attendance records for a specific user
router.get("/:userId",authMiddleware, getUserAttendance);

router.get("/date",authMiddleware, getAttendanceByDate);             // Get attendance by date

export default router;
