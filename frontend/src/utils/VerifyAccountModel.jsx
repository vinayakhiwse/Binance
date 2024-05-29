import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import AccountCreatedModel from "./AccountCreatedModel";

function VerifyAccountModel({ verifyAccount, setVerifyAccount }) {
  const [accountCreation, setAccountCreation] = useState(false);

  const handleModel = () => {
    setAccountCreation(!accountCreation);
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40 z-20">
        <div className="flex flex-col gap-1 justify-center items-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-xl shadow-3xl w-[20%] p-5">
          <div className="ml-auto cursor-pointer">
            <MdCancel
              onClick={() => setVerifyAccount(!verifyAccount)}
              className="text-xl text-gray-500"
            />
          </div>
          <img
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbxs2gSeaOi5Kcd-RD8bgzEdqfxHDXldUpTxFan1Ls4pisvLAN"
            alt="logo"
            className="w-[100px]"
          />
          <p className="text-lg mt-2"> Verify Account</p>

          <p className="text-center text-sm text-gray-500">
            Complete verification to continue with the transaction method.
          </p>
          <button
            onClick={handleModel}
            className="w-full bg-yellow-400 py-4 px-4 mt-4 rounded-md"
          >
            Start Now
          </button>
        </div>
      </div>
      {accountCreation && (
        <AccountCreatedModel
          accountCreation={accountCreation}
          setAccountCreation={setAccountCreation}
          setVerifyAccount={setVerifyAccount}
        />
      )}
    </>
  );
}

export default VerifyAccountModel;
