import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ScanImg from "../assets/download.png";
import { useFormik } from "formik";
import { SignUpValidations } from "../validation/FormValidation";
import axios from "axios";
import { Toast, ToastComponent } from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { traderAuth } from "../redux/slice/traderAuth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trader.value);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignUpValidations,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/login/email",
          values
        );
        if (res.status === 200) {
          console.log("login....", res.data);
          dispatch(traderAuth({ ...data, email: values.email }));
          Toast.success(res.data.msg);
          setTimeout(() => {
            return navigate("/login/password");
          }, 3000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
        Toast.error(error.response.data.error);
      }
    },
  });

  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };

  return (
    <>
      <div className="w-3/6 m-auto mt-40 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Log In</h2>
          <form className="w-full mt-8" onSubmit={formik.handleSubmit}>
            <label htmlFor="text" className="mt-5 mb-2">
              Email / Phone Number
            </label>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-200 hover:border-[#FCD12A] focus:border-[#FCD12A] focus:outline-none"
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-[#D30000] mt-3">
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div className="px-6 sm:px-0 max-w-sm mt-8">
              <button
                type="submit"
                className="text-black w-full bg-[#FCD12A] hover:bg-[#FCD12A]/90 focus:ring-4 focus:outline-none focus:ring-[#FCD12A]/50 font-medium rounded-lg text-md px-5 py-3.5 text-center dark:focus:ring-[#FCD12A]/55 mr-2 mb-2"
              >
                Next
              </button>
            </div>
          </form>
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
          <p className="text-sm text-gray-800 text-left mt-4">
            <Link
              to={"/login/auth"}
              className="text-[#FCD12A] font-medium hover:underline"
            >
              Create a Binance Account
            </Link>
          </p>
        </div>
        <div className="w-3/6">
          <div className="w-4/12 m-auto flex  items-center mt-20">
            <img className="w-full" src={ScanImg} alt="front-img" />
          </div>
          <h2 className="text-xl font-medium text-center mt-5">
            Log in with QR code
          </h2>
          <p className="text-sm w-[60%] m-auto font-medium text-gray-600 text-center mt-5">
            Scan this code with the{" "}
            <Link
              to={""}
              className="text-[#FCD12A] font-medium hover:underline"
            >
              Binance mobile app
            </Link>{" "}
            to log in instantly.
          </p>
        </div>
      </div>
      <ToastComponent />
    </>
  );
}

export default Login;
