const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validatorErrorsExplorer = require("./validator_errors_catcher");
const UserModel = require("../models/user_model");
const ApiError = require("../utils/api_error");

exports.registerUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("email field is required")
    .not()
    .isEmail()
    .withMessage("invalid email"),
  validatorErrorsExplorer,
];

exports.loginUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("email field is required")
    .not()
    .isEmail()
    .withMessage("invalid email"),
  validatorErrorsExplorer,
];
