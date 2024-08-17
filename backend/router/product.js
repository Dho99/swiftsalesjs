const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const { refreshToken } = require("../utils/jwtHelper");

// storage util
const { upload, deleteImage } = require("../utils/storage");

productRouter.get("/all", async (req, res) => {
  let products;
  try {
    const newToken = await new Promise((resolve, reject) => {
      refreshToken(req.header("Authorization"), (token, err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(token);
        }
      });
    });
    products = await Product.find({});
    res.json({
      success: true,
      data: products,
      token: newToken,
      message: "Token refresh success",
    });
  } catch (err) {
    res.json({
      success: false,
      data: null,
      token: null,
      message: "Token refresh failed, reason : " + err.message,
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  let productData;
  try {
    productData = await Product.find({ _id: req.params.id });
    res.json({
      success: true,
      data: productData,
    });
  } catch (err) {
    res.json({
      success: false,
      data: "An error occured, reason : " + err.message,
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  let updateProduct;
  try {
    updateProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );
    res.json({
      success: true,
      message: "Product Edited Successfuly",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "An error occured, reason : " + err.message,
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  let findProduct;
  let imageUrlPath;
  let replaceUrlPath;
  try {
    findProduct = await Product.findOneAndDelete({ id: req.params.id });
    imageUrlPath = findProduct.image;
    replaceUrlPath = imageUrlPath.replace(
      "http://localhost:4000/",
      "./upload/"
    );
    deleteImage(replaceUrlPath, (resp) => {
      if (resp.success) {
        res.json({
          success: true,
          message: "Product deleted Successfully",
        });
      } else {
        res.json({
          success: false,
          message: resp.message,
        });
      }
    });
  } catch (err) {
    res.json({
      success: false,
      message: "An error occured, reason : " + err.message,
    });
  }
});

productRouter.post("/create", async (req, res) => {
  let products = await Product.find({});
  let id;
  let productName;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    stock: req.body.stock,
  });
  try {
    await product.save();
    res.json({
      success: true,
      name: req.body.name,
    });
    console.log(product);
  } catch (err) {
    res.json({
      success: false,
      err: err,
      message: err.message,
    });
  }
});

// Upload image endpoint
productRouter.post("/upload/image", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.BACKEND_PORT}/images/${req.file.filename}`,
    image_filename: req.file.originalname,
  });
});

module.exports = productRouter;
