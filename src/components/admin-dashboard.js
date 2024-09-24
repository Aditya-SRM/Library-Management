import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
        <Link to="/add-book" className="w-full">
          <button className="bg-blue-700 text-white p-3 rounded-md shadow-lg hover:bg-blue-800 transition duration-300 w-full">
            Add Book
          </button>
        </Link>
        <Link to="/update-book" className="w-full">
          <button className="bg-yellow-500 text-white p-3 rounded-md shadow-lg hover:bg-yellow-600 transition duration-300 w-full">
            Update Book
          </button>
        </Link>
        <Link to="/" className="w-full">
          <button className="bg-red-600 text-white p-3 rounded-md shadow-lg hover:bg-red-700 mt-6 transition duration-300 w-full">
            Log-out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
