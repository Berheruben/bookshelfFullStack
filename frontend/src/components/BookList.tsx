// src/components/BookList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  plot: string;
  numReads: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/book/books/user/${userId}`).then((response) => {
        setBooks(response.data);
      });
    }
  }, [userId]);

  return (
   
    <div>
      <h1 className="text-3xl font-bold mb-4">Lista dei libri</h1>
      <ul className="list-disc pl-8">
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`} className="text-blue-500 hover:underline">
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
 
  );
};

export default BookList;
