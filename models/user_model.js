const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name required"] },
    password: { type: String, required: [true, "password required"] },
    avatar: { type: String },
    dob: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
    description: { type: String },
    resetPasswordCode: { type: String },
    expiresIn: { type: Date },
    passwordResetVerified: { type: Boolean },
    gender: { type: String, required: [true, "gender required"] },
    mobile: {
      type: String,
      unique: [true, "mobile must be unique"],
      minlength: 11,
    },
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
    userType: { type: String, default: "user" },
  },
  { timestamps: true }
);

function setImagesUrl(doc) {
  if (doc.avatar) {
    const avatarUrl = `${process.env.BASE_URL}/user/${doc.avatar}`;
    doc.avatar = avatarUrl;
  }
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(`${this.password}`, 10);
  next();
});
userSchema.post("save", (doc) => {
  setImagesUrl(doc);
});

userSchema.post("init", (doc) => {
  setImagesUrl(doc);
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
