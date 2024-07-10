const User = require("../models/users");
const ErrorHandler = require("../utils/errorHandler");
const saveToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const registerUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "ecommerceAvatar",
      width: 150,
      crop: "scale",
    });
    console.log(myCloud);
    const user = await User({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const savedUser = await user.save();

    saveToken(savedUser, 200, res);
  } catch (error) {
    next(new ErrorHandler(error.message, 401));
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar !== "") {
      console.log(req.user);
      const user = await User.findById(req.user._id);
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "ecommerceAvatar",
        width: 150,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(res.body);
    if (!email) return next(new ErrorHandler("Please enter your email", 400));
    if (!password)
      return next(new ErrorHandler("Please enter your password", 400));
    // here we are giving .select("+password") because by default the mongodb server will not send the password if we dont do this we will get error  .
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    const isMatching = await user.comparePassword(password);

    if (!isMatching)
      return next(new ErrorHandler("Invalid email or password", 400));

    saveToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

const logOut = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      // httpOnly signifies that user cannot change the jwt token only the website backend can edit the the token
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return res.status(200).json({
      success: true,
      message: "log out successfully",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ success: true, user });
};
const updatePassword = async (req, res, next) => {
  try {
    // since in the user schema we hAVE signifed that do not give the user password filed while we we doing any type of mogodb querrry so here we are explicitally definig that we want the password field too
    const user = await User.findById(req.user._id).select("+password");
    console.log(req.body);
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatch)
      return next(new ErrorHandler("Old password is incorrect", 400));

    if (req.body.confirmPassword !== req.body.newPassword)
      return next(new ErrorHandler("Invalid confirm password", 400));

    user.password = req.body.newPassword;
    await user.save();
    saveToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) return next(new ErrorHandler("no user registereed ", 400));
    return res.status(200).json(users);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
const getUserInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) return next(new ErrorHandler("user doesnt exist ", 401));
    res.status(200).json({
      success: "true",
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
const udpateUserRole = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUser,
  getUserInfo,
  deleteUser,
  udpateUserRole,
};
