const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const compression = require("compression");
const dbConnection = require("./config/database");
const userRouter = require("./routers/user_route");
const ApiError = require("./utils/api_error");
const errorHandling = require("./utils/error_handling");
const clinicRouter = require("./routers/clinic_route");
const UserModel = require("./models/user_model");
const authRouter = require("./routers/auth_route");

dotenv.config({ path: "config.env" });

// connect with db
dbConnection();

// express app
const app = express();
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //request logger middleware
}
console.log(`mode: ${process.env.NODE_ENV}`);

// routing
// app.get("/", async () => {
//   const documents = await UserModel.find();
//   documents.map(async (value, index) => {
//     // if (value.password === "123456") {
//     // }
//     value.password = await bcrypt.hash("123456", 12);
//     console.log(`item number${index + 1} password : ${value.password}`);
//     return true;
//   });
// });
app.use("/api/v1/users", userRouter);
app.use("/api/v1/clinics", clinicRouter);
app.use("/api/v1/auth", authRouter);

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
