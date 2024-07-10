const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
 console.log(err.message)
  err.status = err.status.status || 500;
  err.message = err.message || "internal server error";
 
 
  return res.json({
    success: false,
    message: err.message,
  });
};
