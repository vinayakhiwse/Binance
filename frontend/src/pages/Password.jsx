import { useFormik } from "formik";
import React, { useState } from "react";
import { TbBounceRight } from "react-icons/tb";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { PasswordValidation } from "../validation/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toast, ToastComponent } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { traderAuth } from "../redux/slice/traderAuth";
import { checkAuth } from "../redux/slice/checkAuth";

function Password() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trader.value);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: PasswordValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:8080/api/signup", {
          email: data.email,
          password: values.password,
        });
        if (res.status === 200) {
          console.log("password data...", res.data);
          Toast.success(res.data.msg);
          setTimeout(() => {
            dispatch(
              traderAuth({
                id: res.data.data._id,
                email: res.data.data.email,
                isVerified: res.data.data.verify,
              })
            );
            localStorage.setItem("token", res.data.token);
            dispatch(checkAuth());
            return navigate("/");
          }, 1000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
      }
    },
  });
  return (
    <>
      <div className="w-3/6 m-auto mt-32 flex flex-row gap-2 items-center justify-center">
        <div className="w-3/6 flex flex-col">
          <h2 className="text-3xl font-medium">Set Password</h2>

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

export default Password;
