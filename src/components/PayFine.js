import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PayFine = () => {
  const [finePaid, setFinePaid] = useState(false);
  const [fineAmount, setFineAmount] = useState(0); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fineAmount === 0) {
      alert('No fine. Transaction complete.');
      navigate('/dashboard'); 
    } else if (finePaid) {
      alert('Fine paid. Transaction complete.');
      navigate('/dashboard'); 
    } else {
      alert('Please pay the fine to complete the transaction.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Pay Fine</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fine Amount  (PerDay*50)</label>
            <input
              type="number"
              value={fineAmount}
              onChange={(e) => setFineAmount(Number(e.target.value))} 
              min="0" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {fineAmount > 0 && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={finePaid}
                  onChange={() => setFinePaid(!finePaid)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Fine Paid</span>
              </label>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Remarks (Optional)</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayFine;
