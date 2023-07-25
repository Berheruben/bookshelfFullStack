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
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {books.length === 0 ? (
        <p>Nessun libro disponibile.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="mb-2">
              <Link to={`/books/${userId}/${book.id}`} className="text-blue-500 hover:underline">
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
