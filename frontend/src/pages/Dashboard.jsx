import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { traderAuth } from "../redux/slice/traderAuth";
import { checkAuth } from "../redux/slice/checkAuth";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import { FaBitcoin } from "react-icons/fa";
import DashboardSidebar from "../utils/DashboardSidebar";
import WithdrawModel from "../model/WithdrawModel";

function Dashboard() {
  const [trader, setTrader] = useState(null);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currencyObject, setCurrencyObject] = useState({});
  const navigate = useNavigate();
  const [withdrawModel, setWithdrawModel] = useState(false);
  const token = localStorage.getItem("token");

  const getTrader = async () => {
    try {
      const url = `http://localhost:8080/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      localStorage.setItem("token", data.user.token);
      console.log("data google..", data);
      dispatch(
        traderAuth({
          id: data.user.data._id,
          email: data.user.data.email,
          profile: data.user.data.profile,
          isVerified: data.user.data.verify,
        })
      );
      dispatch(checkAuth());
      setTrader(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrader();
  }, []);

  const getpaymentDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/payment/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === 200) {
        setData(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log("error in payment detail", error);
    }
  };

  const calculateTotalAmountByCurrency = (data) => {
    const totalByCurrency = {};
    data &&
      data?.forEach((payment) => {
        const { payment_Currency, payment_Amount } = payment;
        if (!totalByCurrency[payment_Currency]) {
          totalByCurrency[payment_Currency] = payment_Amount;
        } else {
          totalByCurrency[payment_Currency] += payment_Amount;
        }
      });
    return totalByCurrency;
  };

  useEffect(() => {
    const details = calculateTotalAmountByCurrency(data);
    setCurrencyObject(details);
  }, [data]);

  useEffect(() => {
    getpaymentDetails();
  }, [withdrawModel]);

  const totalAmount = data?.reduce(
    (total, payment) => total + payment.payment_Amount,
    0
  );

  const handleBalance = () => {
    navigate("/bank/deposit");
    return;
  };

  return (
    <>
      <div className="w-full flex gap-5 mt-5 bg-[#ffffff]">
        <DashboardSidebar />
        <div className="w-[80%] m-auto mt-4 border border-gray-200">
          <div className="flex justify-center p-5 mt-6">
            <p className="text-3xl">Total Estimated Balance : </p>{" "}
            <p className="text-3xl text-yellow-400">
              {totalAmount ? totalAmount : "00.00"}
            </p>
          </div>
          <div className="w-[35%] m-auto mt-8 flex items-center justify-between">
            <button
              onClick={handleBalance}
              className="w-[30%] flex items-center justify-center gap-2 bg-blue-500 py-3 px-2 rounded-md hover:bg-blue-600 hover:text-[#ffffff]"
            >
              <AiOutlinePlus className="text-2xl text-[#ffffff]" /> Add Funds
            </button>
            <button
              onClick={() => setWithdrawModel(true)}
              className="w-[30%] flex items-center justify-center gap-2 bg-yellow-500 py-3 px-2 rounded-md hover:bg-yellow-600 hover:text-[#ffffff]"
            >
              <FiRefreshCw className="text-2xl text-[#ffffff]" /> Withdraws
            </button>
            <button
              onClick={() => navigate("/buycrypto")}
              className="w-[30%] flex items-center justify-center gap-2 bg-green-500 py-3 px-2 rounded-md hover:bg-green-600 hover:text-[#ffffff]"
            >
              <FaBitcoin className="text-2xl text-[#ffffff]" /> Buy Crypto
            </button>
          </div>
          <ul className="w-[30%] mt-14 p-6 mb-16 flex flex-col gap-1 items-center justify-center m-auto border border-yellow-400 rounded-md hover:bg-gray-50">
            <p className="text-xl">Total Amounts by Currency</p>
            <p className="text-center text-yellow-400">
              {" "}
              The total amount exceeds a certain threshold.
            </p>
            {Object.keys(currencyObject).map((currency) => (
              <li key={currency} className="text-2xl mt-3">
                {currency}: {currencyObject[currency]}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {withdrawModel && <WithdrawModel setWithdrawModel={setWithdrawModel} />}
    </>
  );
}

export default Dashboard;
