import React from "react";
import { MdSecurity } from "react-icons/md";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { FcManager } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Modal({ setPasswordModel, passwordmodel }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
        {/* Modal */}
        <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-xl shadow-3xl w-[22%] p-5">
          {/* modal header */}
          <div className="w-1/2 m-auto flex items-center justify-center relative">
            <MdSecurity className="text-8xl text-gray-500" />
            <BsFillExclamationCircleFill className="text-yellow-400 text-3xl absolute top-16 right-11 z-50" />
          </div>
          <div className="px-4 py-3 text-center text-white">
            <h3 className="text-xl font-md mb-3 text-gray-800">
              Reset Password
            </h3>
            <div className="w-8/12 flex items-center justify-around m-auto text-sm font-md mb-3 text-gray-600">
              <FcManager className="text-3xl" /> vinayak***@gmail.com
            </div>
          </div>
          <div className="text-center text-sm w-[92%] m-auto text-gray-500">
            In order to protect your account, withdrawals, P2P selling, payment
            services, and Binance Card applications will be disabled for 24
            hours after you change your password.
          </div>
          {/* modal body */}
          <div className="flex justify-evenly items-center w-full py-3 mt-4">
            <button
              onClick={() => setPasswordModel(!passwordmodel)}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-md text-md text-gray-800 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate("/login/forget/password")}
              className="w-1/2 bg-yellow-400 hover:bg-yellow-500 px-5 py-2 text-md rounded-md text-gray-800 mr-1"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
