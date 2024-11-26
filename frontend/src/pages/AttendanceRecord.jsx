// frontend/src/pages/AttendanceRecord.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/axiosConfig';

const AttendanceRecord = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get('/attendance');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance records', error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.user.name}</td>
              <td>{record.status}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecord;
