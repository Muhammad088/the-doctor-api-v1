const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validatorErrorsExplorer = require("./validator_errors_catcher");
const UserModel = require("../models/user_model");
const ApiError = require("../utils/api_error");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorErrorsExplorer,
];
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorErrorsExplorer,
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorErrorsExplorer,
];

exports.updateUserPasswordValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  check("currentPassword")
    .notEmpty()
    .withMessage("currentPassword field is required")
    .custom(async (val, { req }) => {
      console.log(req.body.currentPassword);
      console.log(req.body.newPassword);
      const user = await UserModel.findOne({ _id: req.params.id });
      if (!user) return Promise.reject(new ApiError("User not found", 404));
      const isMatch = await bcrypt.compare(val, user.password);
      if (!isMatch)
        return Promise.reject(new ApiError("Invalid current password", 400));
      return true;
    }),

  validatorErrorsExplorer,
];

exports.createUserValidator = [
  check("name").notEmpty().withMessage("name field is required"),
  check("dob")
    .notEmpty()
    .withMessage("dob field is required")
    .isLength({ min: 10 })
    .withMessage("wrong dob"),
  check("gender").notEmpty().withMessage("gender field is required"),
  check("mobile")
    .notEmpty()
    .withMessage("mobile field is required")
    .isLength({ min: 11 })
    .withMessage("wrong dob"),
  validatorErrorsExplorer,
];
