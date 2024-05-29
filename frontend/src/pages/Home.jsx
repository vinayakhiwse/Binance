import React, { useEffect, useState } from "react";
import frontendImg from "../assets/SignUp.png";
import { FcBusinesswoman, FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { traderAuth } from "../redux/slice/traderAuth";
import { checkAuth } from "../redux/slice/checkAuth";
import { Toast } from "../utils/toast";

function Home() {
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const dispatch = useDispatch();


  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };

  //wss://stream.binance.com:9443/ws/!miniTicker@arr

 

  return (
    <>
      <div className="w-3/6 m-auto mt-44 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Welcome to Binance!</h2>
          <div className="px-6 sm:px-0 max-w-sm mt-10">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-black w-full bg-[#FCD12A] hover:bg-[#FCD12A]/90 focus:ring-4 focus:outline-none focus:ring-[#FCD12A]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center inline-flex items-center justify-between dark:focus:ring-[#FCD12A]/55 mr-2 mb-2"
            >
              <FcBusinesswoman className="text-2xl" />
              Sign Up with Email or Phone<div></div>
            </button>
          </div>
          <div className="border-b border-gray-200 max-w-sm mt-4"></div>
          <div className="px-6 sm:px-0 max-w-sm mt-6">
            <button
              type="button"
              onClick={googleAuth}
              className="text-black w-full bg-[#EDEDED] hover:bg-[#EDEDED]/90 focus:ring-4 focus:outline-none focus:ring-[#EDEDED]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center inline-flex items-center justify-between dark:focus:ring-[#EDEDED]/55 mr-2 mb-2"
            >
              <FcGoogle className="text-2xl" />
              Continue With Google<div></div>
            </button>
          </div>
          <div className="px-6 sm:px-0 max-w-sm mt-2">
            <button
              type="button"
              className="text-black w-full  bg-[#EDEDED] hover:bg-[#EDEDED]/90 focus:ring-4 focus:outline-none focus:ring-[#EDEDED]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center inline-flex items-center justify-between dark:focus:ring-[#EDEDED]/55 mr-2 mb-2"
            >
              <BsApple className="text-2xl" />
              Continue With Apple<div></div>
            </button>
          </div>
          <p className="text-sm text-gray-800 text-left mt-5">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#FCD12A] font-semibold">
              Log In
            </Link>
          </p>
          <p className="text-sm text-gray-800 text-left mt-5">
            Need an entity account?{" "}
            <Link to={"/register"} className="text-[#FCD12A] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="w-3/6">
          <div className="w-10/12 m-auto flex  items-center">
            <img className="w-full" src={frontendImg} alt="front-img" />
          </div>
          <h2 className="text-2xl font-medium text-center mt-5">
            Sign up to get 100 USDT trading fee rebate!
          </h2>
          <p className="text-md font-medium text-gray-600 text-center mt-5">
            Follow the registration steps to redeem your rewards and start your
            crypto journey with us! FAQ
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
