const { Router } = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadUserAvatar,
  resizeImage,
  updateUserPassword,
} = require("../services/user_services");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateUserPasswordValidator,
} = require("../validator/user_validator");

const userRouter = Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(uploadUserAvatar, resizeImage, createUserValidator, createUser);
userRouter
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserAvatar, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
userRouter
  .route("/updatepass/:id")
  .put(updateUserPasswordValidator, updateUserPassword);

module.exports = userRouter;
