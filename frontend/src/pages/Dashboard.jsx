import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [selfie, setSelfie] = useState(null); // State for storing the selfie
  const [cameraStream, setCameraStream] = useState(null); // State for camera stream
  const [showCamera, setShowCamera] = useState(false); // State to toggle camera view
  const [loading, setLoading] = useState(false);
  // const [leaveDetails, setLeaveDetails] = ([]);
  const [leaveDetails, setLeaveDetails] = useState([]); // Default value as an empty array
  const [searchQuery, setSearchQuery] = useState("");

  const {addAttendance, addLeaveDetail, getLeaveDetails, deleteLeaveDetail} = useGlobalContext();

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
              onClick={() => setActiveSection("takeAttendanceByFace")}
            >
              Take Attendance by Face Detection
            </button>
            
            <button
              className="bg-purple-500 mt-3 text-white px-4 py-2 rounded hover:bg-purple-600"
              onClick={() => setActiveSection("markAttendanceManually")}
            >
              Mark Attendance Manually
            </button>
            <button
              className="bg-yellow-500 mt-3 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => setActiveSection("leaveDetail")}
            >
              Add Leave Details
            </button>
            <button
              className="bg-yellow-500 mt-3 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => setActiveSection("getLeaveDetails")}
            >
              Get Leave Details
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
                    <video id="video" className="w-30 h-30 border border-gray-300 rounded"></video>
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
        case "getLeaveDetails":
          return (
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Leave Details</h2>
        
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search by student name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
        
              {/* Fetch Button */}
              <button
                onClick={async () => {
                  try {
                    setLoading(true); // Indicate loading state
                    const leaveData = await getLeaveDetails(); // Fetch leave details
                    setLeaveDetails(leaveData); // Save data in local state
                  } catch (error) {
                    console.error("Error fetching leave details:", error.message);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
              >
                {loading ? "Loading..." : "Fetch Leave Details"}
              </button>
        
              {/* Table with Leave Details */}
              {leaveDetails?.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Student Name</th>
                      <th className="border border-gray-300 p-2">Registration No.</th>
                      <th className="border border-gray-300 p-2">Reason</th>
                      <th className="border border-gray-300 p-2">Date</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveDetails
                      .filter((leave) =>
                        leave.studentName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((leave, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">
                            {leave.studentName}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {leave.registrationNo}
                          </td>
                          <td className="border border-gray-300 p-2">{leave.reason}</td>
                          <td className="border border-gray-300 p-2">{leave.date}</td>
                          <td className="border border-gray-300 p-2">
                            <button
                              onClick={async () => {
                                await deleteLeaveDetail(leave._id);
                                const updatedLeaveDetails = await getLeaveDetails();
                                setLeaveDetails(updatedLeaveDetails); 
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-700 mt-4">No leave details available.</p>
              )}
        
              {/* Back Button */}
              <button
                onClick={() => setActiveSection("markStudentAttendance")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4"
              >
                Back
              </button>
            </div>
          );
        
        

        case "takeAttendanceByFace":
          return (
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Take Attendance</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Class
                  </label>
                  <select
                    name="class"
                    id="class"
                    className="w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">Select Class</option>
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Start Face Detection
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setActiveSection("markStudentAttendance")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          );
          case "markAttendanceManually":
            return (
              <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Mark Attendance</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const attendanceData = {
                      studentName: formData.get("studentName"),
                      registrationNo: formData.get("registrationNo"),
                      status: formData.get("status"),
                      date: formData.get("date"),
                    };
          
                    try {
                      setLoading(true); // Optional: Indicate a loading state
                      e.target.reset()
                      await addAttendance(attendanceData);
                      showFlashMessage("Attendance marked successfully!", "success");
                      setActiveSection("markStudentAttendance"); // Go back to the main section

                      //reset the form fields after submission
                    } catch (error) {
                      console.error("Error marking attendance:", error.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Student Name</label>
                    <input
                      type="text"
                      name="studentName"
                      placeholder="Enter Student Name"
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Registration Number</label>
                    <input
                      type="text"
                      name="registrationNo"
                      placeholder="Enter Registration Number"
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Status</label>
                    <select
                      name="status"
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      onClick={() => setActiveSection("markStudentAttendance")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            );
          

            case "leaveDetail":
              return (
                <div className="bg-white shadow-md rounded p-6">
                  <h2 className="text-2xl font-bold text-gray-700 mb-4">Leave Details</h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const leaveData = {
                        studentName: formData.get("studentName"),
                        registrationNo: formData.get("registrationNo"),
                        reason: formData.get("reason"),
                      };
            
                      try {
                        e.target.reset();
                        await addLeaveDetail(leaveData); // Call the function from GlobalContext
                        showFlashMessage("Leave details submitted successfully!", "success");
                        setActiveSection("markStudentAttendance"); // Redirect to another section
                      } catch (error) {
                        console.error("Error submitting leave details:", error.message);
                        showFlashMessage(
                          "Failed to submit leave details. Please try again.",
                          "error"
                        );
                      }
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Student Name
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Enter student name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Registration No.
                      </label>
                      <input
                        type="text"
                        name="registrationNo"
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Enter registration number"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Reason
                      </label>
                      <textarea
                        name="reason"
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Enter reason for leave"
                        rows={4}
                        required
                      ></textarea>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
