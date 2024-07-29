const express = require("express");
const authRouter = express.Router();
const { generateToken, verifyToken, storeTokenToDB } = require("../utils/jwtHelper");
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    bcrypt
      .compare(req.body.password, user.password)
      .then((passwordCheck) => {
        if (!passwordCheck) {
          res.json({
            success: false,
            message: "Email atau password salah !",
          });
        } else {
          const token = generateToken(user);
          res.json({
            success: true,
            message: "Login Success",
            token: token,
          });
          const storeToken = {
            email: user.email,
            token: token
          };
          storeTokenToDB(storeToken, (resp) => {
            console.log(resp);
          });
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err.message,
        });
      });
  } else {
    res.json({
      success: false,
      message: "User Not Found",
    });
  }
});

authRouter.post("/verifyToken", async (req, res) => {
  await verifyToken(req.body.ctoken, (cbk) => {
    res.json(cbk);
  });
});

module.exports = authRouter;
