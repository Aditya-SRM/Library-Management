import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import the Firestore database
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import Firestore functions

const IssueBook = () => {
  const [issueBookName, setIssueBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [issueRemarks, setIssueRemarks] = useState('');
  const [issueError, setIssueError] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'addedBooks'));
      const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllBooks(books);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const checkAvailability = async (bookName) => {
      const querySnapshot = await getDocs(collection(db, 'issuedBooks'));
      const issuedBooks = querySnapshot.docs.map(doc => doc.data().bookName);
      return issuedBooks.includes(bookName);
    };

    const filteredSuggestions = allBooks.filter(book =>
      book.title.toLowerCase().includes(issueBookName.toLowerCase())
    );

    const checkBookAvailability = async () => {
      if (issueBookName) {
        const availability = await checkAvailability(issueBookName);
        setIsAvailable(!availability);
      } else {
        setIsAvailable(true);
      }
    };

    setSuggestions(filteredSuggestions);
    checkBookAvailability();
  }, [issueBookName, allBooks]);

  useEffect(() => {
    if (issueDate) {
      const newReturnDate = new Date(new Date(issueDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setReturnDate(newReturnDate);
    }
  }, [issueDate]);

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    if (!issueBookName) {
      setIssueError('Book name is required.');
      return;
    }
    if (!isAvailable) {
      setIssueError('This book is already issued.');
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0];
    if (!issueDate || issueDate < currentDate) {
      setIssueError('Issue Date cannot be earlier than today.');
      return;
    }
    const maxReturnDate = new Date(new Date(issueDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    if (!returnDate || returnDate > maxReturnDate || returnDate < issueDate) {
      setIssueError(`Return Date should be between ${issueDate} and ${maxReturnDate}.`);
      return;
    }

    try {
      await addDoc(collection(db, 'issuedBooks'), {
        bookName: issueBookName,
        authorName: authorName,
        issueDate: issueDate,
        returnDate: returnDate,
        remarks: issueRemarks,
      });
      alert('Book Issued Successfully');
      setIssueBookName('');
      setAuthorName('');
      setIssueDate('');
      setReturnDate('');
      setIssueRemarks('');
      setIssueError('');
      setSuggestions([]);
      setIsAvailable(true);
    } catch (error) {
      console.error('Error adding document: ', error);
      setIssueError('Error issuing book. Please try again.');
    }
  };

  const handleSuggestionClick = (book) => {
    setIssueBookName(book.title);
    setAuthorName(book.author);
    setSuggestions([]);
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Issue Book</h2>
      {issueError && <p className="text-red-500 mb-4">{issueError}</p>}
      {issueBookName && !isAvailable && (
        <p className="text-red-500 mb-4">This book is not available.</p>
      )}
      <form onSubmit={handleIssueSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Book Name</label>
          <input
            type="text"
            value={issueBookName}
            onChange={(e) => setIssueBookName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 mt-2 bg-white max-h-40 overflow-y-auto rounded-md shadow-lg">
              {suggestions.map((book) => (
                <li
                  key={book.id}
                  className="p-2 cursor-pointer hover:bg-blue-100 transition"
                  onClick={() => handleSuggestionClick(book)}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            value={authorName}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Return Date (Auto-Generated)</label>
          <input
            type="date"
            value={returnDate}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Remarks (Optional)</label>
          <textarea
            value={issueRemarks}
            onChange={(e) => setIssueRemarks(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 shadow-lg">Issue Book</button>
      </form>
    </div>
  );
};

export default IssueBook;
