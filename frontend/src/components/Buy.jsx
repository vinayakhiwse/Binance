import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
function Buy({
  newSelected,
  show,
  setShowModel,
  setTokenModel,
  tokenmodal,
  tokenSelected,
}) {
  return (
    <>
      <div className="relative mt-5 border-transparent rounded-xl hover:border hover:border-yellow-400 border border-1 border-gray-100">
        <input
          placeholder={"15.00-20000.00"}
          type="text"
          className="w-full border-none text-gray-800 bg-white  dark:bg-gray-100 text-2xl border-2 border-grey-500 py-10 px-6 rounded-xl focus:outline-none"
        />
        <p className="absolute top-3 left-6 text-gray-800 text-sm">Spend</p>
        <button
          onClick={() => setShowModel(!show)}
          className="flex justify-center items-center gap-1 absolute text-black top-[30%] right-4  bg-[#ffffff] dark:bg-[#ffffff] font-medium rounded-3xl text-lg px-4 py-2 text-center mr-3 md:mr-0"
        >
          <img
            src={newSelected.imageUrl}
            className="w-7 h-7 rounded-full"
            alt="logo"
          />
          <p className="ml-1">{newSelected.currencyName}</p>
          <MdKeyboardArrowRight className="text-black ml-3" />
        </button>
      </div>
      <div className="relative border-transparent rounded-xl hover:border hover:border-yellow-400  border border-1 border-gray-100">
        <input
          placeholder={"0.00"}
          type="text"
          className="w-full border-none text-gray-800 bg-white dark:bg-gray-100 text-2xl border-2 border-grey-500 py-10 px-6 rounded-xl focus:outline-none"
        />
        <p className="absolute top-3 left-6 text-gray-800 text-sm">Receive</p>
        <button
          onClick={() => setTokenModel(!tokenmodal)}
          className="flex justify-center items-center gap-1 absolute text-black top-[30%] right-4 bg-[#ffffff] dark:bg-[#ffffff] font-medium rounded-3xl text-lg px-4 py-2 text-center mr-3 md:mr-0"
        >
          <img
            src={tokenSelected.img}
            className="w-7 h-7 rounded-full"
            alt="logo"
          />
          <p className="ml-1">{tokenSelected.token}</p>
          <MdKeyboardArrowRight className="text-black ml-3" />
        </button>
      </div>
      <button className="bg-yellow-400 p-2 rounded-md mt-20 text-lg text-gray-800">
        Verify & Buy
      </button>
      <button className="text-md">Recurring Buy</button>
    </>
  );
}

export default Buy;
