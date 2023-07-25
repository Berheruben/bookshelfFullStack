import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  plot: string;
  numReads: number;
}

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // GET Method to fetch book details from the backend
    axios.get<Book>(`http://localhost:3004/book/books/${bookId}`).then((response) => {
      setBook(response.data);
    });
  }, [bookId]);

  if (!book) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="mb-4">
        <span className="font-bold">Autore:</span> {book.author}
      </p>
      <p className="mb-4">
        <span className="font-bold">ISBN:</span> {book.isbn}
      </p>
      <p className="mb-4">
        <span className="font-bold">Trama:</span> {book.plot}
      </p>
      <p>
        <span className="font-bold">Numero di letture:</span> {book.numReads}
      </p>
    </div>
  );
};

export default BookDetail;
