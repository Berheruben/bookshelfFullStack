
import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

// Routes for books
router.get('/books', bookController.getAllBooks); // Get all books
router.post('/addbook', bookController.addBook); // Add a new book
router.get('/books/:id', bookController.getBookById); // Get a book by its ID
router.put('/updatebook/:id', bookController.updateBook); // Update a book
router.delete('/deletebook/:id', bookController.deleteBook); // Delete a book
router.put('/books/:id/mark-read', bookController.markBookAsRead); // Mark a book as read
router.get('/books/author/:author', bookController.getBooksByAuthor); // Get books by author name
router.put('/books/:id/plot', bookController.addPlotToBook); // Add a plot to a book
router.post('/books/:id/take', bookController.takeBook); // Take a book (assign it to a user)
router.post('/books/:id/return', bookController.returnBook); // Return a book (remove the assigned user)

// Routes for users
router.get('/:userId/books', bookController.getBooksByUser); // Get books by user ID


export default router;
