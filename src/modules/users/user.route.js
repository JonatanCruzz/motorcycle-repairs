import express from 'express';
import { register, login, findAllUsers, findOneUser, updateUser, removeUser } from './user.controller.js';
import { protect, protectAccountOwner, validateExistUser } from './user.middleware.js';

export const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.use(protect);

router.get('/', findAllUsers);
router
  .route('/:id')
  .get(validateExistUser, findOneUser)
  
  .patch(validateExistUser, protectAccountOwner, updateUser)
  
  .delete(validateExistUser, protectAccountOwner, removeUser);
  
