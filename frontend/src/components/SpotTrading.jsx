import React from "react";
import { Link } from "react-router-dom";
import { RiUserFollowFill } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import graph from "../assets/g2.webp";
const array = [{}, {}, {}];

function SpotTrading() {
  return (
    <>
      <div className="w-[70%] m-auto mt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Spot Trading Bots</h1>
          <p className="flex items-center text-gray-400">
            More <MdKeyboardArrowRight className="text-2xl" />
          </p>
        </div>
        <div className="flex justify-between mt-6">
          {array?.map((el, i) => (
            <div
              key={i}
              className="w-full pt-6 max-w-sm bg-[#ffffff] rounded-md dark:bg-gray-50 dark:border-gray-100"
            >
              <div className="px-5 pb-5">
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-2xl font-extralight tracking-tight text-gray-900 dark:text-gray">
                      BLZ/USDT
                    </h5>
                    <button className="text-gray-800 mt-2 text-xs bg-gray-200 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-normal rounded-lg px-1 py-0.5 text-center dark:bg-gray-200 dark:hover:bg-gray-100 dark:focus:ring-gray-200">
                      Spot Grid
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-2.5 mb-5">
                    <RiUserFollowFill className="text-gray-400 text-2xl" />{" "}
                    <p className="text-sm text-gray-400">40</p>
                  </div>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <div>
                    <p>ROI</p>
                    <p className="text-2xl font-medium text-green-500">
                      17.50%
                    </p>
                  </div>
                  <div>
                    <img src={graph} className="w-44 h-18" alt="chart-js" />
                  </div>
                </div>
                <div className="flex mt-4 items-end justify-end">
                  <Link
                    href="#"
                    className="text-gray-800 bg-gray-200 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-200 dark:hover:bg-gray-100 dark:focus:ring-gray-200"
                  >
                    Create
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SpotTrading;
