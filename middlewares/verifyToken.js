const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const user = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        error: "You are not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).send({
        success: false,
        error: "Invalid token",
      });
  }
};
