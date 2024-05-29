const { Schema, model } = require("mongoose");

const VerifySchema = new Schema(
  {
    fullName: { type: String, required: true },
    DOB: { type: String, required: true },
    aadharNumber: { type: Number, required: true, unique: true },
    panNumber: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const VerifyModel = model("Verified", VerifySchema);

module.exports = VerifyModel;
