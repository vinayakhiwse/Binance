const { Schema, model } = require("mongoose");

const EmailSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    expiresAt: { type: Date, default: Date.now, expires: "1m" }, // Set the expiration time (e.g., 5 minutes)
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EmailModel = model("Otp", EmailSchema);

module.exports = EmailModel;
