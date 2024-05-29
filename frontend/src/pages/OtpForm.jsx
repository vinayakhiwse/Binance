import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropleft } from "react-icons/io";
import { useFormik } from "formik";
import { OtpVerificationValidation } from "../validation/FormValidation";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toast, ToastComponent } from "../utils/toast";

function OtpForm() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.trader.value);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: OtpVerificationValidation,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const otpVerify = await axios.post("http://localhost:8080/api/verify", {
          otp: values.otp,
          email: data.email,
        });
        if (otpVerify.status === 200) {
          Toast.success(otpVerify.data.msg);
          setTimeout(() => {
            return navigate("/password");
          }, 3000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
      }
    },
  });

  return (
    <>
      <div className="w-1/2 m-auto mt-10 text-3xl font-medium">
        <Link to={"/register"} className="flex items-center">
          <IoMdArrowDropleft className="text-5xl" />
          Back
        </Link>
      </div>
      <div className="w-3/6 m-auto mt-32 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Email Verification</h2>
          <p className="text-sm max-w-sm mt-3">
            Please Enter the 6-digit verification code sent to email. The code
            Valid for the 30 minutes.
          </p>
          <form className="w-full mt-8" onSubmit={formik.handleSubmit}>
            <label htmlFor="text" className="mt-8 mb-1">
              Email verification code
            </label>
            <input
              type="text"
              name="otp"
              onChange={formik.handleChange}
              value={formik.values.otp}
              className="w-full max-w-sm p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none"
            />
            <br />
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
                  Didn't receive the code?
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

export default OtpForm;
