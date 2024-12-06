import mongoose from "mongoose";

const studentAttendanceSchema = new mongoose.Schema({
  studentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",   // References the Student model
    required: true,
  },
  registrationNo:{
    type: String,
    required:true
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

const StudentAttendance = mongoose.model("StudentAttendance", studentAttendanceSchema);

export default StudentAttendance;
