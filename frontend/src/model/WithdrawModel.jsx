import React, { useState } from "react";
import { currencyData } from "../utils/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import DepositModel from "../utils/DepositModel";
import { useFormik } from "formik";
import { PaymentValidation } from "../validation/FormValidation";
import axios from "axios";
import { Toast, ToastComponent } from "../utils/toast";
function WithdrawModel({ setWithdrawModel }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(currencyData[0]);
  const token = localStorage.getItem("token");

  const handleSelected = (object) => {
    setSelected(object);
    formik.setFieldValue("currency", object.symbol);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      currency: "",
      Amount: "",
    },
    validationSchema: PaymentValidation,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await axios.post(
          `http://localhost:8080/api/payment/withdraw`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 200) {
          Toast.success(res.data.msg);
          setTimeout(() => {
            setWithdrawModel(false);
          }, 3000);
        }
      } catch (error) {
        Toast.error(error.response.data.msg);
        console.log("error in payment detail", error);
      }
    },
  });

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 z-20">
        <div className="flex flex-col gap-1 p-10 justify-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-lg shadow-3xl w-[20%]">
          <div
            onClick={() => setOpen(true)}
            className="w-[100%] flex items-center justify-between border border-gray-300 p-2 mt-1 cursor-pointer"
          >
            <div className="flex items-center">
              <img
                src={selected.logo}
                alt="currency"
                className="w-8 h-8 rounded-full"
              />{" "}
              <p className="ml-2 text-md">{selected.symbol}</p>
              <p className="ml-2 text-sm text-gray-400">{selected.name}</p>
            </div>
            <IoMdArrowDropdown />
          </div>{" "}
          {formik.errors.currency && formik.touched.currency && (
            <span className="text-[#D30000] mt-2 text-sm">
              {formik.errors.currency}
            </span>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full mt-3">
              <label htmlFor="amount" className="mt-8 text-sm">
                Amount
              </label>
              <input
                placeholder="Enter Withdraw Money."
                type="number"
                name="Amount"
                value={formik.values.Amount}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 outline-none"
              />
              {formik.errors.Amount && formik.touched.Amount && (
                <span className="text-[#D30000] mt-2 text-sm">
                  {formik.errors.Amount}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 py-3 px-6 mt-2 rounded-md"
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>
      <ToastComponent />
      {open && (
        <DepositModel
          open={open}
          setOpen={setOpen}
          currencyData={currencyData}
          setSelected={setSelected}
          handleSelected={handleSelected}
        />
      )}
    </>
  );
}

export default WithdrawModel;
