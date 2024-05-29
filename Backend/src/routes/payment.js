const express = require("express");
const isAuth = require("../middleware/isAuth");
const {
  getPaymentDetail,
  getWithdrawAmount,
  getWithdrawDetail,
  getTransactionDetails,
} = require("../controller/paymentController");
const router = express.Router();

router.get("/payment/details", isAuth, getPaymentDetail);
router.post("/payment/withdraw", isAuth, getWithdrawAmount);
router.get("/payment/withdraw/history", isAuth, getWithdrawDetail);
router.get("/payment/details/:id", isAuth, getTransactionDetails);

module.exports = router;
