import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login';
import BooksList from './components/BookList';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound'; // Importa il componente NotFound

const App: React.FC = () => {
  return (
    <Router>
      <Routes> 
        {/* Rotta per il login */}
        <Route path="/" element={<Login />} />

        {/* Rotta per l'elenco dei libri */}
        <Route path="/books/:userId" element={<BooksList />} />

        {/* Rotta per la pagina di dettaglio del libro */}
        <Route path="/books/:userId/:bookId" element={<BookDetails />} />

        {/* Rotte di fallback per gestire gli URL sconosciuti */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
