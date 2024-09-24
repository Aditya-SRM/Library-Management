// BookManagement.js
import React, { useState } from 'react';
import IssueBook from './IssueBook'; // Import the IssueBook component
import ReturnBook from './ReturnBook'; // Import the ReturnBook component

const BookManagement = () => {
  const [activeForm, setActiveForm] = useState('');

  const handleIssueClick = () => {
    setActiveForm('issue');
  };

  const handleReturnClick = () => {
    setActiveForm('return');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Book Management</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleIssueClick}
          className="flex-1 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Issue Book
        </button>
        <button
          onClick={handleReturnClick}
          className="flex-1 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 shadow-md"
        >
          Return Book
        </button>
      </div>
      
      {activeForm === 'issue' && (
        <div className="p-4 bg-white rounded-md shadow-md">
          <IssueBook />
        </div>
      )}
      {activeForm === 'return' && (
        <div className="p-4 bg-white rounded-md shadow-md">
          <ReturnBook />
        </div>
      )}
    </div>
  );
};

export default BookManagement;
