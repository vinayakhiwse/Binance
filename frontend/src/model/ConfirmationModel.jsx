import React from "react";
import { PiWarningCircleFill } from "react-icons/pi";
function ConfirmationModel({
  confirModel,
  setConfirModel,
  setVerifyAccount,
  setAccountCreation,
}) {
  const handleConfirmation = () => {
    setConfirModel(false);
    setVerifyAccount(false);
    setAccountCreation(false);
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 z-20">
        <div className="flex flex-col gap-1 justify-center items-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-lg shadow-3xl w-[22%] py-6 px-8">
          <PiWarningCircleFill className="text-yellow-500 text-8xl" />
          <p className="text-center mt-5 text-gray-500">
            You're about to exit the Personal Verification process. Are you sure
            you want to exit?
          </p>
          <div className="w-full flex justify-between mt-6">
            <button
              className="w-[48%] bg-gray-200 py-2 px-4 rounded-sm text-sm"
              onClick={() => setConfirModel(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmation}
              className="w-[48%] bg-yellow-400 py-2 px-4 rounded-sm text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationModel;
