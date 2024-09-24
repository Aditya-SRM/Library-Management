import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link
            to="/book-management"
            className="block bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-2 px-4 rounded-md shadow transition duration-200"
          >
            Book Management
          </Link>
        </li>
        <li>
          <Link
            to="/membership"
            className="block bg-green-100 hover:bg-green-200 text-green-600 font-medium py-2 px-4 rounded-md shadow transition duration-200"
          >
            Membership Management
          </Link>
        </li>
        <li>
          <Link
            to="/user-management"
            className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-medium py-2 px-4 rounded-md shadow transition duration-200"
          >
            User Management
          </Link>
        </li>
      </ul>
      <div className="mt-6">
        <Link to="/">
          <button className="bg-red-600 text-white p-3 rounded-md shadow-lg hover:bg-red-700 transition duration-300 w-full">
            Log-out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
