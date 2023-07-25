
import { Request, Response } from 'express';
import Book from '../models/bookModel';
import User from '../models/userModel';

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error getting all books', details: error.message });
  }
};

// Helper function to validate ISBN format
const isValidISBN = (isbn: string): boolean => {
  // Check if ISBN starts with prefixes '978' or '979'
  if (!isbn.startsWith('978') && !isbn.startsWith('979')) {
    return false;
  }

  // Check if ISBN has a length of 13 digits
  if (isbn.length !== 13) {
    return false;
  }

  // Check if ISBN contains only numeric digits
  if (!/^\d+$/.test(isbn)) {
    return false;
  }

  // Check the language area prefix (88 or 12)
  const areaLinguisticaPrefix = isbn.substring(3, 5);
  if (areaLinguisticaPrefix !== '88' && areaLinguisticaPrefix !== '12') {
    return false;
  }

  // Check the publisher prefix (2 to 6 digits)
  const editorePrefix = isbn.substring(5, 11);
  if (editorePrefix.length < 2 || editorePrefix.length > 6) {
    return false;
  }

  // The fifth part of the ISBN is the control number (0-9)
  const controlNumber = isbn.charAt(12);
  if (!/^\d$/.test(controlNumber)) {
    return false;
  }

  // The ISBN is valid
  return true;
};

// Add a new book
export const addBook = async (req: Request, res: Response) => {
  const { title, author, isbn, plot } = req.body;
  const addedDate = new Date();
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

// Get a book by its ID
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id, typeof id);
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      console.log(book, typeof book);
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the book', details: error.message });
  }
};

// Get books by user ID
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

// Update a book
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

// Delete a book
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

// Mark a book as read
export const markBookAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      await book.increment('numReads'); // Increment the number of reads of the book
      res.json({ message: 'Book marked as read successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error marking the book as read', details: error.message });
  }
};

// Get books by author name
export const getBooksByAuthor = async (req: Request, res: Response) => {
  const { author } = req.params;
  try {
    const books = await Book.findAll({ where: { author } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving books by author', details: error.message });
  }
};

// Add a plot to a book
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

// Take a book (assign it to a user)
export const takeBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = req.body.userId;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.update({ userId });
    res.json({ message: 'Book taken successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error taking the book', details: error.message });
  }
};

// Return a book (remove the assigned user)
export const returnBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.update({ userId: null });

    res.json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error returning the book', details: error.message });
  }
};
