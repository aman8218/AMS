// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/profile">Profile</Link>
      <Link to="/face-detection">Face Detection</Link>
      <Link to="/add-user">Add User</Link>
      <Link to="/leave-details">Leave Details</Link>
      <Link to="/attendance-record">Attendance Record</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
