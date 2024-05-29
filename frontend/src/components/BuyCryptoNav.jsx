import React from "react";
import { RiFileHistoryFill } from "react-icons/ri";
import { FaQuestionCircle } from "react-icons/fa";
import { TbAlignBoxBottomCenterFilled } from "react-icons/tb";

function BuyCryptoNav() {
  return (
    <>
      <div className="w-9/12 mt-2 m-auto flex justify-between p-5">
        <p className="w-[50%] text-3xl">Buy Crypto</p>
        <div className="w-[30%] flex justify-evenly">
          <p className="flex items-center gap-1 text-gray-500 cursor-pointer">
            <TbAlignBoxBottomCenterFilled className="text-2xl text-gray-600" />{" "}
            Fiat Center
          </p>
          <p className="flex items-center gap-1 text-gray-500 cursor-pointer">
            <RiFileHistoryFill className="text-2xl text-gray-600" /> History
          </p>
          <p className="flex items-center gap-1 text-gray-500 cursor-pointer">
            <FaQuestionCircle className="text-2xl text-gray-600" /> FAQ
          </p>
        </div>
      </div>
    </>
  );
}

export default BuyCryptoNav;
