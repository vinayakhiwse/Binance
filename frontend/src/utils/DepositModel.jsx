import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Scrollbars } from "react-custom-scrollbars";

function DepositModel({
  open,
  setOpen,
  setSelected,
  currencyData,
  handleSelected,
}) {
  const [search, setSearch] = useState("");
  const [filterdata, setFilterData] = useState([]);

  useEffect(() => {
    if (search) {
      const filterData = currencyData?.filter(
        (el) =>
          el.name.toLowerCase().includes(search.toLowerCase()) ||
          el.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filterData);
    } else {
      setFilterData(currencyData);
    }
  }, [search, currencyData]);

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
        <div className="bg-white dark:bg-[#ffffff] rounded-xl shadow-lg w-[20%]">
          {/* modal header */}
          <div className="w-[90%] m-auto mt-2 flex items-center justify-between py-4 text-center text-gray-500">
            <p className="text-lg text-gray-700">Select Currency</p>
            <MdCancel
              onClick={() => setOpen(false)}
              className="text-3xl cursor-pointer text-gray-400"
            />
          </div>
          {/* modal body */}
          <div className="w-full relative px-4">
            <input
              type="text"
              value={search}
              className="w-full px-10 py-3 text-black bg-gray-200 text-md rounded-md outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute top-4 left-8 text-lg text-gray-500" />
          </div>
          <Scrollbars
            className="w-full"
            style={{
              height: 400, // Set the desired height
            }}
            autoHide
          >
            {filterdata.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqWz3Nvdd6XJUuRR4n0iv8ALgkZ-EVZF1ZQ&usqp=CAU"
                  alt="no-result"
                  className="w-24 h-24 mt-4"
                />
                <p className="text-center mt-3 text-lg text-gray-500">
                  No results
                </p>
              </div>
            )}
            {filterdata?.map((el, i) => (
              <div
                key={i}
                onClick={() => handleSelected(el)}
                className="mx-5 my-2 flex gap-4 cursor-pointer items-center p-3 border border-gray-50 hover:border rounded-md hover:border-gray-200"
              >
                <img
                  src={el.logo}
                  className="w-8 h-8 rounded-full"
                  alt="logo"
                />
                <div className="flex flex-col">
                  <p className="text-md text-gray-700">{el.symbol}</p>
                  <p className="text-xs text-gray-400">{el.name}</p>
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
      </div>
    </>
  );
}

export default DepositModel;
