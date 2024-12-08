import Student from "../models/studentmodel.js";
import multer from "multer";
import axios from "axios"; // Import axios for making requests to the flask server

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

    // const student = new Student({
    //   name,
    //   email,
    //   registrationNumber,
    //   department,
    //   domain,
    //   year,
    //   images, // Include the images in the student document
    // });

    // prepare form data for sending to the flask server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("registrationNumber", registrationNumber);
    formData.append("department", department);
    formData.append("domain", domain);
    formData.append("year", year);
    images.forEach((image) => {
      formData.append("images", fs.createReadStream(image));
    });

    // Send a POST request to the flask server
    const flaskResponse = await axios.post("http://localhost:8000/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // extract the embeddings from the flask server
    const { embeddings } = flaskResponse.data;

    // Create a new student document with embeddings
    const student = new Student({
      name,
      email,
      registrationNumber,
      department,
      domain,
      year,
      images,
      embeddings,
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

