import StudentAttendance from "../models/studentAttendance.js";
import Student from "../models/studentmodel.js";

export const createStudentAttendance = async (req, res) => {
  try {
    const { registrationNo, status, date } = req.body;

    // Check if the student exists by registration number
    const student = await Student.findOne({ registrationNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Create new attendance record
    const newAttendance = new StudentAttendance({
      studentName: student._id, // Store the reference to the student
      registrationNo,
      status,
      date: date || Date.now(), // Default to current date if not provided
    });

    await newAttendance.save();
    res.status(201).json({ message: "Attendance recorded successfully", newAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error recording attendance", error });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const { registrationNo } = req.params;

    const attendanceRecords = await StudentAttendance.find({ registrationNo });
    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this student" });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving attendance records", error });
  }
};

export const updateStudentAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status, date } = req.body;

    const updatedAttendance = await StudentAttendance.findByIdAndUpdate(
      attendanceId,
      { status, date },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance updated successfully", updatedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance record", error });
  }
};

export const deleteStudentAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const deletedAttendance = await StudentAttendance.findByIdAndDelete(attendanceId);
    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance record", error });
  }
};

export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    // Parse the provided date and find attendance records for that date
    const targetDate = new Date(date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    // Query to find attendance records within the specified date range
    const attendanceRecords = await StudentAttendance.find({
      date: {
        $gte: targetDate,
        $lt: nextDay,
      },
    }).populate("studentName", "name department domain"); // Populating to get student details

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this date" });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving attendance records by date", error });
  }
};
