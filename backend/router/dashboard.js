const express = require('express');
const dashboardRouter = express.Router();
const Order = require('../models/orders.js');


dashboardRouter.get('/dashboard', (req, res) => {
    const startDay = new Date().setHours(0,0,0,0);
    const endDay = new Date().setHours(23,59,59,999)
    const orders = Order.find({createdAt: {$gte: startDay, $lt: endDay}});
    const waitingProcess = Order.find({status: 0});
    res.json({
        success: true,
        data: {
            jumlahPesanan: (orders.length > 0 ? orders : 0),
            menungguProses: (waitingProcess.length > 0 ? waitingProcess : 0),
        }
    });
})

module.exports = dashboardRouter;