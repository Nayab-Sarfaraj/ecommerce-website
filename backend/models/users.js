const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    minLenght: [3, "Name sholu have at least 3 characters"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    // the validator validates the email
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [2, "assword shuld have at least  characters"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  } catch (error) {
    console.log("error", error);
    next(new ErrorHandler());
  }
});
// defining the method that geneates the jwt token we just have to call it by the object creacted by the instance of the User model
// this function has to be normal function instead of normal function as we are going to use this key word here
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// this function has to be normal function instead of normal function as we are going to use this key word here
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Compare the entered password with the hashed password
  console.log(enteredPassword);
  const isMatching = await bcrypt.compare(enteredPassword, this.password);

  return isMatching;
};

// degining the User model
const User = mongoose.model("user", userSchema);

module.exports = User;
