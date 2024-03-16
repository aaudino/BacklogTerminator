const express = require("express");

const {
  signUp,
  login,
  provideDemoData,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signUp", signUp);

userRouter.post("/login", login);

userRouter.post("/getDemoAccess", provideDemoData, login);

module.exports = userRouter;
