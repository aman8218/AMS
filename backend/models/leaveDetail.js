import mongoose from "mongoose";

const leaveDetailSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Automatically adds the date
});

// module.exports = mongoose.model("LeaveDetail", leaveDetailSchema);

export default mongoose.model("LeaveDetail", leaveDetailSchema);