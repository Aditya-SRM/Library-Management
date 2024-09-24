import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ReturnBook = () => {
  const [returnBookName, setReturnBookName] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  //const [serialNumber, setSerialNumber] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnRemarks, setReturnRemarks] = useState('');
  const [returnError, setReturnError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (returnBookName.trim()) {
        setLoading(true);
        const allBooks = [];
        const querySnapshot = await getDocs(collection(db, 'issuedBooks'));
        
        querySnapshot.forEach((doc) => {
          allBooks.push({ id: doc.id, ...doc.data() });
        });

        const matchedBook = allBooks.find(book => 
          book.bookName.toLowerCase().includes(returnBookName.trim().toLowerCase())
        );

        setLoading(false);

        if (matchedBook) {
          setBookDetails(matchedBook);
          setReturnDate(matchedBook.returnDate);
          setReturnError('');
        } else {
          setBookDetails(null);
          setReturnError('No book found with this name.');
        }
      } else {
        setBookDetails(null);
        setReturnError('');
      }
    };
    fetchBookDetails();
  }, [returnBookName]);

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!returnBookName || /*!serialNumber || */!returnDate) {
      setReturnError('All fields are required.');
      return;
    }

    try {
      if (bookDetails) {
        await deleteDoc(doc(db, 'issuedBooks', bookDetails.id));
        alert('Book Returned Successfully');
        setReturnBookName('');
        //setSerialNumber('');
        setReturnDate('');
        setReturnRemarks('');
        setBookDetails(null);
        navigate('/pay-fine');
      }
    } catch (error) {
      console.error('Error returning book: ', error);
      setReturnError('Error returning book. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Return Book</h2>
      {returnError && <p className="text-red-500 mb-4">{returnError}</p>}
      {loading && <p className="text-blue-500 mb-4">Searching for the book...</p>}
      <form onSubmit={handleReturnSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Book Name</label>
          <input
            type="text"
            value={returnBookName}
            onChange={(e) => setReturnBookName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {bookDetails && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Author Name</label>
              <input
                type="text"
                value={bookDetails.authorName}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Remarks (Optional)</label>
          <textarea
            value={returnRemarks}
            onChange={(e) => setReturnRemarks(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Confirm Return
        </button>
      </form>
    </div>
  );
};

export default ReturnBook;
