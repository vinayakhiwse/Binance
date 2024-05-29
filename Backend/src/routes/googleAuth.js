const express = require("express");
const passport = require("passport");
const {
  GoogleLogin,
  GoogleLoginFailed,
  GoogleLogOut,
} = require("../controller/googleController");
const router = express.Router();

router.get("/login/success", GoogleLogin);
router.get("/login/failed", GoogleLoginFailed);
router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_REDIRECT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/logout", GoogleLogOut);
module.exports = router;
