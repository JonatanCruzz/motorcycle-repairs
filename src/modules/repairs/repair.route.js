import express from 'express';
import { protect, restrictTo } from '../users/user.middleware.js';
import { createRepair, findAllRepairs, findOneRepair, removeRepair, updateRepair } from './repair.controller.js';
import { validateRepairExist } from './repair.middleware.js';

export const router = express.Router();

const restrictToEmployee = restrictTo('employee');

router.post('/', createRepair);

router.use(protect);

router.get('/', restrictToEmployee, findAllRepairs);
router
    .route('/:id')
    .get(restrictToEmployee, validateRepairExist, findOneRepair)
    .patch(restrictToEmployee, validateRepairExist, updateRepair)
    .delete(restrictToEmployee, validateRepairExist, removeRepair);