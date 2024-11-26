// backend/models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // References the User model
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],  // Define attendance status options
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,   // Defaults to the current date if not specified
  },
});

export default mongoose.model("Attendance", attendanceSchema);
