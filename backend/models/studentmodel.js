import mongoose from "mongoose";

// const hodSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     department: { type: String, required: true },
//     password: { type: String, required: true }
// });

// const studentSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     domain: { type: String, enum: ['fullstack', 'ml'], required: true },
//     registrationNumber: {type: String},
//     department: { type: String, required: true }
// });


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    attendance: { type: Number, default: 0 }, // e.g., percentage of attendance
  }, { timestamps: true });

// const staffSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     department: { type: String, required: true },
//     role: { type: String, enum: ['staff'], default: 'staff' },
//     domain: { type: String, enum: ['fullstack', 'ml'], required: true },
//     password: { type: String, required: true }
// });

// module.exports = mongoose.model('HOD', hodSchema);
// module.exports = mongoose.model('Staff', staffSchema);
const Student =  mongoose.model('Student', studentSchema);

export default Student;