const sendOtpMail = require("../mail/sendOtpmail");
const EmailModel = require("../models/emailSchema");
const generateOtp = require("../utils/generateOtp");
const TraderModel = require("../models/traderSchema");
const Token = require("../utils/token");
const cookie = require("cookie");

const EmailSending = async (req, res) => {
  const { email } = req.body;
  try {
    const existTrader = await EmailModel.findOne({ email });
    const existUser = await TraderModel.findOne({ email });
    if (existTrader || existUser) {
      return res
        .status(401)
        .json({ status: 401, msg: "This account is already in use." });
    }

    const Otp = generateOtp();
    //sendOtpMail({ email, Otp });
    // Set the expiration time for the OTP record (e.g., 5 minutes)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
    console.log(Otp);
    const EmailData = new EmailModel({
      email: email,
      otp: Otp,
      expiresAt: expirationTime,
    });

    const NewData = await EmailData.save();
    return res.status(200).json({
      status: 200,
      data: NewData,
      msg: "OTP send succesfully on your email.",
    });
  } catch (error) {
    return res.status(401).json({ status: 401, msg: "Something Went Wrongs." });
  }
};

const EmailVerify = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existTrader = await EmailModel.findOne({ email });
    if (existTrader) {
      if (existTrader.otp === otp) {
        await EmailModel.findOneAndDelete({ email });
        return res.status(200).json({
          status: 200,
          msg: "Email Verification Done.",
        });
      } else {
        return res.status(401).json({
          status: 401,
          msg: "Invalid Otp.",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        msg: "Invalid Otp.",
      });
    }
  } catch (error) {
    return res.status(401).json({ status: 401, msg: "Something Went Wrongs." });
  }
};

const LoginEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const existTrader = await TraderModel.findOne({
      $and: [{ email: email }, { isGoogleAccount: false }],
    });
    if (existTrader) {
      return res.status(200).json({
        status: 200,
        msg: "Binance account found.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "Binance account not found.",
      });
    }
  } catch (error) {
    return res.status(401).json({ status: 401, msg: "Something Went Wrongs." });
  }
};

const LoginPassword = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existTrader = await EmailModel.findOne({ email });
    const traderExist = await TraderModel.findOne({ email });
    if (existTrader && traderExist) {
      if (existTrader.otp === otp) {
        const Newtoken = Token({
          trader_id: traderExist._id,
          email: traderExist.email,
        });
        const NewTrader = {
          id: traderExist._id,
          email: traderExist.email,
          verify: traderExist.verify,
        };
        await EmailModel.findOneAndDelete({ email });

        //here storing token into cookie.
        // res.setHeader(
        //   "Set-Cookie",
        //   cookie.serialize("token", Newtoken, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 24 * 7,
        //     sameSite: "strict",
        //   })
        // );
        return res.status(200).json({
          status: 200,
          data: NewTrader,
          token: Newtoken,
          msg: "Security Verification Done.",
        });
      } else {
        return res.status(401).json({
          status: 401,
          msg: "Invalid Otp.",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        msg: "Invalid Otp.",
      });
    }
  } catch (error) {
    return res.status(401).json({ status: 401, msg: "Something Went Wrongs." });
  }
};

module.exports = { EmailSending, EmailVerify, LoginEmail, LoginPassword };
