import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [selfie, setSelfie] = useState(null); // State for storing the selfie
  const [cameraStream, setCameraStream] = useState(null); // State for camera stream
  const [showCamera, setShowCamera] = useState(false); // State to toggle camera view

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data); // Save retrieved user data to state
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle file input for uploading selfie
  const handleSelfieUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelfie(reader.result); // Save the uploaded selfie in base64 format
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to start the camera
  const startCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraStream(stream);
        const videoElement = document.getElementById("video");
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((error) => console.error("Failed to access camera", error));
  };

  // Function to capture the selfie
  const captureSelfie = () => {
    const videoElement = document.getElementById("video");
    const canvasElement = document.createElement("canvas");
    const context = canvasElement.getContext("2d");

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

    setSelfie(canvasElement.toDataURL("image/png")); // Save the captured selfie as base64
    stopCamera(); // Stop the camera after capturing the selfie
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Welcome Back!
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-bold">Today's Attendance</h3>
                <p className="text-gray-600">X/X Students Present</p>
              </div>
              <div className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-bold">My Attendance</h3>
                <p className="text-gray-600">85% this month</p>
              </div>
              <div className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-bold">Pending Approvals</h3>
                <p className="text-gray-600">2 Requests</p>
              </div>
            </div>
          </div>
        );
      case "markStudentAttendance":
        return (
          <div className="flex flex-col items-start">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
              onClick={() => setActiveSection("registerStudent")}
            >
              Register Student
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => alert("Take Attendance by Face Detection")}
            >
              Take Attendance by Face Detection
            </button>
          </div>
        );
      case "registerStudent":
        return (
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Register Student</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter student name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Registration No.
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter student ID"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Domain
                </label>
                <select name="" id="" className="w-full border border-gray-300 rounded p-2">
                  <option value="">Fullstack</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Selfie
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={startCamera}
                  >
                    Take Selfie
                  </button>
                  <label className="cursor-pointer bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                    Upload Selfie
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelfieUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {showCamera && (
                  <div className="mt-4">
                    <video id="video" className="w-full border border-gray-300 rounded"></video>
                    <div className="flex space-x-4 mt-2">
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={captureSelfie}
                      >
                        Capture
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={stopCamera}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {selfie && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Preview
                  </label>
                  <img
                    src={selfie}
                    alt="Selfie Preview"
                    className="w-32 h-32 object-cover border border-gray-300 rounded"
                  />
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 "
                  onClick={() => setActiveSection("markStudentAttendance")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Reload to redirect to login page
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            className="hover:bg-blue-500 px-4 py-2 rounded"
            onClick={() => setActiveSection("overview")}
          >
            Home
          </button>
          <button
            className="hover:bg-blue-500 px-4 py-2 rounded"
            onClick={() => setActiveSection("markStudentAttendance")}
          >
            Attendance
          </button>
        </div>
        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">{renderMainContent()}</div>
    </div>
  );
};

export default Dashboard;
