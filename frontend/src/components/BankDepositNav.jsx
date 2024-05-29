import React from "react";
import { RiFileHistoryFill } from "react-icons/ri";
import { IoMdArrowForward } from "react-icons/io";
import { TbAlignBoxBottomCenterFilled } from "react-icons/tb";

function BankDepositNav() {
  return (
    <>
      <div className="w-full bg-gray-50">
        <div className="w-9/12 m-auto flex justify-between p-5">
          <div className="flex gap-4 items-center">
            <p className="text-2xl">Deposit Fiat</p>
            <button className="flex gap-1 items-center justify-center bg-gray-200 text-sm px-2.5 py-2.5 rounded-md">
              Deposit Crypto <IoMdArrowForward className="text-lg" />{" "}
            </button>
          </div>
          <div className="w-[20%] flex justify-evenly">
            <p className="flex text-sm items-center gap-1 text-gray-500 cursor-pointer">
              <TbAlignBoxBottomCenterFilled className="text-xl text-gray-600" />{" "}
              Fiat Center
            </p>
            <p className="flex text-sm items-center gap-1 text-gray-500 cursor-pointer">
              <RiFileHistoryFill className="text-xl text-gray-600" /> History
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BankDepositNav;
