const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name required"] },
    image: { type: String },
    dob: { type: String, required: [true, "dob required"], minlength: 10 }, // required
    gender: { type: String, required: [true, "gender required"] }, // required
    mobile: {
      type: String,
      unique: [true, "mobile must be unique"],
      minlength: 11,
    }, // required
    user_type: { type: String, required: [true, "user_type required"] }, // required
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
