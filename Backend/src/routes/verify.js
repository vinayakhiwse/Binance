const express = require("express");
const getVerify = require("../controller/verifyController");
const isAuth = require("../middleware/isAuth");
const isVerified = require("../middleware/isVerified");
const router = express.Router();

router.post("/trader/verify", isAuth, isVerified, getVerify);

module.exports = router;
