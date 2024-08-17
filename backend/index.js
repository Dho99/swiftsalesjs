require('dotenv').config();
const port = process.env.BACKEND_PORT
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/serverconnect.js");
const session = require('express-session');
const bodyParser = require('body-parser');
// const rto = require('connect-timeout');

// Import Authenticated Route
const authenticatedRouter = require('./middleware/authenticated.js');
const authRouter = require("./router/authenticate.js");
const guestRouter = require('./router/guest.js');
const { verifyToken,refreshToken } = require('./utils/jwtHelper.js');

// Using parser and Cors
app.use(express.json());
app.use(cors());
// app.use(rto('10s'));

app.use((req, res, next) => {
  res.setTimeout(2000, ()=>{
      res.sendStatus(408);
  })
  next();
});

app.use('/token/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token validated'
  })
});

app.get('/token/refresh', async(req, res) => {
  try{
    const newClientToken = await new Promise((resolve, reject) => {
      refreshToken(req.header("Authorization"), (newToken, err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(newToken);
        }
      });
    })
    res.json({
      success: true,
      data: newClientToken
    });
  }catch(err){
    res.json({
      success: false,
      type: err,
      message: err.message
    })
  }
})

app.use('/guest',guestRouter)
app.use(authRouter);
app.use(authenticatedRouter);


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});


app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});