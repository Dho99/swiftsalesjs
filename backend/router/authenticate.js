const express = require("express");
const authRouter = express.Router();
const { generateToken, verifyToken, storeTokenToDB } = require("../utils/jwtHelper");
const User = require('../models/user');
const bcrypt = require('bcrypt');

const session = require('express-session');
const store = new session.MemoryStore();

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
          // }
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

authRouter.get('/logout', (req, res) => {
  // req.session.destroy((err) => {
  //   if(err){
  //     res.json({
  //       success: false,
  //       message: 'an error occured '+err.message
  //     });
  //   }else{
      res.json({
        success: true,
        message: 'End session success'
      });
  //   }
  // })
});

module.exports = authRouter;