const express = require("express");
const dashboardRouter = express.Router();
const Order = require("../models/orders.js");
const { refreshToken } = require("../utils/jwtHelper.js");

dashboardRouter.get("/dashboard", async (req, res) => {
  try {
    const startDay = new Date().setHours(0, 0, 0, 0);
    const endDay = new Date().setHours(23, 59, 59, 999);
    const orders = await Order.find({
      createdAt: { $gte: startDay, $lt: endDay },
    });
    const waitingProcess = await Order.find({ status: 0 });
    res.json({
      success: true,
      data: {
        jumlahPesanan: 0,
        menungguProses: 0,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      data: {
        jumlahPesanan: 0,
        menungguProses: 0,
      },
      message: err.message
    });
  }
});

module.exports = dashboardRouter;
