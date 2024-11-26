import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  // Flash message handler
  const showFlashMessage = (message, type = "success") => {
    setFlashMessage({ message, type }); // `type` can be 'success' or 'error'
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000);
  };

  // CRUD operations for students
  const addStudent = async (studentData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}students/add`, studentData);
      showFlashMessage(res.data.message, "success");
    } catch (error) {
      showFlashMessage(
        error.response?.data?.message || "Error adding student",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}students`);
      return res.data; // Return the student data
    } catch (error) {
      showFlashMessage(
        error.response?.data?.message || "Error fetching students",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStudentById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}students/${id}`);
      return res.data;
    } catch (error) {
      showFlashMessage(
        error.response?.data?.message || "Error fetching student",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}students/${id}`, updatedData);
      showFlashMessage(res.data.message, "success");
    } catch (error) {
      showFlashMessage(
        error.response?.data?.message || "Error updating student",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}students/${id}`);
      showFlashMessage(res.data.message, "success");
    } catch (error) {
      showFlashMessage(
        error.response?.data?.message || "Error deleting student",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        flashMessage,
        addStudent,
        getStudents,
        getStudentById,
        updateStudent,
        deleteStudent,
      }}
    >
        {/* Flash message component */}
      {flashMessage && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            padding: "10px 20px",
            backgroundColor:
              flashMessage.type === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {flashMessage.message}
        </div>
      )}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
