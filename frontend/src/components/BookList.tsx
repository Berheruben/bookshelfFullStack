// src/components/BookList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    // Effettua una richiesta GET al backend per ottenere i libri dell'utente loggato
    axios.get<Book[]>('http://localhost:3000/api/books').then((response) => {
        if(!response.data) console.log("NON CI SONO LIBRI");
      setBooks(response.data);
    });
  }, []);

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
