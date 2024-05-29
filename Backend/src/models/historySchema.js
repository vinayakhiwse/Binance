const { Schema, model } = require("mongoose");

const HistorySchema = new Schema(
  {
    payment_Id: { type: String, required: true, unique: true },
    payment_Amount: { type: Number, required: true },
    payment_Currency: { type: String, required: true },
    payment_Order_Id: { type: String, required: true },
    trader_Id: { type: Schema.Types.ObjectId, ref: "Trader" },
    status: {
      type: String,
      enum: ["Complete", "Incomplete", "Pending"],
      default: "Pending",
    },
    transactionType: {
      type: String,
      enum: ["withdrawal", "deposit"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const HistoryModel = model("History", HistorySchema);

module.exports = HistoryModel;
