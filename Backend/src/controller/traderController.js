const TraderModel = require("../models/traderSchema");
const EmailModel = require("../models/emailSchema");
const bcrypt = require("bcrypt");
const sendOtpMail = require("../mail/sendOtpmail");
const Token = require("../utils/token");
const generateOtp = require("../utils/generateOtp");
const cookie = require("cookie");

const TraderSignUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const traderExist = await TraderModel.findOne({
      $and: [{ email: email }, { isGoogleAccount: false }],
    });
    if (traderExist) {
      return res
        .status(401)
        .json({ status: 401, msg: "This account is already in use." });
    }
    const HashPassword = await bcrypt.hash(password, 10);
    const newTrader = new TraderModel({
      email: email,
      password: HashPassword,
    });

    // let transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: process.env.EMAIL_ADDRESS, // your Gmail address
    //     pass: process.env.EMAIL_PASS, // your Gmail password
    //   },
    // });
    // let mailOptions = {
    //   from: process.env.EMAIL_ADDRESS,
    //   to: email,
    //   subject: "User Created",
    //   text: `Hey there, your account has been created`,
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    const savedTrader = await newTrader.save();
    // here we passing the data for token generation..
    const Newtoken = Token({
      trader_id: savedTrader._id,
      email: savedTrader.email,
    });

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
      data: savedTrader,
      token: Newtoken,
      msg: "SignUp succesfully.",
    });
  } catch (error) {
    return res.status(401).json({ status: 401, msg: "Something Went Wrongs." });
  }
};

const TraderLogin = async (req, res) => {
  const { email, password } = req.body;
  const isChecked = await TraderModel.findOne({
    $and: [{ email: email }, { isGoogleAccount: false }],
  });
  try {
    if (!isChecked) {
      return res.status(401).json({ status: 401, msg: "Account not Found." });
    }
    const Validpassword = await bcrypt.compare(password, isChecked.password);
    if (!Validpassword) {
      return res
        .status(404)
        .json({ status: 404, msg: "Invalid Password Wrong." });
    }
    const Otp = generateOtp();
    // sendOtpMail({ email, Otp });
    console.log("login", Otp);
    //here creating token with email and password;

    // Set the expiration time for the OTP record (e.g., 5 minutes)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
    const EmailData = new EmailModel({
      email: email,
      otp: Otp,
      expiresAt: expirationTime,
    });
    await EmailData.save();
    return res.status(200).json({
      status: 200,
      otp: Otp,
      msg: "Binance Security Verification code send on your email.",
    });
  } catch (error) {
    return res.status(401).json({ status: 401, msg: error });
  }
};

const ResetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const traderExist = await TraderModel.findOne({ email });

    if (!traderExist) {
      return res.status(404).json({ status: 404, msg: "Trader not found." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const Newtoken = Token({
      trader_id: traderExist._id,
      email: traderExist.email,
    });

    await TraderModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      token: Newtoken,
      data: traderExist,
      msg: "Password reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "Internal Server Error." });
  }
};

module.exports = { TraderSignUp, TraderLogin, ResetPassword };
