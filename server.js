const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const userRouter = require("./routers/user_route");
const ApiError = require("./utils/api_error");
const errorHandling = require("./utils/error_handling");
dotenv.config({ path: "config.env" });

// connect with db
dbConnection();

// express app
const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //request logger middleware
}
console.log(`mode: ${process.env.NODE_ENV}`);

// routing
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`server cannot find this route ${req.originalUrl}`, 400));
});

// global error middleware comes from express (asyncHandler)
app.use(errorHandling);

// server running
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});

// handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection error :>> ", err);
  server.close(() => {
    console.error("app shut down ====");
    process.exit(1);
  });
});
