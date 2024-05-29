import React, { useEffect } from "react";
import { MdCancel, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function SideBar({ openSideBar, setOpenSideBar }) {
  useEffect(() => {
    if (openSideBar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openSideBar]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-40 w-[28%] h-screen bg-[#ffffff] p-4 overflow-y-auto transform ${
          openSideBar
            ? "translate-x-0 transition-transform duration-800 ease-in-out"
            : "translate-x-full transition-transform duration-800 ease-in-out"
        }`}
      >
        <div className="w-11/12 m-auto flex justify-between items-center pt-8">
          <p className="text-2xl text-gray-700">Fund Your Wallet</p>
          <MdCancel
            onClick={() => setOpenSideBar(!openSideBar)}
            className="text-3xl cursor-pointer text-gray-400"
          />
        </div>
        <div className="w-11/12 m-auto pt-8">
          <p className="text-md text-gray-600"> I have crypto assets</p>
          <Link to={"/deposit/crypto"} onClick={() => setOpenSideBar(false)}>
            <div className="flex mt-6 gap-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHQrZRxRmw3OyySYm-EvOtWnElQ2hlQKByqA&usqp=CAU"
                alt="logo"
                className="w-12 h-12"
              />
              <div>
                <p>Deposit Crypto</p>
                <p className="w-[95%] text-sm text-gray-500 mt-1">
                  Get the deposit address for BTC, ETH, or any other crypto and
                  deposit via the blockchain.
                </p>
              </div>
              <MdKeyboardArrowRight className="text-5xl text-gray-500" />
            </div>
          </Link>
        </div>
        <div className="w-11/12 m-auto pt-8">
          <p className="text-md text-gray-600 mt-8">
            I don't have crypto assets
          </p>
          <Link to={"/buycrypto"} onClick={() => setOpenSideBar(false)}>
            <div className="flex mt-8 gap-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrLt_mB4ZLIWIwnTzaS3h3ZRFkymDwaNtb2DPA73KICzgrI1Z9x4F62-NK63vvKWLSYQ&usqp=CAU"
                alt="logo"
                className="w-12 h-12"
              />
              <div>
                <p>Buy Crypto</p>
                <p className="w-[95%] text-sm text-gray-500 mt-1">
                  Buy crypto directly with cash, hassle-free and suggested for
                  new users.
                </p>
              </div>
              <MdKeyboardArrowRight className="text-4xl text-gray-500" />
            </div>
          </Link>
        </div>
        <div className="w-11/12 m-auto">
          <Link to={"/bank/deposit"} onClick={() => setOpenSideBar(false)}>
            <div className="flex mt-10 gap-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSozOs5Ba3STjI1kTd1qUr5-VHVuz9k_amjt2inXq24AfmekAsNktAJylIgu8rGr_1SJtU&usqp=CAU"
                alt="logo"
                className="w-12 h-12"
              />
              <div>
                <p>Bank Deposit</p>
                <p className="w-[95%] text-sm text-gray-500 mt-1">
                  Deposit money (EUR, etc.) from your bank account, and buy
                  crypto with cash balance later.
                </p>
              </div>
              <MdKeyboardArrowRight className="text-5xl text-gray-500" />
            </div>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {openSideBar && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50"
          onClick={() => setOpenSideBar(false)}
        ></div>
      )}
    </>
  );
}

export default SideBar;
