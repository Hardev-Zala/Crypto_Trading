import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Pencil, Trash, User, Phone, Shield } from "lucide-react"; // Icons for user details
import toast from "react-hot-toast";

const Settings = ({ darkMode }) => {
  const [users, setUsers] = useState([]); // State to store all users
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/admin/users"
        );
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user card click
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle user update
  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3500/api/v1/admin/users/${updatedUser._id}`,
        updatedUser
      );
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setIsModalOpen(false);
        // Close the modal after update
        toast.success(`Updated User Profile of ${updatedUser}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(`Deleted User Profile of ${updatedUser}`);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3500/api/v1/admin/users/${userId}`
      );
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        setIsModalOpen(false); // Close the modal after deletion
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to truncate long text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-4xl font-bold mb-8">User Management</h2>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={() => handleUserClick(user)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`p-3 rounded-full ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <User
                    className={`w-6 h-6 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold break-all">
                  {" "}
                  {/* Use break-all for long emails */}
                  {user.email}
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {user.phone}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    KYC Status:{" "}
                    <span className="font-medium">{user.kycStatus}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className={`w-full max-w-lg rounded-xl shadow-2xl ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Edit User Details</h3>

              {/* User Details Form */}
              {selectedUser && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateUser(selectedUser);
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={selectedUser.phone}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          phone: e.target.value,
                        })
                      }
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      KYC Status
                    </label>
                    <select
                      value={selectedUser.kycStatus}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          kycStatus: e.target.value,
                        })
                      }
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Update and Delete Buttons */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(selectedUser._id)}
                      className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash className="w-5 h-5 mr-2" />
                      Delete
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Pencil className="w-5 h-5 mr-2" />
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
