import express from 'express';
import { router as userRouter } from '../modules/users/user.route.js';
import { router as repairRouter } from '../modules/repairs/repair.route.js';

export const router = express.Router();

// User routes
router.use('/users', userRouter);

// Repair routes
router.use('/repairs', repairRouter);