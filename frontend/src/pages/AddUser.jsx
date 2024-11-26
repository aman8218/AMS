// frontend/src/pages/AddUser.jsx
import React, { useState } from 'react';
import api from '../utils/axiosConfig';

const AddUser = () => {
  const [role, setRole] = useState('Student');
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { role, domain, password });
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  return (
    <form onSubmit={handleAddUser}>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
