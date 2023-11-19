const { Router } = require("express");
const {
  registerNewUser,
  loginUser,
  forgotPassword,
} = require("../services/auth_services");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../validator/auth_validator");

const authRouter = Router();

authRouter.route("/signup").post(registerUserValidator, registerNewUser);
authRouter.route("/login").post(loginUserValidator, loginUser);
authRouter.route("/resetpassword").post(forgotPassword);

module.exports = authRouter;
