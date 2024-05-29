import React from "react";

function BNBMarket() {
  return (
    <>
      <div className="mx-auto border-t border-gray-200 w-full max-w-screen-xl">
        <div className="flex gap-[15%] pt-20">
          <div className="w-[40%]">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex">
                  <img
                    src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh"
                    alt="img"
                    className="w-10 h-10"
                  />
                  <img
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk"
                    alt="img"
                    className="w-10 h-10"
                  />
                </div>
                <p className="mt-4 text-2xl">BNB/USD</p>
              </div>
              <div>
                <p className="text-xl text-green-500">+2.68% (1D)</p>{" "}
                <p className="text-2xl mt-4">$ 215.50</p>
              </div>
            </div>
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRE_43xTtkZHNZ14dIsS4KIqKISQ_o3GjdrIfKvtJoSOzd65-G7"
              className="w-full mt-10"
              alt="chartJs"
            />
          </div>
          <div className="w-[45%]">
            <p className="text-3xl mt-10">BNB Markets</p>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4 mt-5">
                <div className="flex gap-2 flex-col">
                  <p className="text-xl text-gray-600">Popularity</p>
                  <p className="text-2xl">#4</p>
                </div>
                <div className="flex gap-2 flex-col">
                  <p className="text-xl text-gray-600">Volume</p>
                  <p className="text-2xl">$332.58M</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <div className="flex gap-2 flex-col">
                  <p className="text-xl text-gray-600">Market Cap</p>
                  <p className="text-2xl">$32.69B</p>
                </div>
                <div className="flex gap-2 flex-col">
                  <p className="text-xl text-gray-600">Circulation Supply</p>
                  <p className="text-2xl">151.71M</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              BNB is experiencing a rise in value this week. Currently, BNB is
              priced at $215.50 per BNB, with a circulating supply of 151.71M
              BNB, resulting in a total market capitalisation of $32.69B. Over
              the past 24 hours, the trading volume for BNB has increased by
              $8.74B, representing a 26.2642% rise. Moreover, BNB worth $332.58M
              has been traded in the last day.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BNBMarket;
