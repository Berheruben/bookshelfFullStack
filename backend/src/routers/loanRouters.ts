// routes/loanRouters.ts
import express from 'express';
import { getAllLoans, getLoansByUser, getLoansByBook } from '../controllers/loanController';

const router = express.Router();

router.get('/loans', getAllLoans);
router.get('/loans/user/:userId', getLoansByUser);
router.get('/loans/book/:bookId', getLoansByBook);

export default router;
