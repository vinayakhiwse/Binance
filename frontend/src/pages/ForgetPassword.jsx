import { useFormik } from "formik";
import React, { useState } from "react";
import { ResetPasswordValidation } from "../validation/FormValidation";
import { TbBounceRight } from "react-icons/tb";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { Toast, ToastComponent } from "../utils/toast";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropleft } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { traderAuth } from "../redux/slice/traderAuth";
import { checkAuth } from "../redux/slice/checkAuth";

function ForgetPassword() {
  const [show, setShow] = useState(false);
  const [showconfirm, setShowConfirm] = useState(false);
  const data = useSelector((state) => state.trader.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordValidation,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/login/password/reset",
            { email: data.email, password: values.confirmPassword }
          );
          Toast.success(res.data.msg);
          localStorage.setItem("token", res.data.token);
          dispatch(checkAuth());
          console.log("otpverification", res.data);
          setTimeout(() => {
            dispatch(
              traderAuth({
                id: res.data.data.id,
                email: res.data.data.email,
                isVerified: res.data.data.verify,
              })
            );
            return navigate("/");
          }, 2000);
        } catch (error) {
          console.log(error);
        }
      } else {
        Toast.error("Password not matched.");
      }
    },
  });
  return (
    <>
      <div className="w-1/2 m-auto mt-8 text-3xl font-medium">
        <Link to={"/login/password"} className="flex items-center">
          <IoMdArrowDropleft className="text-5xl" />
          Back
        </Link>
      </div>
      <div className="w-3/6 m-auto mt-20 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Reset Password</h2>
          <div className="relative mt-5 bg-yellow-100 px-5 pl-9 py-5 w-full text-gray-600 max-w-sm text-sm">
            <BsFillExclamationCircleFill className="text-yellow-400 text-xl absolute top-5 left-2 z-50" />{" "}
            In order to protect your account, withdrawals, P2P selling, payment
            services, and Binance Card applications will be disabled for 24
            hours after you change your password.
          </div>
          <form className="w-full mt-8" onSubmit={formik.handleSubmit}>
            <label htmlFor="text" className="mt-8 mb-1">
              New Password
            </label>
            <div className="relative w-full max-w-sm">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="*********"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none" // Added left padding to accommodate the icon
              />
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                {show ? (
                  <BsEyeFill
                    className="text-2xl cursor-pointer"
                    onClick={() => setShow(!show)}
                  />
                ) : (
                  <BsEyeSlashFill
                    className="text-2xl cursor-pointer"
                    onClick={() => setShow(!show)}
                  />
                )}
              </div>
            </div>

            {formik.errors.password && formik.touched.password && (
              <span className="text-[#D30000] text-sm mt-2">
                {formik.errors.password}
              </span>
            )}
            <div className="mt-5">
              <p
                className={`mb-2 flex items-center ${
                  formik.values.password.length >= 8
                    ? "text-[#00C853]"
                    : "text-[#D30000]"
                }`}
              >
                {formik.values.password.length >= 8 ? (
                  <TbBounceRight className="text-xl mr-3" />
                ) : (
                  <TbBounceRight className="text-xl mr-3" />
                )}
                At least 8 characters
              </p>
              <p
                className={`mb-2 flex items-center ${
                  /\d/.test(formik.values.password)
                    ? "text-[#00C853]"
                    : "text-[#D30000]"
                }`}
              >
                {/\d/.test(formik.values.password) ? (
                  <TbBounceRight className="text-xl mr-3" />
                ) : (
                  <TbBounceRight className="text-xl mr-3" />
                )}
                At least 1 number
              </p>
              <p
                className={`flex items-center ${
                  /[A-Z]/.test(formik.values.password)
                    ? "text-[#00C853]"
                    : "text-[#D30000]"
                }`}
              >
                {/[A-Z]/.test(formik.values.password) ? (
                  <TbBounceRight className="text-xl mr-3" />
                ) : (
                  <TbBounceRight className="text-xl mr-3" />
                )}
                At least 1 uppercase letter
              </p>
            </div>
            <div className="mt-12">
              <label htmlFor="text" className="mb-1">
                Confirm Password
              </label>
              <div className="relative w-full max-w-sm">
                <input
                  type={showconfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="*********"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="w-full p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none" // Added left padding to accommodate the icon
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                  {showconfirm ? (
                    <BsEyeFill
                      className="text-2xl cursor-pointer"
                      onClick={() => setShowConfirm(!showconfirm)}
                    />
                  ) : (
                    <BsEyeSlashFill
                      className="text-2xl cursor-pointer"
                      onClick={() => setShowConfirm(!showconfirm)}
                    />
                  )}
                </div>
              </div>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <span className="text-[#D30000] text-sm mt-2">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>

            <div className="px-6 sm:px-0 max-w-sm mt-8">
              <button
                type="submit"
                className="text-black w-full bg-[#FCD12A] hover:bg-[#FCD12A]/90 focus:ring-4 focus:outline-none focus:ring-[#FCD12A]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center dark:focus:ring-[#FCD12A]/55 mr-2 mb-2"
              >
                Next
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
      <ToastComponent />
    </>
  );
}

export default ForgetPassword;
