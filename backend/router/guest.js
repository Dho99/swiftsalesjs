const express = require("express");
const guestRouter = express.Router();
const Product = require("../models/product");

guestRouter.get("/product/all", async (req, res) => {
  let products;
  try {
    products = await Product.find({});
    res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    res.json({
      success: false,
      data: null,
    });
  }
});

module.exports = guestRouter;
