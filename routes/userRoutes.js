const express = require("express");
const { signup, login, logout } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);

module.exports = userRouter;
