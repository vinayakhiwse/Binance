import React, { useState } from "react";
import { MdCancel, MdPermIdentity } from "react-icons/md";
import { PiIdentificationCardThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import StepOneModel from "../model/StepOneModel";


function AccountCreatedModel({
  accountCreation,
  setAccountCreation,
  setVerifyAccount,
}) {
  const [isOpen, setIsOpen] = useState(false);
  //const [binanceModelOpen, setBinanceModelOpen] = useState(false);

  const handleModel = () => {
    setVerifyAccount(false);
    setAccountCreation(!accountCreation);
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 z-20">
        <div className="flex flex-col gap-1 justify-center items-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-xl shadow-3xl w-[20%] p-5">
          <div className="ml-auto cursor-pointer">
            <MdCancel
              onClick={() => handleModel(!accountCreation)}
              className="text-xl text-gray-500"
            />
          </div>
          <img
            src="data:image/jpeg;base64,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"
            alt="logo"
            className="w-[100px] rounded-full"
          />
          <p className="text-lg mt-2"> Verify Account</p>
          <p className="mt-5 text-sm text-gray-500">Required Documents:</p>
          <div className="border-b border-gray-100 text-center pt-2 pb-6">
            <p className="flex gap-1 items-center justify-center text-md text-yellow-600">
              <PiIdentificationCardThin className="text-yellow-600 text-lg" />{" "}
              Government Issued Documentation
            </p>
            <p className="flex gap-1 items-center justify-center text-md text-yellow-600 mt-2">
              <MdPermIdentity className="text-yellow-600 text-lg" /> Facial
              Verification
            </p>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Account limit will increase to:
          </p>
          <p className="text-sm text-gray-600 mt-1">
            47.1K EUR <span className="text-xs text-gray-600">Daily</span>{" "}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Review takes up to 13 days
          </p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-yellow-400 py-4 px-4 mt-4 rounded-md"
          >
            Verify Now
          </button>
          <p className="text-xs mt-1">
            Learn more in{" "}
            <Link to={"/"} className="text-yellow-500">
              Verification Center
            </Link>{" "}
          </p>
        </div>
      </div>

      {isOpen && (
        <StepOneModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setVerifyAccount={setVerifyAccount}
          setAccountCreation={setAccountCreation}
        
        />
      )}
    </>
  );
}

export default AccountCreatedModel;
