import React, { useState } from 'react';

const Membership = () => {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [extensionPeriod, setExtensionPeriod] = useState('6 months');
  
  const handleNumberChange = (e) => {
    setMembershipNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Membership Number: ${membershipNumber} | Extension Period: ${extensionPeriod}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md transition-transform transform hover:scale-105" onSubmit={handleSubmit}>
        <h2 className="text-4xl font-bold mb-6 text-blue-800">Update Membership</h2>
        
        <div className="mb-4">
          <label htmlFor="membershipNumber" className="block text-gray-700 font-medium mb-2">
            Membership Number (required)
          </label>
          <input
            id="membershipNumber"
            type="text"
            value={membershipNumber}
            onChange={handleNumberChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter membership number"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Extend Membership By</label>
          <select
            value={extensionPeriod}
            onChange={(e) => setExtensionPeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="6 months">6 months</option>
            <option value="12 months">12 months</option>
            <option value="24 months">24 months</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Update Membership
          </button>
          <button
            type="button"
            className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
            onClick={() => alert('Membership Cancelled')}
          >
            Cancel Membership
          </button>
        </div>
      </form>
    </div>
  );
};

export default Membership;
