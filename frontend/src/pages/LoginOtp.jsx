import { useFormik } from "formik";
import React from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastComponent } from "../utils/toast";
import { OtpVerificationValidation } from "../validation/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { traderAuth } from "../redux/slice/traderAuth";
import { checkAuth } from "../redux/slice/checkAuth";

function LoginOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.trader.value);
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: OtpVerificationValidation,
    onSubmit: async (values) => {
      try {
        const otpVerify = await axios.post(
          "http://localhost:8080/api/login/otp",
          {
            email: data.email,
            otp: values.otp,
          }
        );
        if (otpVerify.status === 200) {
          localStorage.setItem("token", otpVerify.data.token);
          dispatch(checkAuth());
          console.log("otpverification", otpVerify.data);
          Toast.success(otpVerify.data.msg);
          setTimeout(() => {
            dispatch(
              traderAuth({
                id: otpVerify.data.data.id,
                email: otpVerify.data.data.email,
                isVerified: otpVerify.data.data.verify,
              })
            );
            return navigate("/");
          }, 2000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
      }
    },
  });
  return (
    <>
      <div className="w-1/2 m-auto mt-10 text-3xl font-medium">
        <Link to={"/login/password"} className="flex items-center">
          <IoMdArrowDropleft className="text-5xl" />
          Back
        </Link>
      </div>
      <div className="w-3/6 m-auto mt-32 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Security Verification</h2>
          <form className="w-full mt-8" onSubmit={formik.handleSubmit}>
            <label htmlFor="text" className="mt-8 mb-1">
              Email Verification Code
            </label>
            <input
              type="text"
              name="otp"
              onChange={formik.handleChange}
              value={formik.values.otp}
              className="w-full max-w-sm p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none"
            />
            <p className="text-sm max-w-sm">
              Enter the 6-digit verification code sent to vin***@gmail.com.
            </p>
            {formik.errors.otp && formik.touched.otp && (
              <span className="text-[#D30000] mt-4">{formik.errors.otp}</span>
            )}
            <div className="px-6 sm:px-0 max-w-sm mt-8">
              <button
                type="submit"
                className="text-black w-full bg-[#FCD12A] hover:bg-[#FCD12A]/90 focus:ring-4 focus:outline-none focus:ring-[#FCD12A]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center dark:focus:ring-[#FCD12A]/55 mr-2 mb-2"
              >
                Submit
              </button>{" "}
              <p className="max-w-sm text-md text-gray-800 text-left mt-3">
                <Link
                  to={"/"}
                  className="text-[#FCD12A] font-medium hover:underline"
                >
                  Security verification unavailable?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastComponent />
    </>
  );
}

export default LoginOtp;
