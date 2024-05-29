import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Scrollbars } from "react-custom-scrollbars";

function CountryListModel({
  countryData,
  setCountryModel,
  setSelectedCountry,
  countryModel,
  handleSelected,
}) {
  const [search, setSearch] = useState("");
  const [filterdata, setFilterData] = useState([]);

  useEffect(() => {
    if (search) {
      const filterData = countryData?.filter((el) =>
        el.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filterData);
    } else {
      setFilterData(countryData);
    }
  }, [search, countryData]);
  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
        <div className="bg-white dark:bg-[#ffffff] rounded-xl shadow-lg w-[20%] px-2">
          {/* modal header */}
          <div className="w-[90%] m-auto mt-2 flex items-center justify-between py-4 text-center text-gray-500">
            <p className="text-xl text-gray-700">Country / Region</p>
            <MdCancel
              onClick={() => setCountryModel(!countryModel)}
              className="text-3xl cursor-pointer text-gray-400"
            />
          </div>
          {/* modal body */}
          <div className="w-full relative px-4 mt-1">
            <input
              type="text"
              value={search}
              className="w-full px-10 py-2.5 text-black bg-[#ffffff] border border-gray-200 text-md rounded-md outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute top-3 left-8 text-lg text-gray-500" />
          </div>
          <Scrollbars
            className="w-full"
            style={{
              height: 350, // Set the desired height
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
                className="mx-4 my-2 flex gap-4 cursor-pointer items-center p-2 border border-gray-50 hover:border rounded-md hover:border-gray-200"
              >
                <img
                  src={el.flags.png}
                  className="w-7 h-7 rounded-full"
                  alt="logo"
                />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">{el.name.common}</p>
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
      </div>
    </>
  );
}

export default CountryListModel;
