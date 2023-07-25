import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes> 
        {/* Route for login */}
        <Route path="/" element={<Login />} />

        {/* Route for the list of books */}
        <Route path="/books/:userId" element={<BookList />} />

        {/* Route for the book details page */}
        <Route path="/books/:userId/:bookId" element={<BookDetails />} />

        {/* Fallback routes to handle unknown URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
