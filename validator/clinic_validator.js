const { check } = require("express-validator");
const validatorErrorsExplorer = require("./validator_errors_catcher");

exports.getClinicValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorErrorsExplorer,
];
exports.updateClinicValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorErrorsExplorer,
];
exports.deleteClinicValidator = [
  check("id").isMongoId().withMessage("invalid user id"),
  validatorErrorsExplorer,
];

exports.createClinicValidator = [
  check("mainDoctor").isMongoId().withMessage("invalid user id"),
  check("name").notEmpty().withMessage("name field is required"),
  // check("lat").notEmpty().withMessage("lat field is required"),
  // check("lng").notEmpty().withMessage("lng field is required"),
  // check("address").notEmpty().withMessage("address field is required"),
  check("specialty").notEmpty().withMessage("specialty field is required"),
  // check("mobile")
  //   .notEmpty()
  //   .withMessage("mobile field is required")
  //   .isLength({ min: 11 })
  //   .withMessage("wrong mobile"),
  validatorErrorsExplorer,
];
