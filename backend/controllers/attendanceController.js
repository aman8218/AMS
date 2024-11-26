// backend/controllers/attendanceController.js
import Attendance from "../models/Attendance.js";

// Fetch all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate("user", "name email"); // Populate with user name and email
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records", error });
  }
};

// Fetch attendance records for a specific user
export const getUserAttendance = async (req, res) => {
  const { userId } = req.params;

  try {
    const attendanceRecords = await Attendance.find({ user: userId }).populate("user", "name email");
    if (!attendanceRecords) {
      return res.status(404).json({ message: "No attendance records found for this user" });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance records for the user", error });
  }
};

// (Optional) Get attendance for a specific date
export const getAttendanceByDate = async (req, res) => {
  const { date } = req.query;

  try {
    const attendance = await Attendance.find({ date: new Date(date) }).populate("user", "name email");
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving attendance for the specified date", error });
  }
};

// Mark attendance for a student
export const markAttendance = async (req, res) => {
  const { user, status } = req.body;
  const date = req.body.date || new Date(); // Default to today's date if not provided

  try {
    // Check if attendance is already marked for the user on the same date
    const existingAttendance = await Attendance.findOne({ user, date });
    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today." });
    }

    const attendance = new Attendance({ user, status, date });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

// Modify attendance for a student
export const modifyAttendance = async (req, res) => {
  const { id } = req.params; // Attendance record ID
  const { status, date } = req.body;

  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    attendance.status = status || attendance.status;
    attendance.date = date || attendance.date;

    await attendance.save();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error modifying attendance", error });
  }
};
