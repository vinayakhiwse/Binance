const jwt = require("jsonwebtoken");

const tokenData = ({ trader_id, email }) => {
  const token = jwt.sign(
    {
      traderId: trader_id,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1day",
    }
  );
  return token;
};

module.exports = tokenData;
