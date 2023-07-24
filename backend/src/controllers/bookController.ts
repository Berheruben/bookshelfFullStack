// controllers/book.controller.ts
import { Request, Response } from 'express';
import Book from '../models/bookModel';
import { Op } from 'sequelize';
//import { takeBook as takeBookLoan, returnBook as returnBookLoan } from '../controllers/loanController';

import User from '../models/userModel';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error getting all books', details: error.message });
  }
};

const isValidISBN = (isbn: string): boolean => {
  // Verifica se l'ISBN inizia con i prefissi 978 o 979
  if (!isbn.startsWith('978') && !isbn.startsWith('979')) {
    return false;
  }

  // Verifica se l'ISBN ha una lunghezza di 13 cifre
  if (isbn.length !== 13) {
    return false;
  }

  // Verifica se l'ISBN contiene solo cifre numeriche
  if (!/^\d+$/.test(isbn)) {
    return false;
  }

  // Verifica il prefisso dell'area linguistica (88 o 12)
  const areaLinguisticaPrefix = isbn.substring(3, 5);
  if (areaLinguisticaPrefix !== '88' && areaLinguisticaPrefix !== '12') {
    return false;
  }

  // Verifica il prefisso editore (da 2 a 6 cifre)
  const editorePrefix = isbn.substring(5, 11);
  if (editorePrefix.length < 2 || editorePrefix.length > 6) {
    return false;
  }

  // La quinta parte dell'ISBN è il numero di controllo (0-9)
  const controlNumber = isbn.charAt(12);
  if (!/^\d$/.test(controlNumber)) {
    return false;
  }

  // L'ISBN è valido
  return true;
};

export const addBook = async (req: Request, res: Response) => {
  const { title, author, isbn, plot } = req.body;
  const addedDate = new Date()
  try {
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Title, author, and ISBN are required fields' });
    }
    if (!isValidISBN(isbn)) {
      return res.status(400).json({ error: 'Invalid ISBN' });
    }
    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      return res.status(409).json({ error: 'Book with the same ISBN already exists' });
    }
    
    const book = await Book.create({ title, author, isbn, plot, addedDate });
    res.json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(400).json({ error: 'Error adding the book', details: error.message });
  }
};


export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the book', details: error.message });
  }
};
export const getBooksByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const books = await Book.findAll({
      where: { userId },
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error getting books by user', details: error.message });
  }
};


// CRUD: Update - Modifica un libro
export const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { title, author, isbn, plot } = req.body;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.plot = plot || book.plot;
    await book.save();

    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(400).json({ error: 'Error updating the book', details: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting the book', details: error.message });
  }
};
export const markBookAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      await book.increment('numReads'); // Increment the number of read of the book
      res.json({ message: 'Book marked as read successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error marking the book as read', details: error.message });
  }
};
export const getBooksByAuthor = async (req: Request, res: Response) => {
  const { author } = req.params;
  try {
    const books = await Book.findAll({ where: { author } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving books by author', details: error.message });
  }
};
export const addPlotToBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { plot } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      await book.update({ plot });
      res.json({ message: 'Plot added to book successfully' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error adding plot to the book', details: error.message });
  }
};
// Aggiungi un libro all'utente
export const takeBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.body.userId; // Assumendo che l'ID dell'utente sia passato come parametro nel corpo della richiesta

    // Controlla se l'utente esiste
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Controlla se il libro esiste
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Associa il libro all'utente impostando il campo userId nella tabella Book
    await book.update({ userId });

    res.json({ message: 'Book taken successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error taking the book', details: error.message });
  }
};

// Restituisci un libro
export const returnBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    // Controlla se il libro esiste
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Rimuovi l'associazione del libro dall'utente impostando il campo userId nella tabella Book a null
    await book.update({ userId: null });

    res.json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error returning the book', details: error.message });
  }
};
