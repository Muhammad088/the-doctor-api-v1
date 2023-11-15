const { check } = require("express-validator");
const validatorErrorsExplorer = require("./validator_errors_catcher");

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
