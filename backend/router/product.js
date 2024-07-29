const express = require("express");
const productRouter = express.Router();
const Product = require('../models/product');

// storage util
const { upload, deleteImage } = require("../utils/storage");


productRouter.get("/all", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


productRouter.get("/:id", async (req, res) => {
  let productData = await Product.find({ _id: req.params.id });
  res.json({
    success: true,
    data: productData,
  });
});

productRouter.put("/:id", async (req, res) => {
  let updateProduct = await Product.findOneAndUpdate(
    { id: req.params.id },
    req.body
  );
  res.json({
    success: true,
    message: "Product Edited Successfuly",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const findProduct = await Product.findOneAndDelete({ id: req.params.id });
  const imageUrlPath = findProduct.image;
  const replaceUrlPath = imageUrlPath.replace(
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
