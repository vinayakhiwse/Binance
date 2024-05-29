const { Schema, model } = require("mongoose");

const TraderSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },
    isGoogleAccount: { type: Boolean, default: false },
    profile: { type: String },
    verify: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TraderModel = model("trader", TraderSchema);

module.exports = TraderModel;
