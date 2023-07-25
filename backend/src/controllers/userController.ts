// controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/userModel';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required fields' });
    }

    // Verifica se l'indirizzo email è valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Controlla se l'indirizzo email esiste già nel database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Se l'indirizzo email esiste già, restituisci un errore
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Se l'indirizzo email non esiste, crea un nuovo utente
    const user = await User.create({ firstName, lastName, email });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error adding the user' });
  }
};


// Add other user-related controller functions (update and delete) here
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the user' });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required fields' });
    }

    // Verifica se l'indirizzo email è valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Controlla se l'indirizzo email esiste già nel database e non appartiene all'utente stesso
    const existingUser = await User.findOne({ where: { email, id: { $ne: id } } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    await user.update({ firstName, lastName, email });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating the user' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the user' });
  }
};