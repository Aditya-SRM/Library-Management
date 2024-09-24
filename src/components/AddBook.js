import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';

const AddBook = () => {
  const [type, setType] = useState('book');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !author || !serialNumber) {
      setError('All fields are mandatory.');
      return;
    }

    // Reset error message
    setError('');

    try {
      // Add the book data to Firestore under the "addedBooks" collection
      await addDoc(collection(db, 'addedBooks'), {
        type,
        title,
        author,
        serialNumber,
      });

      alert(`${type === 'book' ? 'Book' : 'Movie'} added successfully.`);
      // Reset form fields after submission
      setTitle('');
      setAuthor('');
      setSerialNumber('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add {type === 'book' ? 'Book' : 'Movie'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            >
              <option value="book">Book</option>
              <option value="movie">Movie</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Add {type === 'book' ? 'Book' : 'Movie'}
          </button>
          <Link to="/admin-dashboard">
            <button type="button" className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 mt-4">
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
