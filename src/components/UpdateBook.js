import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';

const UpdateBook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) {
      setBooks([]);
      return;
    }

    const q = query(collection(db, 'addedBooks'), where('title', '>=', searchTerm));
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(results);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!author || !isbn) {
      setError('Author and ISBN fields are mandatory.');
      return;
    }

    setError('');
    try {
      const docRef = doc(db, 'addedBooks', selectedBook.id);
      await updateDoc(docRef, { author, isbn });
      alert('Book updated successfully.');
      resetForm();
    } catch (error) {
      console.error('Error updating document: ', error);
      setError('Failed to update book. Please try again.');
    }
  };

  const resetForm = () => {
    setBooks([]); // Clear search results
    setSearchTerm(''); // Clear search input
    setSelectedBook(null); // Reset selected book
    setAuthor(''); // Clear author field
    setIsbn(''); // Clear ISBN field
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Search and Update Book</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={handleSearch} className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition">
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {books.length > 0 && (
        <ul className="mb-4">
          {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center border-b py-2">
              <span>{book.title} (by {book.author})</span>
              <button
                onClick={() => {
                  setSelectedBook(book);
                  setAuthor(book.author); // Pre-fill the author field
                  setIsbn(book.isbn); // Pre-fill the ISBN field
                }}
                className="bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedBook && (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="mr-4 font-medium">Selected Book:</label>
            <span className="font-medium">{selectedBook.title}</span>
          </div>

          <div className="mb-4">
            <label className="block">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button type="submit" className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition">
            Update Book
          </button>
          <Link to="/admin-dashboard" className="inline-block ml-4">
            <button type="button" className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition mt-4">
              Back
            </button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default UpdateBook;
