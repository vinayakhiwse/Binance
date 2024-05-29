import React from "react";
import img1 from "../assets/bitcoin.png";
import img2 from "../assets/btc.png";
import img3 from "../assets/eth.png";
import trading from "../assets/trading.png";

const data = [
  { logo: img1, coin: "BNB", price: "209.01", change: "-1.25" },
  { logo: img2, coin: "BTC", price: "28.01", change: "+0.25" },
  { logo: img3, coin: "ETH", price: "1.01", change: "-1.35" },
];
const data1 = [
  { logo: img2, coin: "BTC", price: "28.01", change: "+0.25" },
  { logo: img3, coin: "ETH", price: "1.01", change: "-1.35" },
  { logo: img1, coin: "BNB", price: "209.01", change: "-1.25" },
];

const data2 = [
  { logo: img2, coin: "BTC", price: "28.01", change: "+0.25" },
  { logo: img1, coin: "BNB", price: "209.01", change: "-1.25" },
  { logo: img3, coin: "ETH", price: "1.01", change: "-1.35" },
];

function MarketOverView() {
  return (
    <>
      <div className="bg-gray-100 pt-10 pb-20">
        <div className="flex justify-between w-[70%] m-auto">
          <div>
            <p className="text-3xl">Markets Overview</p>
            <p className="text-sm mt-2 text-gray-500">
              All price information is in{" "}
              <span className="text-lg text-gray-800">USD</span>{" "}
            </p>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <img src={trading} className="w-8 h-8" alt="trading" /> Trading Data
          </div>
        </div>
        <div className="flex mt-10 gap-5 flex-wrap justify-between w-[70%] m-auto">
          <div className="w-[22%] hover:bg-[#ffffff] p-4 rounded-lg">
            <p className="text-xs ml-1 mb-4 text-gray-500">Highlight Coin</p>
            {data?.map((el,i) => (
              <div key={i} className="flex items-center mt-1 p-1 gap-3 cursor-pointer hover:bg-gray-50">
                <p className="w-[45%] flex items-center gap-3">
                  <img src={el.logo} className="w-6 h-6" alt="logo" /> {el.coin}
                </p>
                <p className="w-[35%] text-sm text-left">${el.price}</p>
                <p
                  className={
                    el.change.includes("-")
                      ? "text-red-500 w-[20%] text-sm"
                      : "text-green-500 w-[20%] text-sm"
                  }
                >
                  {el.change}%
                </p>
              </div>
            ))}
          </div>
          <div className="w-[22%] hover:bg-[#ffffff] p-4 rounded-lg">
            <p className="text-xs ml-1 mb-4 text-gray-500">New Listing</p>
            {data1?.map((el,i) => (
              <div key={i} className="flex items-center mt-1 p-1 gap-3 cursor-pointer hover:bg-gray-50">
                <p className="w-[45%] flex items-center gap-3">
                  <img src={el.logo} className="w-6 h-6" alt="logo" /> {el.coin}
                </p>
                <p className="w-[35%] text-sm text-left">${el.price}</p>
                <p
                  className={
                    el.change.includes("-")
                      ? "text-red-500 w-[20%] text-sm"
                      : "text-green-500 w-[20%] text-sm"
                  }
                >
                  {el.change}%
                </p>
              </div>
            ))}
          </div>
          <div className="w-[22%] hover:bg-[#ffffff] p-4 rounded-lg">
            <p className="text-xs ml-1 mb-4 text-gray-500">Top Gainer Coin</p>
            {data?.map((el, i) => (
              <div
                key={i}
                className="flex items-center mt-1 p-1 gap-3 cursor-pointer hover:bg-gray-50"
              >
                <p className="w-[45%] flex items-center gap-3">
                  <img src={el.logo} className="w-6 h-6" alt="logo" /> {el.coin}
                </p>
                <p className="w-[35%] text-sm text-left">${el.price}</p>
                <p
                  className={
                    el.change.includes("-")
                      ? "text-red-500 w-[20%] text-sm"
                      : "text-green-500 w-[20%] text-sm"
                  }
                >
                  {el.change}%
                </p>
              </div>
            ))}
          </div>
          <div className="w-[22%] hover:bg-[#ffffff] p-4 rounded-lg">
            <p className="text-xs ml-1 mb-4 text-gray-500">Top Volume Coin</p>
            {data2?.map((el,i) => (
              <div key={i} className="flex items-center mt-1 p-1 gap-3 cursor-pointer hover:bg-gray-50">
                <p className="w-[45%] flex items-center gap-3">
                  <img src={el.logo} className="w-6 h-6" alt="logo" /> {el.coin}
                </p>
                <p className="w-[35%] text-sm text-left">${el.price}</p>
                <p
                  className={
                    el.change.includes("-")
                      ? "text-red-500 w-[20%] text-sm"
                      : "text-green-500 w-[20%] text-sm"
                  }
                >
                  {el.change}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketOverView;
