const sharp = require("sharp");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user_model");
const factory = require("./handlers_factory");
const { uploadSingleImage } = require("../utils/upload_images");
const ApiError = require("../utils/api_error");
const { sendWhatsappMessage } = require("./send_whatsapp");

/**
 * @description   register new user
 * @route         POST  /api/v1/auth/signup
 * @access        Public
 */
exports.registerNewUser = expressAsyncHandler(async (req, res, next) => {
  // create user
  const user = await UserModel.create({
    name: req.body.name,
    gender: req.body.gender,
    mobile: req.body.mobile,
    password: req.body.password,
    userType: "user",
  });
  // generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  if (!user) return next(new ApiError("No user for this id", 404));
  res.status(200).json({ data: user, token });
});

/**
 * @description   login user
 * @route         POST  /api/v1/auth/login
 * @access        Public
 */
exports.loginUser = expressAsyncHandler(async (req, res, next) => {
  // check if user exists
  const user = await UserModel.findOne({
    mobile: req.body.mobile,
  });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new ApiError("Wrong mobile or password", 401));

  // generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  res.status(200).json({ data: user, token });
});

exports.isUserAuthenticated = expressAsyncHandler(async (req, res, next) => {
  // check if req has token
  let token = req.headers.authorization;
  if (!token) return next(new ApiError("user not logged in", 401));
  token = req.headers.authorization.split(" ")[1];
  // verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return next(new ApiError("invalid token", 401));
    const user = await UserModel.findById(decoded.userId);
    if (!user) return next(new ApiError("user not found", 404));
    req.user = user;
    req.body.mainDoctor = await decoded.userId;
    console.log(await decoded.userId);
    next();
  });
});
exports.isAuthorized = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    // access the roles
    if (!roles.includes(req.user.userType))
      return next(
        new ApiError("unauthorized user: doctors only can create clinics", 401)
      );
    console.log(req.user);
    req.mainDoctor = req.user._id;

    next();
  });
exports.forgotPassword = expressAsyncHandler(async (req, res, next) => {
  // check if user exists
  const user = await UserModel.findOne({
    mobile: req.body.mobile,
  });
  if (!user) return next(new ApiError("user not found", 404));
  // send random 6 digits to mobile phone
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const message = `Your reset password code is ${randomNumber}`;
  // send message
  const result = await UserModel.findOneAndUpdate(
    {
      mobile: req.body.mobile,
    },
    {
      resetPasswordCode: randomNumber,
      expiresIn: Date.now() + 600000, // 10 minutes
      passwordResetVerified: false,
    }
  );
  if (!result) return next(new ApiError("something went wrong", 500));
  // res.status(200).json({ message });
  sendWhatsappMessage();
  // next();
});
