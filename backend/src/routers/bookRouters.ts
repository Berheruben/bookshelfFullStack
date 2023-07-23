// routes/bookRoutes.ts
import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.post('/addbook', bookController.addBook);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Nuove rotte per il prestito del libro
router.post('/books/:id/take', bookController.takeBook);
router.post('/books/:id/return', bookController.returnBook);

router.put('/books/:id/mark-read', bookController.markBookAsRead);
router.get('/books/author/:author', bookController.getBooksByAuthor);
router.put('/books/:id/plot', bookController.addPlotToBook);

export default router;
