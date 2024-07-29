const express = require("express");
const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    data: users,
  });
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
