const express = require("express");
const {
  EmailSending,
  EmailVerify,
  LoginEmail,
  LoginPassword,
} = require("../controller/otpController");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/otp", EmailSending);
router.post("/verify", EmailVerify);
router.post("/login/email", LoginEmail);
router.post("/login/otp", LoginPassword);

module.exports = router;
