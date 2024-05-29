import React, { useState } from "react";
import scan from "../assets/download.png";
import PersonalInformModel from "./PersonalInformModel";

function BinanceModel({ setBinanceModel, setIsOpen,setAccountCreation,setVerifyAccount }) {
  const [personalModel, setPersonalModel] = useState(false);

  const handleModel = () => {
    setPersonalModel(true);
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 z-20">
        <div className="flex gap-1 justify-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-lg shadow-3xl w-[38%]">
          <div>
            <img
              src="data:image/jpeg;base64,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"
              alt="logo"
            />
          </div>
          <div className="w-[80%] flex flex-col gap-3.5 justify-center text-center p-8">
            <p className="text-4xl">Get Binance App</p>
            <p className="w-[80%] text-center m-auto text-gray-500">
              Scan the QR code to download the app and finish account
              verification.
            </p>
            <div className="flex justify-center">
              <img src={scan} alt="scanner" className="w-[150px]" />
            </div>
            <p className="text-gray-500">Secure, fast, and easy</p>
            <p className="text-gray-500">OR</p>
            <div className="w-full flex justify-center">
              <button
                onClick={handleModel}
                className="w-[75%] bg-gray-200 py-3 px-4 rounded-sm text-sm hover:bg-gray-100"
              >
                Continue Here
              </button>
            </div>
          </div>
        </div>
      </div>
      {personalModel && (
        <PersonalInformModel
          setBinanceModel={setBinanceModel}
          setPersonalModel={setPersonalModel}
          setIsOpen={setIsOpen}
          setAccountCreation={setAccountCreation}
          setVerifyAccount={setVerifyAccount}
        />
      )}
    </>
  );
}

export default BinanceModel;
