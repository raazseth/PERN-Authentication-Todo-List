const JWT = require("jsonwebtoken");

exports.requireSignIn = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const user = JWT.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Oopps!! Authorization Required" });
  }
  next();
};
