// this function generates the token and saves it into the cookie with name token
const saveToken = function (user, status, res) {
   
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const token = user.generateToken();
  res.cookie("token", token, options);

  return res.status(201).json({
    success: true,
    user,
    token,
  });
};

module.exports = saveToken;
