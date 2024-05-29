import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import OtpForm from "../pages/OtpForm";
import Password from "../pages/Password";
import LoginPassword from "../pages/LoginPassword";
import LoginOtp from "../pages/LoginOtp";
import PrivateRoute from "../Private/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import ForgetPassword from "../pages/ForgetPassword";
import BuyCrypto from "../pages/BuyCrypto";
import Markets from "../pages/Markets";
import BankDeposit from "../pages/BankDeposit";
import DepositCrypto from "../pages/DepositCrypto";
import Payment from "../pages/Payment";
import PaymentDetail from "../pages/PaymentDetail";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login/auth" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<PrivateRoute element={<Dashboard />} />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/otp" element={<OtpForm />} />
        <Route path="/password" element={<Password />} />
        <Route path="/login/password" element={<LoginPassword />} />
        <Route path="/login/otp" element={<LoginOtp />} />
        <Route path="/login/forget/password" element={<ForgetPassword />} />
        <Route
          path="/buycrypto"
          element={<PrivateRoute element={<BuyCrypto />} />}
        />
        <Route
          path="/markets"
          element={<PrivateRoute element={<Markets />} />}
        />
        <Route path="/bank/deposit" element={<BankDeposit />} />
        <Route path="/deposit/crypto" element={<DepositCrypto />} />
        <Route path="/binance/payment" element={<Payment />} />
        <Route path="/payment/detail/:id" element={<PaymentDetail />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
