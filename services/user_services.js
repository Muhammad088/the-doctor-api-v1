const UserModel = require("../models/user_model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/api_error");

/**
 * @description   get list of users
 * @route         GET  /api/v1/users
 * @access        Private
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 3;
  const skip = (page - 1) * limit;
  const users = await UserModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: users.length, page, data: users });
});

/**
 * @description   get a specific user
 * @route         GET  /api/v1/users/:id
 * @access        Public
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) return next(new ApiError("No user for this id", 404));
  res.status(200).json({ data: user });
});

/**
 * @description   create user
 * @route         POST  /api/v1/users
 * @access        Public
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, dob, gender, mobile, user_type, images, height, weight } =
    req.body;

  const user = await UserModel.create({
    name,
    images,
    dob,
    gender,
    mobile,
    height,
    weight,
    user_type,
  });
  res.status(201).json({ data: user });
});

/**
 * @description   update a specific user
 * @route         PUT  /api/v1/users/:id
 * @access        Private
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, user_type, images, height, weight } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { name, user_type, images, height, weight },
    { new: true }
  );
  if (!user) return next(new ApiError("No user for this id", 404));
  res.status(200).json({ data: user });
});

/**
 * @description   delete a specific user
 * @route         DELETE  /api/v1/users/:id
 * @access        Private
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) return next(new ApiError("No user for this id", 404));
  res.status(200).json({ msg: "deleted successfully" });
});
