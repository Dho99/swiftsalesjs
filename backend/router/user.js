const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/users", async (req, res) => {
  let users;
  try {
    users = await User.find({});
    res.json({
      success: true,
      data: users,
      message: "Data fetched successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      data: null,
      message: "An error occured, reason : " + err.message,
    });
  }
});

userRouter.post("/user", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  try {
    await newUser.save();
    res.json({
      success: true,
      message: "User Data stored successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

module.exports = userRouter;
