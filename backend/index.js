
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
import leaveRoutes from './routes/leaveRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,               
};

app.use(cors(corsOptions));

  
  


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/studentattendance', studentAttendance);
app.use('/api/students', studentRoutes);
app.use('/api/student-leavedetail', leaveRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
