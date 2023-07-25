// src/components/BookDetail.tsx
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
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // Effettua una richiesta GET al backend per ottenere i dettagli del libro
    axios.get<Book>(`http://localhost:3004/book/books/${id}`).then((response) => {
      setBook(response.data);
    });
  }, [id]);

  if (!book) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="mb-4">
        <span className="font-bold">Autore:</span> {book.author}
      </p>
      <p className="mb-4">
        <span className="font-bold">ISBN:</span> {book.isbn}
      </p>
      <p>{book.plot}</p>
      <p className="mt-4">
        <span className="font-bold">Numero di letture:</span> {book.numReads}
      </p>
    </div>
  );
};

export default BookDetail;
