import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VerifiedModel from "./VerifiedModel";
import { useFormik } from "formik";
import { PersonalDetailValidation } from "../validation/FormValidation";
import axios from "axios";
import { Toast, ToastComponent } from "../utils/toast";
import { traderAuth } from "../redux/slice/traderAuth";

function PersonalInformModel({
  setPersonalModel,
  setBinanceModel,
  setIsOpen,
  setAccountCreation,
  setVerifyAccount,
}) {
  const { name, flags } = useSelector((state) => state.country.country);
  const { value } = useSelector((state) => state.trader);
  const dispatch = useDispatch();
  const [AccountCreated, setAccountCreated] = useState(false);
  const maxDate = new Date(); // Today's date
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const token = localStorage.getItem("token");

  const handleDateChange = (date) => {
    formik.setFieldValue("DOB", date);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      panNumber: "",
      aadharNumber: "",
      address: "",
      city: "",
      DOB: "",
    },
    validationSchema: PersonalDetailValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/trader/verify",
          {
            fullName: values.fullName,
            panNumber: values.panNumber,
            aadharNumber: values.aadharNumber,
            address: values.address,
            city: values.city,
            DOB: values.DOB,
            country: name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // send the token in the headers
            },
          }
        );
        if (res.data.status === 200) {
          console.log("verification data....", res.data);
          dispatch(traderAuth({ ...value, isVerified: true }));
          Toast.success(res.data.msg);
          setAccountCreated(true);
          return;
        } else {
          Toast.error(res.data.msg);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
        console.log("error in verified", error.response.data.msg);
      }
    },
  });

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 z-20">
        <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-lg shadow-3xl w-[45%] py-6 px-8">
          <MdCancel
            onClick={() => setPersonalModel(false)}
            className="text-3xl ml-auto cursor-pointer text-gray-400"
          />
          <p className="text-center text-3xl mt-5 text-gray-800">
            Personal Information
          </p>

          <div className="w-full">
            <p className="text-center text-gray-600 text-md mt-5">
              Please Provide the following information as shown on your passport
              or ID card.
            </p>
            <p className="w-[60%] m-auto mt-8 text-gray-500">Nationality</p>
            <div className="w-[60%] m-auto flex items-center justify-between border border-gray-300 p-2 mt-1 cursor-pointer">
              <div className="flex items-center">
                <img
                  src={flags}
                  alt="currency"
                  className="w-8 h-8 rounded-full"
                />{" "}
                <p className="ml-2 text-md">{name}</p>
              </div>
              <IoMdArrowDropdown />
            </div>
            <form className="px-4 mt-2 py-3" onSubmit={formik.handleSubmit}>
              <div className="w-[86%] m-auto flex gap-[2%]">
                <div className="w-[49%]">
                  <br />
                  <label htmlFor="name" className="text-gray-600">
                    Full Name
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    placeholder="Enter Full Name."
                    className="w-full border border-gray-200 p-3 outline-none text-gray-600 hover:border-yellow-400"
                  />{" "}
                  {formik.errors.fullName && formik.touched.fullName && (
                    <span className="text-[#D30000] text-xs">
                      {formik.errors.fullName}
                    </span>
                  )}
                  <br />
                  <br />
                  <label htmlFor="name" className="text-gray-600">
                    Date Of Birth
                  </label>{" "}
                  <br />
                  <DatePicker
                    selected={formik.values.DOB}
                    maxDate={maxDate}
                    placeholderText="DOB"
                    onChange={handleDateChange}
                    className="w-full border border-gray-200 p-3 outline-none text-gray-600 hover:border-yellow-400"
                  />
                  {formik.errors.DOB && formik.touched.DOB && (
                    <span className="text-[#D30000] text-xs">
                      {formik.errors.DOB}
                    </span>
                  )}
                  <br />
                  <br />
                  <label htmlFor="name" className="text-gray-600">
                    Aadhar Number
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formik.values.aadharNumber}
                    onChange={formik.handleChange}
                    placeholder="Enter Aadhar Number."
                    className="w-full border border-gray-200 p-3 outline-none text-gray-600 hover:border-yellow-400"
                  />{" "}
                  {formik.errors.aadharNumber &&
                    formik.touched.aadharNumber && (
                      <span className="text-[#D30000] text-xs">
                        {formik.errors.aadharNumber}
                      </span>
                    )}
                </div>
                <div className="w-[49%]">
                  <br />
                  <label htmlFor="name" className="text-gray-600">
                    PAN Card
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="panNumber"
                    value={formik.values.panNumber}
                    onChange={formik.handleChange}
                    placeholder="Enter Pan Card Number."
                    className="w-full border border-gray-200 p-3 outline-none text-gray-600 hover:border-yellow-400"
                  />{" "}
                  {formik.errors.panNumber && formik.touched.panNumber && (
                    <span className="text-[#D30000] text-xs">
                      {formik.errors.panNumber}
                    </span>
                  )}
                  <br />
                  <br />
                  <label htmlFor="name" className="text-gray-600">
                    Address
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder="Enter Address."
                    className="w-full border border-gray-200 p-3 outline-none text-gray-600 hover:border-yellow-400"
                  />{" "}
                  {formik.errors.address && formik.touched.address && (
                    <span className="text-[#D30000] text-xs">
                      {formik.errors.address}
                    </span>
                  )}
                  <br />
                  <br />
                  <label htmlFor="name" className="text-gray-600">
                    City
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder="Enter City."
                    className="w-full border outline-none text-gray-600 border-gray-200 p-3 hover:border-yellow-400"
                  />{" "}
                  {formik.errors.city && formik.touched.city && (
                    <span className="text-[#D30000] text-xs">
                      {formik.errors.city}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full flex items-center justify-center mt-8">
                <button
                  type="submit"
                  className="w-[80%] bg-yellow-400 py-3 px-4 text-gray-800 rounded-sm text-md"
                >
                  Verify Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {AccountCreated && (
        <VerifiedModel
          setAccountCreated={setAccountCreated}
          setPersonalModel={setPersonalModel}
          setBinanceModel={setBinanceModel}
          setIsOpen={setIsOpen}
          setAccountCreation={setAccountCreation}
          setVerifyAccount={setVerifyAccount}
        />
      )}
      <ToastComponent />
    </>
  );
}

export default PersonalInformModel;
