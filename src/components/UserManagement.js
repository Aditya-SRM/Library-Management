import React, { useState } from 'react';

const UserManagement = () => {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('new');

  const handleUserSubmit = () => {
    if (!username) {
      alert('User name is required');
    } else {
      alert(`User ${userType} added: ${username}`);
      // Clear input fields after submission
      setUsername('');
      setUserType('new');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">User Management</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md transition-transform transform hover:scale-105">
        <label className="block mb-2 text-sm font-medium text-gray-700">User Type</label>
        <select
          onChange={(e) => setUserType(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="new">New User</option>
          <option value="existing">Existing User</option>
        </select>

        <label className="block mb-2 text-sm font-medium text-gray-700">User Name</label>
        <input
          type="text"
          placeholder="Enter user name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <button
          onClick={handleUserSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
