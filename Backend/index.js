require("dotenv").config();
require("./src/mail/transporter");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const connectDB = require("./config/db");
const TraderAuth = require("./src/routes/trader");
const EmailRoutes = require("./src/routes/email");
const passportStrategy = require("./src/utils/passport");
const GoogleAuth = require("./src/routes/googleAuth");
const CoinRoutes = require("./src/routes/coinMarket");
const VerifyRoutes = require("./src/routes/verify");
const payment = require("./src/controller/paymentController");
const isAuth = require("./src/middleware/isAuth");
const isVerified = require("./src/middleware/isVerified");
const PaymentRoute = require("./src/routes/payment");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Set up cookie-session middleware
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Initialize Passport after setting up session middleware
app.use(passport.initialize());
app.use(passport.session());

//here api endpoint.
app.use("/api", TraderAuth);
app.use("/auth", GoogleAuth);
app.use("/api", EmailRoutes);
app.use("/api", CoinRoutes);
app.use("/api", VerifyRoutes);
app.post("/api/payment", isAuth, isVerified, payment.getAmount);
app.post("/api/payment/verify", isAuth, isVerified, payment.getVerify);
app.use("/api", PaymentRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`server connected at the port ${PORT}`);
});
