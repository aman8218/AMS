import LeaveDetail from "../models/leaveDetail.js";

// Add leave detail
export const addLeaveDetail = async (req, res) => {
  try {
    const { studentName, registrationNo, reason } = req.body;
    const leaveDetail = new LeaveDetail({ studentName, registrationNo, reason });
    await leaveDetail.save();
    res.status(201).json({ message: "Leave detail added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add leave detail", error });
  }
};

// Get all leave details
export const getLeaveDetails = async (req, res) => {
  try {
    const leaveDetails = await LeaveDetail.find();
    res.status(200).json(leaveDetails);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leave details", error });
  }
};

// Delete leave detail
export const deleteLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await LeaveDetail.findByIdAndDelete(id);
    res.status(200).json({ message: "Leave detail deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete leave detail", error });
  }
};
