const express = require("express");
const {
  TraderSignUp,
  TraderLogin,
  ResetPassword,
} = require("../controller/traderController");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/signup", TraderSignUp);
router.post("/login", TraderLogin);
router.post("/login/password/reset", ResetPassword);

module.exports = router;
