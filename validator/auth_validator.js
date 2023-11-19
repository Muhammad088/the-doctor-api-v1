const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validatorErrorsExplorer = require("./validator_errors_catcher");
const UserModel = require("../models/user_model");
const ApiError = require("../utils/api_error");

exports.registerUserValidator = [
  check("name").notEmpty().withMessage("name field is required"),
  check("gender").notEmpty().withMessage("gender field is required"),
  check("mobile")
    .notEmpty()
    .withMessage("mobile field is required")
    .isLength({ min: 11 })
    .withMessage("wrong mobile"),
  validatorErrorsExplorer,
];

exports.loginUserValidator = [
  check("mobile")
    .notEmpty()
    .withMessage("mobile field is required")
    .isLength({ min: 11 })
    .withMessage("wrong mobile"),
  validatorErrorsExplorer,
];
