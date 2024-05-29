import React from "react";
import { useNavigate } from "react-router-dom";

function VerifiedModel({
  setAccountCreated,
  setPersonalModel,
  setBinanceModel,
  setIsOpen,
  setAccountCreation,
  setVerifyAccount,
}) {
  const navigate = useNavigate();

  const handleConfirmation = () => {
    setAccountCreated(false);
    setPersonalModel(false);
    setBinanceModel(false);
    setIsOpen(false);
    setAccountCreation(false);
    setVerifyAccount(false);
    navigate("/bank/deposit");
    return;
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 z-20">
        <div className="flex flex-col gap-1 justify-center items-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-lg shadow-3xl w-[22%] py-8 px-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1024px-Binance_Logo.svg.png"
            alt="logo"
            className="w-16 h-16"
          />
          <p className="px-3 text-center mt-5 text-lg text-gray-800">
            Congratulations! Your account has been created successfully.
          </p>
          <p className="px-2 text-center mt-1 text-sm text-gray-500">
            Welcome to Binance App. We're excited to have you on board!
          </p>

          <div className="w-full flex justify-center mt-6">
            <button
              onClick={handleConfirmation}
              className="w-[90%] bg-yellow-400 py-2 px-4 outline-none rounded-sm text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifiedModel;
