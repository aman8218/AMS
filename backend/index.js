
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentAttendance from './routes/studentAttendance.js'
import studentRoutes from './routes/studentRoutes.js'
import cors from 'cors';
import Student from './models/studentmodel.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,               
};

app.use(cors(corsOptions));

// const addStudent = async () => {
//     try {
//       const result = await Student.insertMany([
//         {
//           name: "John Doe",
//           email: "john.doe@example.com",
//           registrationNumber: "CS101",
//           department: "Computer Science",
//           year: "2nd Year",
//           attendance: 85, // Example attendance percentage
//         },
//         {
//           name: "Jane Smith",
//           email: "jane.smith@example.com",
//           registrationNumber: "EE102",
//           department: "Electronics",
//           year: "3rd Year",
//           attendance: 90,
//         },
//         {
//           name: "Robert Brown",
//           email: "robert.brown@example.com",
//           registrationNumber: "ME103",
//           department: "Mechanical",
//           year: "4th Year",
//           attendance: 75,
//         },
//         {
//           name: "Emily Davis",
//           email: "emily.davis@example.com",
//           registrationNumber: "CE104",
//           department: "Civil Engineering",
//           year: "1st Year",
//           attendance: 95,
//         },
//         {
//           name: "Michael Johnson",
//           email: "michael.johnson@example.com",
//           registrationNumber: "IT105",
//           department: "Information Technology",
//           year: "4th Year",
//           attendance: 80,
//         },
//       ]);
  
//       console.log("Students added successfully:", result);
//     } catch (error) {
//       console.error("Error adding students:", error.message);
//     }
//   };
  
//   addStudent();
  
  
  


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/studentattendance', studentAttendance);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
