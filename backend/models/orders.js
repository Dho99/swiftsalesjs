const mongoose = require("mongoose");

// Declaring Child Model
const customerSchema = new mongoose.Schema({
  customerId: {
    type: "UUID",
    required: true,
    default: () => randomUUID(),
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("order", {
  orderId: {
    type: "UUID",
    required: true,
    default: () => randomUUID(),
  },
  products: [productSchema],
  qty: {
    type: Array,
    required: true,
  },
  totalPrices: {
    type: Number,
    required: true,
  },
  // status : {
  // 0 : Waiting,
  // 1: Sending,
  // 3: Success
  // }
  status: {
    type: Number,
    required: true,
  },
  customers: customerSchema,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = Order;
