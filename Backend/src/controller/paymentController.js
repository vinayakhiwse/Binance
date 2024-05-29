require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const PaymentModel = require("../models/paymentSchema");
const HistoryModel = require("../models/historySchema");

const getAmount = async (req, res) => {
  try {
    const { Amount, currency } = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = {
      amount: Amount * 100, // amount in the smallest currency unit
      currency: currency,
    };

    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({ code: 500, message: "Server error." });
      }
      return res
        .status(200)
        .json({ code: 200, message: "Order created", data: order });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

const getVerify = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    payment_Amount,
    payment_Currency,
  } = req.body.response;
  const newPaymentHistory = new HistoryModel({
    payment_Id: razorpay_payment_id,
    payment_Amount,
    payment_Currency,
    payment_Order_Id: razorpay_order_id,
    trader_Id: req.Trader.traderId,
    transactionType: "deposit",
  });
  try {
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const isCheckTrader = await PaymentModel.findOne({
        $and: [
          { trader_Id: req.Trader.traderId },
          { payment_Currency: payment_Currency },
        ],
      });
      if (!isCheckTrader) {
        const newPaymentTrader = new PaymentModel({
          payment_Id: razorpay_payment_id,
          payment_Amount,
          payment_Currency,
          payment_Order_Id: razorpay_order_id,
          trader_Id: req.Trader.traderId,
        });
        await newPaymentTrader.save();
      } else {
        isCheckTrader.payment_Amount += payment_Amount;
        await isCheckTrader.save();
      }
      (newPaymentHistory.status = "Complete"), await newPaymentHistory.save();
      return res.status(200).json({ code: 200, message: "Signature is valid" });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "Signature is not valid" });
    }
  } catch (error) {
    (newPaymentHistory.status = "Incomplete"), await newPaymentHistory.save();
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

const getPaymentDetail = async (req, res) => {
  try {
    const existTraderDetail = await PaymentModel.find({
      trader_Id: req.Trader.traderId,
    });

    if (!existTraderDetail) {
      return res.status(500).json({ code: 500, msg: "Balance Empty." });
    }
    return res.status(200).json({ status: 200, data: existTraderDetail });
  } catch (error) {
    return res.status(500).json({ code: 500, msg: "Internal server error" });
  }
};

const getWithdrawAmount = async (req, res) => {
  const { currency, Amount } = req.body;

  const existTrederPayment = await PaymentModel.findOne({
    $and: [{ trader_Id: req.Trader.traderId }, { payment_Currency: currency }],
  });

  const newPaymentHistory = new HistoryModel({
    payment_Id: existTrederPayment.payment_Id,
    payment_Amount: Amount,
    payment_Currency: currency,
    payment_Order_Id: existTrederPayment.payment_Order_Id,
    trader_Id: req.Trader.traderId,
    transactionType: "withdrawal",
  });
  try {
    if (!existTrederPayment) {
      return res
        .status(401)
        .json({ status: 401, msg: "You Don't have this Currency in wallet." });
    }
    if (existTrederPayment.payment_Amount >= Amount) {
      const updatedAmount = existTrederPayment.payment_Amount - Amount;
      const newUpdatedTrader = await PaymentModel.findByIdAndUpdate(
        existTrederPayment._id,
        { payment_Amount: updatedAmount },
        { new: true }
      );
      if (newUpdatedTrader) {
        newPaymentHistory.status = "Complete";
        await newPaymentHistory.save();
        return res.status(200).json({
          status: 200,
          msg: "Amount withdrawn successfully.",
        });
      }
    }
    return res.status(301).json({
      status: 301,
      msg: "You don't have that much balance for withdraw.",
    });
  } catch (error) {
    newPaymentHistory.status = "Incomplete";
    await newPaymentHistory.save();
    return res.status(500).json({ code: 500, msg: "Internal server error" });
  }
};

const getWithdrawDetail = async (req, res) => {
  try {
    const existraderHistory = await HistoryModel.find({
      trader_Id: req.Trader.traderId,
    });
    if (!existraderHistory || existraderHistory.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: "Transaction history not found for the trader.",
      });
    }
    return res.status(200).json({
      status: 200,
      data: existraderHistory,
      msg: "Transaction history retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal server error while retrieving transaction history.",
    });
  }
};

//here error in populate..

const getTransactionDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const traderDetail = await HistoryModel.findById({ _id: id }).populate({
      path: "trader_Id",
      match: { _id: req.Trader.traderId }, // Match the traderId from req.Trader
    });

    if (!traderDetail) {
      return res.status(404).json({
        status: 404,
        message: "Transaction Detail Not Found.",
      });
    }
    return res.status(200).json({
      status: 200,
      data: traderDetail,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal server error while retrieving transaction history.",
    });
  }
};

module.exports = {
  getAmount,
  getVerify,
  getPaymentDetail,
  getWithdrawAmount,
  getWithdrawDetail,
  getTransactionDetails,
};
