// controllers/book.controller.ts
import { Request, Response } from 'express';
import Book from '../models/bookModel';
import { Op } from 'sequelize';
import User from '../models/userModel';
import Loan from '..//models/loanModel';
import { takeBook as takeBookLoan, returnBook as returnBookLoan } from '../controllers/loanController';

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      res.status(404).json({ error: 'Books not found' });
    } else {
      res.json(books);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving books', details: error.message });
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { title, author, isbn, plot } = req.body;
  const addedDate = new Date()
  try {
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Title, author, and ISBN are required fields' });
    }

    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      return res.status(409).json({ error: 'Book with the same ISBN already exists' });
    }

    const book = await Book.create({ title, author, isbn, plot,addedDate });
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


export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, isbn, plot } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Title, author, and ISBN are required fields' });
    }

    const existingBook = await Book.findOne({ where: { isbn, id: { [Op.not]: id } } });
    if (existingBook) {
      return res.status(409).json({ error: 'Book with the same ISBN already exists' });
    }

    await book.update({ title, author, isbn, plot });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error updating the book', details: error.message });
  }
};
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the book', details: error.message });
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

export const takeBook = async (req: Request, res: Response) => {
  // Call the loanController function to borrow a book
   
  return await takeBookLoan(req, res);
};

export const returnBook = async (req: Request, res: Response) => {
  // call the loanController function to return a book
  return await returnBookLoan(req, res);
};