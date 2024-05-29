const VerifyModel = require("../models/verifySchema");
const TraderModel = require("../models/traderSchema");

const getVerify = async (req, res) => {
  const { fullName, DOB, address, city, panNumber, aadharNumber, country } =
    req.body;
  try {
    const existVerified = await VerifyModel.findOne({
      $or: [{ panNumber: panNumber }, { aadharNumber: aadharNumber }],
    });
    if (existVerified) {
      return res
        .status(401)
        .json({ status: 401, msg: "This account is already Verified." });
    }
    await TraderModel.findOneAndUpdate(
      {
        _id: req.Trader.traderId,
      },
      { verify: true },
      { new: true }
    );

    const newVerify = new VerifyModel({
      fullName,
      DOB,
      address,
      city,
      panNumber,
      aadharNumber,
      country,
    });

    const VerifiedTrader = await newVerify.save();
    return res.status(200).json({
      status: 200,
      data: VerifiedTrader,
      msg: "Account Verification Done.",
    });
  } catch (error) {
    return res.status(401).json({ status: 401, msg: error });
  }
};

module.exports = getVerify;
