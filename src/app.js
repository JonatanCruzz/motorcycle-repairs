const express = require('express');
const motorCycleRepair = require('./motorcycle-repair/motorcycle-repair.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', motorCycleRepair)

module.exports = app;