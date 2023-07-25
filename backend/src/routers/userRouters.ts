// router/user.router.ts
import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/adduser', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);



export default router;
