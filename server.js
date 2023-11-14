const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const userRouter = require("./routers/user_route");
dotenv.config({ path: "config.env" });

// connect with db
dbConnection();

// express app
const app = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// route
app.use("/api/v1/", userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
