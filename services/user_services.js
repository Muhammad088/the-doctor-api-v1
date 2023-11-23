const sharp = require("sharp");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user_model");
const factory = require("./handlers_factory");
const { uploadSingleImage } = require("../utils/upload_images");
const ApiError = require("../utils/api_error");

/**
 * @description   upload user avatar via multer
 */
exports.uploadUserAvatar = uploadSingleImage("avatar");

exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  // console.log(req.file);
  const userId = req.params.id;
  console.log(req.params);
  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat("jpeg", { mozjpeg: true })
    .toFile(`${userId}.jpeg`);
  req.body.avatar = `${userId}.jpeg`; // save avatar file into db
  next();
});

/**
 * @description   get list of users
 * @route         GET  /api/v1/users
 * @access        Private
 */
exports.getUsers = factory.getDocuments(UserModel);

/**
 * @description   get a specific user
 * @route         GET  /api/v1/users/:id
 * @access        Public
 */
exports.getUser = factory.getSpecificDocument(UserModel);

/**
 * @description   create user
 * @route         POST  /api/v1/users
 * @access        Public
 */
exports.createUser = factory.createDocument(UserModel);

/**
 * @description   update a specific user
 * @route         PUT  /api/v1/users/:id
 * @access        Private
 */
exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const doc = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      gender: req.body.gender,
      avatar: req.body.avatar,
      dob: req.body.dob,
      lat: req.body.lat,
      lng: req.body.lng,
      address: req.body.address,
      description: req.body.description,
      mobile: req.body.mobile,
      height: req.body.height,
      weight: req.body.weight,
      userType: req.body.userType,
    },
    {
      new: true,
    }
  );
  if (!doc) return next(new ApiError("No doc for this id", 404));
  res.status(200).json({ data: doc });
});

exports.updateUserPassword = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const doc = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.newPassword, 12),
    },
    {
      new: true,
    }
  );
  if (!doc) return next(new ApiError("No doc for this id", 404));
  res.status(200).json({ data: doc });
});

/**
 * @description   delete a specific user
 * @route         DELETE  /api/v1/users/:id
 * @access        Private
 */
exports.deleteUser = factory.deleteDocument(UserModel);
