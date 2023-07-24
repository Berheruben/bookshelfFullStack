// router/user.router.ts
import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

// Ottieni tutti gli utenti
router.get('/users', userController.getAllUsers);

// Ottieni un utente per ID
router.get('/users/:id', userController.getUserById);

// Aggiungi un nuovo utente
router.post('/adduser', userController.addUser);

// Modifica un utente
router.put('/users/:id', userController.updateUser);

// Elimina un utente
router.delete('/users/:id', userController.deleteUser);


export default router;
