import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

const BookList: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch the books for the selected user from the backend
    axios.get(`http://localhost:3004/book/${userId}/books`).then((response) => {
      setBooks(response.data);
    });
  }, [userId]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Book List</h1>
      {books.length === 0 ? (
        <h2 className="text-red-500">Nessun libro disponibile.</h2>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id}>
              <Link
                to={`/books/${userId}/${book.id}`}
                className="block p-4 border rounded-md hover:bg-blue-100"
              >
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-600">Autore: {book.author}</p>
                <p className="text-gray-600">ISBN: {book.isbn}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
