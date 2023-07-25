
import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

// Routes for users
router.get('/users', userController.getAllUsers); // Get all users
router.get('/users/:id', userController.getUserById); // Get a user by their ID
router.post('/adduser', userController.addUser); // Add a new user
router.put('/users/:id', userController.updateUser); // Update a user
router.delete('/users/:id', userController.deleteUser); // Delete a user

export default router;
