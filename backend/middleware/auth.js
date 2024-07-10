const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/users");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) next(new ErrorHandler("You are not authorized ", 401));
    // fetching the user info hidden inside the jwt token
    const decodedData = jwt.verify(token, process.env.SECRET_KET);
    // fetching the user info and styoring it so that it can be accessed later for authentication password checking etyc
    req.user = await User.findById(decodedData._id);

    next();   
  } catch (error) {
    next(new ErrorHandler(error.message, 401));
  }
};

const authenticateRole = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(
          `Role ${req.user.role} is not authorized to access this resource `,
          401
        )
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  authenticateRole,
};
