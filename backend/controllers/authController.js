// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { role, domain, department, username, password } = req.body;
  console.log("Login request:", req.body);

  try {
    // Construct the query
    const query = {
      role,
      username,
      ...(role === "Staff" && { domain }),
      ...(department && { department }),
    };

    console.log("Query:", query);  // Log the constructed query

    // Find user based on role, username, domain (if Staff), and department
    const user = await User.findOne({role: role,
      username: username,
      domain: domain,
      department: department});
    // const all = await User.find({});
    // console.log(all);
    console.log("User found:", user);  // Check the user result

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
  //   const isPasswordValid = await bcrypt.compare(password, user.password, (err, result) => {
  //     if (err) {
  //       console.error("Error comparing passwords:", err);
  //     } else {
  //       console.log("Password match result:", result); // Should print `true` if the passwords match
  //     } 
  // });
  //   console.log('Is password valid: ', isPasswordValid);
  //   if (!isPasswordValid) {
  //     return res.status(401).json({ message: "Invalid credentials" });
  //   }

  if(user.password===password)
  {
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token, message: "Login successful" });
  }
  
  } catch (error) {
    console.error("Error during login:", error);  // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Logout function (optional if JWTs are managed client-side)
export const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
