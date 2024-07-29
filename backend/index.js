require('dotenv').config();
const port = process.env.BACKEND_PORT
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/serverconnect.js");
const session = require('express-session');

// Router Import
const dashboardRouter = require('./router/dashboard.js');
const ordersRouter = require('./router/orders.js');
const productRouter = require('./router/product.js');
const userRouter = require('./router/user.js');
const authRouter = require('./router/authenticate.js');

// Using parser and Cors
app.use(express.json());
app.use(cors());

// Creating Middleware Using Express Session
app.use(session({
  secret: process.env.EXPRESS_SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))



// Use external router
app.use(dashboardRouter);
app.use('/order', ordersRouter);
app.use('/product', productRouter);
app.use(userRouter);
app.use(authRouter);



// Static
app.use("/images", express.static("upload/images"));
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});
