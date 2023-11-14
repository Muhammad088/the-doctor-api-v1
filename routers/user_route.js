const { Router } = require("express");
const { getUsers, createUser } = require("../services/user_services");
const userRouter = Router();
userRouter.route("/").get(getUsers).post(createUser);

module.exports = userRouter;
