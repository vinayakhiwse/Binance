import React, { useEffect, useState } from "react";

import { DisplayList } from "../utils/DisplayList";
import Pagination from "../components/Pagination";
import SpotTrading from "../components/SpotTrading";
import MarketNav from "../components/MarketNav";
import MarketOverView from "../components/MarketOverView";
import axios from "axios";

function Markets() {
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortChange, setSortChange] = useState("desc");
  const [sortVolume, setSortVolume] = useState("desc");
  const [sortMarketCap, setSortMarketCap] = useState("desc");

  const getMarketData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/crypto//");
      setData(res.data.data);
    } catch (error) {
      console.log("error in market data.", error);
    }
  };

  useEffect(() => {
    getMarketData();
  }, []);

  const handleVolumeSort = () => {
    const sortedData = data.sort((a, b) => {
      const PriceA = a.quote && a.quote.USD ? a.quote.USD.volume_24h : 0;
      const PriceB = b.quote && b.quote.USD ? b.quote.USD.volume_24h : 0;

      if (sortVolume === "asc") {
        return PriceA - PriceB;
      } else {
        return PriceB - PriceA;
      }
    });
    setFilterList(sortedData);
    setSortVolume(sortVolume === "asc" ? "desc" : "asc");
  };

  const handleMarketCapSort = () => {
    const sortedData = data.sort((a, b) => {
      const PriceA = a.quote && a.quote.USD ? a.quote.USD.market_cap : 0;
      const PriceB = b.quote && b.quote.USD ? b.quote.USD.market_cap : 0;

      if (sortMarketCap === "asc") {
        return PriceA - PriceB;
      } else {
        return PriceB - PriceA;
      }
    });
    setFilterList(sortedData);
    setSortMarketCap(sortMarketCap === "asc" ? "desc" : "asc");
  };

  const handleChangeSort = () => {
    const sortedData = data.sort((a, b) => {
      const PriceA =
        a.quote && a.quote.USD ? a.quote.USD.percent_change_24h : 0;
      const PriceB =
        b.quote && b.quote.USD ? b.quote.USD.percent_change_24h : 0;

      if (sortChange === "asc") {
        return PriceA - PriceB;
      } else {
        return PriceB - PriceA;
      }
    });
    setFilterList(sortedData);
    setSortChange(sortChange === "asc" ? "desc" : "asc");
  };

  const handleSortingPrice = () => {
    const sortedData = data.sort((a, b) => {
      const PriceA = a.quote && a.quote.USD ? a.quote.USD.price : 0;
      const PriceB = b.quote && b.quote.USD ? b.quote.USD.price : 0;

      if (sortOrder === "asc") {
        return PriceA - PriceB;
      } else {
        return PriceB - PriceA;
      }
    });
    setFilterList(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    if (search) {
      const filterData = data?.filter(
        (el) =>
          el.name.toLowerCase().includes(search.toLowerCase()) ||
          el.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setFilterList(filterData);
    } else {
      setFilterList(data);
    }
  }, [search, data, sortOrder, sortChange, sortVolume, sortMarketCap]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filterList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <MarketOverView />
      <div className="relative overflow-x-auto w-[70%] m-auto sm:rounded-lg mt-12">
        <MarketNav setSearch={setSearch} search={search} />
        <p className="text-xl mt-8">Top Tokens by Market Capitalization</p>{" "}
        <br />
        <div className="text-sm font-normal text-gray-500">
          Get a comprehensive snapshot of all cryptocurrencies available on
          Binance. This page displays the latest prices, 24-hour trading volume,
          price changes, and market capitalizations for all cryptocurrencies on
          Binance. Users can quickly access key information about these digital
          assets and access the trade page from here.
        </div>
        <br />
        <div className="text-sm font-normal text-gray-500">
          The data presented is for informational purposes only. Some data is
          provided by CoinMarketCap and is shown on an “as is” basis, without
          representation or warranty of any kind. Please view our General Risk
          Warning for more information.
        </div>{" "}
        <br />
        <DisplayList
          currentItems={currentItems}
          handleSortingPrice={handleSortingPrice}
          handleChangeSort={handleChangeSort}
          handleVolumeSort={handleVolumeSort}
          handleMarketCapSort={handleMarketCapSort}
        />
        <div className="flex items-center justify-end mt-4">
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      </div>
      <SpotTrading />
    </>
  );
}

export default Markets;
