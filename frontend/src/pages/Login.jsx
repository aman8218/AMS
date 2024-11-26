// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [role, setRole] = useState('HOD');
  const [domain, setDomain] = useState('');
  const [department, setDepartment] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        role,
        username,
        password,
        ...(role === "Staff" && { domain }),
        department,
      };

      const response = await api.post('/auth/login', loginData);
        alert('Login successful')
        localStorage.setItem('token', response.data.token); 
        navigate('/dashboard'); 

    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Role:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="HOD">HOD</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        {role === 'Staff' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Domain:
            </label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Domain</option>
              <option value="Fullstack">Fullstack</option>
              <option value="ML">ML</option>
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Department:
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Department</option>
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username:
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;