const express = require("express");
const dashboardRouter = require("../router/dashboard.js");
const ordersRouter = require("../router/orders.js");
const productRouter = require("../router/product.js");
const userRouter = require("../router/user.js");
const {verifyToken} = require('../utils/jwtHelper.js');
const cors = require("cors");

const authenticatedRouter = express.Router();

// Middleware for authenticated user
authenticatedRouter.use(verifyToken);
// Use external router

authenticatedRouter.use(dashboardRouter);
authenticatedRouter.use("/order", ordersRouter);
authenticatedRouter.use("/product", productRouter);
authenticatedRouter.use(userRouter);

// Static
authenticatedRouter.use("/images", express.static("upload/images"));

module.exports = authenticatedRouter;
