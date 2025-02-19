import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: token },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        navigate("/login");
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, status: "approved" } : user));
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Remove rejected user from UI
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      <h3 className="text-xl mt-4">User Management</h3>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.status === "pending" && (
                  <>
                    <button 
                      className="bg-green-500 text-white px-3 py-1 rounded mx-1"
                      onClick={() => handleApprove(user._id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded mx-1"
                      onClick={() => handleReject(user._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
