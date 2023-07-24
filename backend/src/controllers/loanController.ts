// controllers/loanController.ts

import { Request, Response } from 'express';
import Loan from '../models/loanModel';
import Book from '../models/bookModel';
import User from '../models/userModel';

export const takeBook = async (req: Request, res: Response) => {
  const { bookId, userId } = req.body;

  try {
    const book = await Book.findByPk(bookId);
    const user = await User.findByPk(userId);

    if (!book || !user) {
      res.status(404).json({ error: 'Book or User not found' });
    } else {
      // Check if the book is already taken by the user
      const isTaken = await Loan.findOne({
        where: {
          bookId: book.id,
          userId: user.id,
        },
      });

      if (isTaken) {
        res.status(409).json({ error: 'Book is already taken by the user' });
      } else {
        // Create a new Loan record to associate the book with the user
        await Loan.create({
          bookId: book.id,
          userId: user.id,
        });

        // Update the book's userId attribute to associate it with the user
        await book.update({ userId: user.id });

        res.json({ message: 'Book taken successfully' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Error taking the book', details: error.message });
  }
};
export const getAllLoans = async (_req: Request, res: Response) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving loans', details: error.message });
  }
};

export const getLoansByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const loans = await Loan.findAll({ where: { userId } });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving loans by user', details: error.message });
  }
};

export const getLoansByBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const loans = await Loan.findAll({ where: { bookId } });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving loans by book', details: error.message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { loanId } = req.params;
  try {
    const loan = await Loan.findByPk(loanId);
    if (!loan) {
      res.status(404).json({ error: 'Loan not found' });
    } else {
      await loan.destroy();
      res.json({ message: 'Book returned successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error returning the book', details: error.message });
  }
};
