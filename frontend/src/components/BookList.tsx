import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

const BookList: React.FC = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get('user');

  useEffect(() => {
    if (user) {
      // Fetch the books for the selected user from the backend
      axios.get(`http://localhost:3004/book/${user}/books`).then((response) => {
        setBooks(response.data);
      }).catch((error) => {
        console.error('Error fetching books:', error);
      });
    }
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {books.length === 0 ? (
        <p>Nessun libro disponibile per questo utente.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} className="mb-2">
              <Link to={`/books/${user}/${book.id}`} className="text-blue-500 hover:underline">
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
