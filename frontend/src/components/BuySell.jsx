import React, { useEffect, useState } from "react";
import { GiWallet } from "react-icons/gi";
import { AiFillIdcard } from "react-icons/ai";
import { FcManager } from "react-icons/fc";
import TokenModel from "../utils/TokenModel";
import Sell from "./Sell";
import Buy from "./Buy";
import axios from "axios";
import CurrencyModel from "../utils/CurrencyModel";

const tokenArray = {
  AED: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeMfj6x9DgjtinaZP2nroKNXkPC4ajygil-bForJdehBm92uHL",
  AFN: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThZ2kZ_xWjvscy6hGkxDBj01BY4HfzGDH_9YrCNl14OI8H3ppF",
  AMD: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb61iIVS0NyCmF-5NdWyg20qvhPz0c0u5wfVCPQz7CH_FWVQoC",
  ARS: "https://t0.gstatic.com/images?q=tbn:ANd9GcRJyfockAN3CUpF1UgLAxrWRbEjNNlj0X_wJlRMQrzFfljtU65M",
  AUD: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTvLUQJiabFIS2Uf9xJyV5EkqSBhBK4l88YQ7aEnqM58AhHDJ7a",
  AZN: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yIe7njdOf2azh4SPiznWwMFGZZk4_kdSewIpml4rlTICXmhl",
  BGN: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ludlFJF3yReTIasqTiRvJ8o0YslXSBWfEeWTwJL2eQORVuqx",
  BHD: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQfjes8DLfo97VoLTHtbhF3oICy8WRt5c2vNO1Q0FaBLKZM3d2z",
  BOB: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQNWaMWtPksQcmt3WSm4femjYuvefE-cBWbbfCFq70C_EFfKsty",
  INR: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR8IgToGdpIY4Zog8Oh3oLh_ymo2NsZHgMgtmxtV8_QvTL_tDKQ",
  KZT: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ5pY2kE0TVsjOslQD0ClPX1Y2J8qGZX1qMWyaUOQXfnCXSIEzw",
};

function BuySell() {
  const [check, setCheck] = useState(false);
  const [show, setShowModel] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tokenData, SetTokenData] = useState([]);
  const [tokenmodal, setTokenModel] = useState(false);
  const [tokenSelected, setTokenSelected] = useState({
    token: "BTC",
    Price: "34,468.02",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_ig-efygIy7gV4GjjwXjsdg-nwKQA3G817o9kJK2TKgPudOPj",
  });
  const [newSelected, setNewSelected] = useState({
    currencyName: "INR",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR8IgToGdpIY4Zog8Oh3oLh_ymo2NsZHgMgtmxtV8_QvTL_tDKQ",
  });

  const getCurrencyList = async () => {
    try {
      const response = await fetch(
        "http://api.exchangeratesapi.io/v1/latest?access_key=365e9e828a6a81bbe4de821f932f5eb5"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSelected(data.rates);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getMarketData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/crypto//");
      SetTokenData(res.data.data);
    } catch (error) {
      console.log("error in market data.", error);
    }
  };

  useEffect(() => {
    //getCurrencyList();
    getMarketData();
  }, []);

  const currencyKeys = Object.keys(selected);

  return (
    <>
      <div className="flex w-8/12 justify-center gap-8 py-12 px-10 m-auto">
        <div className="w-[45%] py-24 px-3">
          <p className="w-[80%] text-4xl leading-12 font-extralight">
            {check ? "Sell" : "Buy"} Crypto in a Few, Easy Steps
          </p>
          <p className="w-[85%] mt-6 text-gray-500 leading-8">
            With various payment methods available, you're sure to find one that
            works for you.
          </p>

          {check ? null : (
            <div className="w-10/12 flex mt-20 justify-between">
              <p className="flex flex-col items-center">
                <FcManager className="text-4xl text-yellow-500" /> Sign Up
              </p>
              <p className="flex flex-col items-center">
                <AiFillIdcard className="text-4xl text-yellow-500" /> Verify
                Account
              </p>
              <p className="flex flex-col items-center">
                <GiWallet className="text-4xl text-yellow-500" />
                Buy Crypto
              </p>
            </div>
          )}
        </div>
        <div className="w-[45%] flex flex-col gap-3">
          <div className="w-full">
            <button
              className={`${
                check
                  ? "w-1/2 border-b-4 text-xl text-gray-500 py-2 border-gray-100"
                  : "w-1/2 border-b-4 text-xl text-gray-500 py-2 border-yellow-500"
              }`}
              onClick={() => setCheck(false)}
            >
              Buy
            </button>
            <button
              className={`${
                check
                  ? "w-1/2 text-xl text-gray-500 py-2 border-b-4 border-yellow-500"
                  : "w-1/2 text-xl py-2 text-gray-500 border-b-4 border-gray-100"
              }`}
              onClick={() => setCheck(true)}
            >
              Sell
            </button>
          </div>
          {check ? (
            <Sell
              newSelected={newSelected}
              show={show}
              setShowModel={setShowModel}
            />
          ) : (
            <Buy
              newSelected={newSelected}
              show={show}
              setShowModel={setShowModel}
              setTokenModel={setTokenModel}
              tokenmodal={tokenmodal}
              tokenSelected={tokenSelected}
            />
          )}
        </div>
      </div>
      {show && (
        <TokenModel
          setShowModel={setShowModel}
          show={show}
          currencyKeys={currencyKeys}
          tokenArray={tokenArray}
          setNewSelected={setNewSelected}
        />
      )}
      {tokenmodal && (
        <CurrencyModel
          setTokenSelected={setTokenSelected}
          setTokenModel={setTokenModel}
          tokenData={tokenData}
          tokenmodal={tokenmodal}
        />
      )}
    </>
  );
}

export default BuySell;
