const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name required"] },
    image: [String],
    dob: { type: String }, // required
    gender: { type: String, required: [true, "gender required"] }, // required
    mobile: {
      type: String,
      unique: [true, "mobile must be unique"],
      minlength: 11,
    }, // required
    height: {
      type: Number,
      max: 250,
      min: 70,
      populate: 0,
      // minlength: 3,
    },
    weight: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      populate: 0,
      max: 300,
      min: 0,
    },
    user_type: { type: String, required: [true, "user_type required"] }, // required
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
