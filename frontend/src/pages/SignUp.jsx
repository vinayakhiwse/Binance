import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountImg from "../assets/Account.png";
import { IoFlowerSharp } from "react-icons/io5";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";
import { TbCoinBitcoin } from "react-icons/tb";
import { useFormik } from "formik";
import { SignUpValidations } from "../validation/FormValidation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { traderAuth } from "../redux/slice/traderAuth";
import { ToastComponent, Toast } from "../utils/toast";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignUpValidations,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:8080/api/otp", values);
        if (res.status === 200) {
          console.log(res.data);
          dispatch(traderAuth(res.data.data));
          Toast.success(res.data.msg);
          setTimeout(() => {
            return navigate("/otp");
          }, 3000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
      }
    },
  });

  return (
    <>
      <div className="w-full m-auto flex flex-row gap-2">
        <div className="w-full flex items-center justify-center pb-64 pt-40">
          {" "}
          <form className="w-3/6" onSubmit={formik.handleSubmit}>
            <div className="w-full flex flex-col">
              <h2 className="text-3xl font-medium">Create Personal Account</h2>

              <label htmlFor="text" className="mt-5 mb-2">
                Email / Phone Number
              </label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="max-w-sm p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none"
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-[#D30000] mt-3">
                  {formik.errors.email}
                </span>
              )}
              <label htmlFor="text" className="mt-5 mb-2">
                Referral ID:
              </label>
              <input
                type="text"
                placeholder="771497712"
                disabled={true}
                className="max-w-sm p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none"
              />
              <div className="max-w-sm text-sm mt-5">
                By creating an account, I agree to Binance's{" "}
                <Link className="font-medium underline">Terms of Service</Link>{" "}
                and{" "}
                <Link className="font-medium underline">Privacy Policy.</Link>
              </div>
              <div className="px-6 sm:px-0 max-w-sm mt-8">
                <button
                  type="submit"
                  className="text-black w-full bg-[#FCD12A] hover:bg-[#FCD12A]/90 focus:ring-4 focus:outline-none focus:ring-[#FCD12A]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center dark:focus:ring-[#FCD12A]/55 mr-2 mb-2"
                >
                  Next
                </button>
              </div>

              <p className="max-w-sm text-sm text-gray-800 text-left mt-4">
                Not looking for a personal account?{" "}
                <Link
                  to={"/login/auth"}
                  className="text-[#FCD12A] font-medium hover:underline"
                >
                  Sign up for an entity account
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="w-full flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-200 pb-66">
          {" "}
          <div className="w-4/6 items-center justify-center">
            <div className="w-4/12 m-auto flex  items-center mt-10">
              <img className="w-full" src={AccountImg} alt="front-img" />
            </div>
            <h2 className="text-2xl font-medium text-center mt-5 text-gray-700">
              Buy Crypto in Minutes
            </h2>
            <p className="text-md m-auto font-normal text-gray-600 text-center mt-5">
              Enjoy the world’s largest cryptocurrency exchange at your
              fingertips.
            </p>
            <div className="w-1/2 m-auto mt-10 flex flex-col">
              <div className="w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-row items-center justify-start text-gray-600">
                  <IoFlowerSharp className="mr-2 text-xl text-gray-600" />
                  Low Fees
                </div>
                <div className="w-1/2 flex flex-row items-center justify-start text-gray-600">
                  <AiOutlineSecurityScan className="mr-2 text-xl text-gray-600" />{" "}
                  Leading Security
                </div>
              </div>
              <div className="flex flex-row mt-10 justify-between">
                <div className="w-1/2 flex flex-row items-center justify-start text-gray-600">
                  <BsStopwatch className="mr-2 text-xl text-gray-600" /> 24/7
                  Support
                </div>
                <div className="w-1/2 flex flex-row items-center justify-start text-gray-600">
                  <TbCoinBitcoin className="mr-2 text-xl text-gray-600" /> 100+
                  Cryptos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastComponent />
    </>
  );
}

export default SignUp;
