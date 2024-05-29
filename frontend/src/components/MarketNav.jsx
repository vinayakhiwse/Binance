import React from "react";
import { AiFillStar } from "react-icons/ai";

function MarketNav({ setSearch, search }) {
  return (
    <>
      <nav className="bg-[#ffffff] border-gray-200 dark:bg-[#ffffff]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <div className="flex md:order-2">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-11/12 p-3 pl-10 text-sm text-gray-500 border outline-none border-gray-300 rounded-sm bg-[#ffffff] focus:ring-yellow-500 focus:border-yellow-500 dark:bg-[#ffffff] dark:border-gray-200 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                placeholder="Search Coin Name"
              />
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-[#ffffff] md:dark:bg-[#ffffff] dark:border-gray-700">
              <li className="flex items-center gap-1 py-2 pl-3 pr-4 text-sm text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 dark:text-gray-500 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                <AiFillStar className="text-xl" /> Favorites
              </li>
              <li className="block py-2 pl-3 pr-4 text-sm text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 dark:text-gray-500 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                All Cryptos
              </li>
              <li className="block py-2 pl-3 pr-4 text-sm text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 dark:text-gray-500 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Spot/Margin Markets
              </li>
              <li className="block py-2 pl-3 pr-4 text-sm text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 dark:text-gray-500 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Futures Markets
              </li>
              <li className="block py-2 pl-3 pr-4 text-sm text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 dark:text-gray-500 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                New Listing
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default MarketNav;
