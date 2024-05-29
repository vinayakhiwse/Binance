import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Scrollbars } from "react-custom-scrollbars";

function TokenModel({
  setShowModel,
  currencyKeys,
  show,
  tokenArray,
  setNewSelected,
}) {
  const [search, setSearch] = useState("");
  const [filterdata, setFilterData] = useState([]);

  const handleSelected = (object) => {
    setNewSelected(object);
    setShowModel(false);
  };

  useEffect(() => {
    if (search) {
      const filterData = currencyKeys?.filter((el) =>
        el.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filterData);
    } else {
      setFilterData(currencyKeys);
    }
  }, [search, currencyKeys]);

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
        {/* Modal */}
        <div className="bg-white dark:bg-[#ffffff] rounded-xl shadow-lg w-[20%]">
          {/* modal header */}
          <div className="w-full flex items-center justify-between py-4 pr-4 text-center text-gray-500">
            <div className="w-full relative">
              <input
                type="text"
                value={search}
                className="w-10/12 px-10 py-2 text-black bg-gray-200 text-md rounded-3xl outline-none"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch className="absolute top-3 left-10 text-lg text-gray-500" />
            </div>
            <MdCancel
              onClick={() => setShowModel(!show)}
              className="text-3xl cursor-pointer text-gray-400"
            />
          </div>
          {/* modal body */}
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
                onClick={() =>
                  handleSelected({
                    currencyName: el,
                    imageUrl: tokenArray[el]
                      ? tokenArray[el]
                      : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQiTVS8KzlChtoGh4qLpg-7NKsTdOqjrf_CgwWUiOeN5E6sRx8u",
                  })
                }
                className="mx-5 my-2 flex gap-4 cursor-pointer items-center p-3 hover:border rounded-md hover:border-gray-200"
              >
                <img
                  src={
                    tokenArray[el]
                      ? tokenArray[el]
                      : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQiTVS8KzlChtoGh4qLpg-7NKsTdOqjrf_CgwWUiOeN5E6sRx8u"
                  }
                  className="w-6 h-6 rounded-full"
                  alt="logo"
                />
                <p className="text-md text-gray-700">{el}</p>
              </div>
            ))}
          </Scrollbars>
        </div>
      </div>
    </>
  );
}

export default TokenModel;
