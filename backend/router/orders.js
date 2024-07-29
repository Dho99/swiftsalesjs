const express = require('express');
const ordersRouter = express.Router();
const Order = require('../models/orders');

ordersRouter.get('/all', async (req, res) => {
    res.json({
        success: true,
        data: await Order.find({})
    });
});

module.exports = ordersRouter;