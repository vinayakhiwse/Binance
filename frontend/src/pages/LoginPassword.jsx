import { useFormik } from "formik";
import React, { useState } from "react";
import { PasswordValidation } from "../validation/FormValidation";
import { IoMdArrowDropleft } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastComponent } from "../utils/toast";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../utils/Modal";

function LoginPassword() {
  const [show, setShow] = useState(false);
  const [passwordmodel, setPasswordModel] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trader.value);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: PasswordValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:8080/api/login", {
          email: data.email,
          password: values.password,
        });
        if (res.status === 200) {
          Toast.success(res.data.msg);
          setTimeout(() => {
            return navigate("/login/otp");
          }, 3000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
        console.error("Error during form submission:", error);
      }
    },
  });

  return (
    <>
      <div className="w-1/2 m-auto mt-10 text-3xl font-medium">
        <Link to={"/login"} className="flex items-center">
          <IoMdArrowDropleft className="text-5xl" />
          Back
        </Link>
      </div>
      <div className="w-3/6 m-auto mt-32 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Welcome back!</h2>
          <p className="text-sm max-w-sm mt-3">vinayak.e****@gmail.com</p>
          <form className="w-full mt-8" onSubmit={formik.handleSubmit}>
            <label htmlFor="text" className="mt-8 mb-1">
              Password
            </label>
            <div className="relative w-full max-w-sm">
              <input
                type={show ? "text" : "password"}
                name="password"
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
            {formik.errors.otp && formik.touched.otp && (
              <span className="text-[#D30000] mt-4">{formik.errors.otp}</span>
            )}
            <div className="px-6 sm:px-0 max-w-sm mt-8">
              <button
                type="submit"
                className="text-black w-full bg-[#FCD12A] hover:bg-[#FCD12A]/90 focus:ring-4 focus:outline-none focus:ring-[#FCD12A]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center dark:focus:ring-[#FCD12A]/55 mr-2 mb-2"
              >
                Next
              </button>{" "}
              <p
                className="max-w-sm text-md text-gray-800 text-left mt-3"
                onClick={() => setPasswordModel(!passwordmodel)}
              >
                <span className="text-[#FCD12A] font-medium hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastComponent />
      {passwordmodel && (
        <Modal
          setPasswordModel={setPasswordModel}
          passwordmodel={passwordmodel}
        />
      )}
    </>
  );
}

export default LoginPassword;
