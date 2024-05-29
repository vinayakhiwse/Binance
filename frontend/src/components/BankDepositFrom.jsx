import React, { useState } from "react";
import DepositModel from "../utils/DepositModel";
import { currencyData } from "../utils/navigation";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import VerifyAccountModel from "../utils/VerifyAccountModel";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toast, ToastComponent } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { PaymentValidation } from "../validation/FormValidation";
import { GiFlatHammer } from "react-icons/gi";

function BankDepositFrom() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(currencyData[0]);
  const [verifyAccount, setVerifyAccount] = useState(false);
  const { value } = useSelector((state) => state.trader);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log("new values...", value);

  const handleVerification = () => {
    setVerifyAccount(true);
  };

  const handleRazorpay = async (data) => {
    try {
      const option = {
        key: "rzp_test_1xj9MSU8bSreK0",
        amount: Number(data.amount),
        currency: data.currency,
        name: "Binance Payment",
        description: "test transaction",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1024px-Binance_Logo.svg.png",
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8080/api/payment/verify",
              {
                response: {
                  ...response,
                  payment_Amount: data.amount / 100,
                  payment_Currency: data.currency,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyResponse.data.code === 200) {
              Toast.success("Your Payment Added Successfully.");
              setTimeout(() => {
                return navigate("/buycrypto");
              }, 3000);
            }
            if (verifyResponse.data.code === 500) {
              Toast.error("Your Payment Failed.");
              return;
            }
          } catch (verificationError) {
            Toast.error(verificationError.response.data.error);
            console.error("Error verifying payment:", verificationError);
          }
        },
      };
      const rzp = new window.Razorpay(option);
      rzp.open();
    } catch (error) {
      Toast.error(error.response.data.error);
      console.error("Error handling Razorpay:", error);
    }
  };

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
      console.log("payment data", values);
      try {
        const res = await axios.post(
          "http://localhost:8080/api/payment",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleRazorpay(res.data.data);
      } catch (error) {
        Toast.error(error.response.data.error);
        console.log("payment error", error);
      }
    },
  });

  return (
    <>
      <div className="w-1/2 m-auto mt-20 flex justify-between pb-48">
        <div className="w-[40%]">
          <p className="text-lg">1. Select currency</p>
          <p className="mt-8 text-sm">
            Currency <span className="text-[#D30000]">*</span>
          </p>
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
          </div>
          {formik.errors.currency && formik.touched.currency && (
            <span className="text-[#D30000] mt-2 text-sm">
              {formik.errors.currency}
            </span>
          )}
          {value?.isVerified ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full mt-3">
                <label htmlFor="amount" className="mt-8 text-sm">
                  Amount <span className="text-[#D30000]">*</span>
                </label>
                <input
                  placeholder="Enter Deposit Money."
                  type="number"
                  name="Amount"
                  value={formik.values.Amount}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-300 outline-none"
                />
              </div>
              {formik.errors.Amount && formik.touched.Amount && (
                <span className="text-[#D30000] mt-2 text-sm">
                  {formik.errors.Amount}
                </span>
              )}
              <div>
                <p className="mt-4 text-sm text-gray-500">Deposit with</p>
                <button className="bg-gray-100 text-gray-500 px-3 py-3 mt-1 rounded-md text-sm">
                  Recommeneded
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 py-3 px-6 mt-4 rounded-md"
              >
                Add Payment
              </button>
            </form>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full mt-3">
                <label htmlFor="amount" className="mt-8 text-sm">
                  Amount
                </label>
                <input
                  placeholder="Enter Deposit Money."
                  type="number"
                  name="Amount"
                  value={formik.values.Amount}
                  onChange={formik.handleChange}
                  className="w-full p-3 border border-gray-300 outline-none"
                />
              </div>
              <div>
                <p className="mt-4 text-sm text-gray-500">Deposit with</p>
                <button className="bg-gray-100 text-gray-500 px-3 py-3 mt-1 rounded-md text-sm">
                  Recommeneded
                </button>
              </div>
              <div className="flex items-center mb-5">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-5 h-5 text-yellow-600 bg-gray-100 border-gray-300"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaEf7nbDm7x6lt606mncIdqGlz7FZawX8k-Jk4r9eEQ06FucsA"
                  alt="logo"
                  className="w-4 h-4 ml-2"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-md font-medium dark:text-gray-500"
                >
                  Bank Card(Visa/MC) <br />
                  <p className="text-sm">2% Fee</p>
                </label>
              </div>

              <button
                onClick={handleVerification}
                className="w-full bg-yellow-400 py-3 px-6 mt-2 rounded-md"
              >
                Continue
              </button>
            </form>
          )}
        </div>
        <div className="w-[40%] p-2 mt-14">
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <GiFlatHammer /> Appeal
          </p>
          <div className="flex mt-10 justify-between">
            <p>FAQ</p>
            <p className="flex items-center gap-1 text-yellow-500 cursor-pointer">
              View More <IoMdArrowDropright />{" "}
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-8">
            <div className="border-b border-gray-200"></div>
            <p className="w-[100%] flex items-center justify-between">
              How long does the deposit take?{" "}
              <IoMdArrowDropright className="text-2xl" />
            </p>
            <div className="border-b border-gray-200"></div>
            <p className="w-[100%] flex items-center justify-between">
              How to Deposit EUR and GBP with Truelayer{" "}
              <IoMdArrowDropright className="text-2xl" />
            </p>
            <div className="border-b border-gray-200"></div>
          </div>
        </div>
      </div>

      {open && (
        <DepositModel
          open={open}
          setOpen={setOpen}
          currencyData={currencyData}
          setSelected={setSelected}
          handleSelected={handleSelected}
        />
      )}

      {verifyAccount && (
        <VerifyAccountModel
          verifyAccount={verifyAccount}
          setVerifyAccount={setVerifyAccount}
        />
      )}
      <ToastComponent />
    </>
  );
}

export default BankDepositFrom;
