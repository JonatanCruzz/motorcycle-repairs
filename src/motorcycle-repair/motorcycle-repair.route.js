const express = require('express');

const { createUser, findAllUsers, findOneUser, updateUser, removeUser } = require('./controllers/user.controller');
const { createRepair, findAllRepairs, findOneRepair, updateRepair, removeRepair } = require('./controllers/repair.controller');

const router = express.Router();

// User routes
router.post('/users', createUser);
router.get('/users', findAllUsers);
router.get('/users/:id', findOneUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', removeUser);

// Repair routes
router.post('/repairs', createRepair);
router.get('/repairs', findAllRepairs);
router.get('/repairs/:id', findOneRepair);
router.patch('/repairs/:id', updateRepair);
router.delete('/repairs/:id', removeRepair);

module.exports = router;