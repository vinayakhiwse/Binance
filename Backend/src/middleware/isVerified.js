require("dotenv").config();
const jwt = require("jsonwebtoken");
const TraderModel = require("../models/traderSchema");

const isVerified = async (req, res, next) => {
  const Authtoken = req.header("Authorization");

  if (!Authtoken || !Authtoken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access denied. No valid token provided." });
  }
  const token = Authtoken.split(" ")[1];
  try {
    const Token = jwt.verify(token, process.env.JWT_SECRET);
    const existTrader = await TraderModel.findOne({ _id: Token.traderId });
    if (!existTrader.verify) {
      return res
        .status(401)
        .json({ status: 401, error: "Please Verify Your Account." });
    }
    next();
  } catch (error) {
    console.log("error in middleware", error);
    return res.status(401).json({ error: "Invalid token credential." });
  }
};

module.exports = isVerified;
