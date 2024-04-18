const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../schemas/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.clearCookie("jwt");
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = { protect };
