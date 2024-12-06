import Student from "../models/studentmodel.js";
import multer from "multer";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder for storing images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
},
});

export const upload = multer({ storage }); // Multer instance

// Add a new student with images
export const addStudent = async (req, res) => {
  try {
    const { name, email, registrationNumber, department, domain, year } = req.body;

    // Get paths of uploaded images
    const images = req.files ? req.files.map((file) => file.path) : [];

    const student = new Student({
      name,
      email,
      registrationNumber,
      department,
      domain,
      year,
      images, // Include the images in the student document
    });

    const savedStudent = await student.save();
    res.status(201).json({ message: "Student added successfully", student: savedStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Error adding student", error: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

// Get a single student by registrationNumber
export const getStudentByRegistrationNumber = async (req, res) => {
  try {
    const student = await Student.findOne({ registrationNumber: req.params.registrationNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
};

// Update a student by registrationNumber with images
export const updateStudentByRegistrationNumber = async (req, res) => {
  try {
    const { name, email, department, domain, year } = req.body;

    // Get paths of uploaded images
    const images = req.files ? req.files.map((file) => file.path) : [];

    const updatedStudent = await Student.findOneAndUpdate(
      { registrationNumber: req.params.registrationNumber },
      { name, email, department, domain, year, $push: { images: { $each: images } } }, // Add new images to existing array
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
};

// Delete a student by registrationNumber
export const deleteStudentByRegistrationNumber = async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ registrationNumber: req.params.registrationNumber });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
};

// Add a new student
// export const addStudent = async (req, res) => {
//   try {
//     const student = new Student(req.body);
//     const savedStudent = await student.save();
//     res.status(201).json({ message: 'Student added successfully', student: savedStudent });
//   } catch (error) {
//     console.error('Error adding student:', error);
//     res.status(500).json({ message: 'Error adding student', error: error.message });
//   }
// };

// // Get all students
// export const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ message: 'Error fetching students', error: error.message });
//   }
// };

// // Get a single student by ID
// export const getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     console.error('Error fetching student:', error);
//     res.status(500).json({ message: 'Error fetching student', error: error.message });
//   }
// };

// // Update a student by ID
// export const updateStudent = async (req, res) => {
//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true, // Validate data before updating
//     });
//     if (!updatedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
//   } catch (error) {
//     console.error('Error updating student:', error);
//     res.status(500).json({ message: 'Error updating student', error: error.message });
//   }
// };

// // Delete a student by ID
// export const deleteStudent = async (req, res) => {
//   try {
//     const deletedStudent = await Student.findByIdAndDelete(req.params.id);
//     if (!deletedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json({ message: 'Student deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting student:', error);
//     res.status(500).json({ message: 'Error deleting student', error: error.message });
//   }
// };

