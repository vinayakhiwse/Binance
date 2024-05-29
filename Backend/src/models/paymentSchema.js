const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema(
  {
    payment_Id: { type: String, required: true, unique: true },
    payment_Amount: { type: Number, required: true },
    payment_Currency: { type: String, required: true },
    payment_Order_Id: { type: String, required: true },
    trader_Id: { type: Schema.Types.ObjectId, ref: "Trader" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PaymentModel = model("Payment", PaymentSchema);

module.exports = PaymentModel;
