import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login';
import BooksList from './components/BookList';
import BookDetails from './components/BookDetails';
import './index.css'
const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/books/:userId" element={<BooksList />} />
        <Route path="/books/:userId/:bookId" element={<BookDetails />} />
      </Routes>
    </Router>
    
    </>
  );
};

export default App;
