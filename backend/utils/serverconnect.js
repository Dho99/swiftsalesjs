const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGODB_URL);

module.exports = db;
