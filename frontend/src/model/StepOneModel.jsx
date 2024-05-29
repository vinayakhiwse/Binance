import React, { useEffect, useState } from "react";
import { MdCancel, MdSlowMotionVideo } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMiniIdentification } from "react-icons/hi2";
import { PiIdentificationBadgeLight } from "react-icons/pi";
import { FcManager } from "react-icons/fc";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import CountryListModel from "./CountryListModel";
import axios from "axios";
import ConfirmationModel from "./ConfirmationModel";
import BinanceModel from "./BinanceModel";
import { useDispatch } from "react-redux";
import { countryAuth } from "../redux/slice/countryAuth";

function StepOneModel({ setVerifyAccount, setAccountCreation, setIsOpen }) {
  const [countryModel, setCountryModel] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [confirModel, setConfirModel] = useState(false);
  const [binanceModel, setBinanceModel] = useState(false);
  const dispatch = useDispatch();

  const getCountryList = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/all`);
      setCountryData(res.data);
      setSelectedCountry({
        name: res.data[0].name.common,
        flags: res.data[0].flags.png,
      });
    } catch (error) {
      console.log("error in countryList", error);
    }
  };

  useEffect(() => {
    getCountryList();
  }, []);

  const handleModel = () => {
    dispatch(countryAuth(selectedCountry));
    setBinanceModel(true);
  };

  const handleSelected = (object) => {
    setSelectedCountry({ name: object.name.common, flags: object.flags.png });
    setCountryModel(false);
  };

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-40 z-20">
        <div className="flex flex-col gap-1 justify-center items-center bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 rounded-xl shadow-3xl w-[31%] py-5 px-7">
          <div className="w-[90%] m-auto text-left">
            <div className="ml-auto cursor-pointer">
              <MdCancel
                onClick={() => setConfirModel(!confirModel)}
                className="text-2xl text-gray-500 ml-auto"
              />
            </div>
            <p className="text-2xl mt-2 text-left">Let’s get you verified</p>
            <p className="mt-4 text-md text-gray-500">
              Select your residency and follow the steps
            </p>
            <p className="mt-6 text-gray-700">Residency</p>
            <div
              onClick={() => setCountryModel(true)}
              className="w-[100%] flex items-center justify-between border border-gray-300 p-2 mt-1 cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={selectedCountry?.flags}
                  alt="currency"
                  className="w-8 h-8 rounded-full"
                />{" "}
                <p className="ml-2 text-md">{selectedCountry?.name}</p>
              </div>
              <IoMdArrowDropdown />
            </div>
            <p className="text-md text-gray-500 mt-5">
              Complete the following steps to verify your account in{" "}
              <span className="text-gray-900">7 minutes</span>
            </p>

            <div className="flex flex-col gap-6 mt-6">
              <p className="flex gap-2 text-sm items-center text-gray-500">
                <HiMiniIdentification className="text-lg text-gray-500" />{" "}
                Personal information
              </p>
              <p className="flex gap-2 text-sm items-center text-gray-500">
                <PiIdentificationBadgeLight className="text-lg text-gray-500" />{" "}
                Government-issued ID
              </p>
              <p className="flex gap-2 text-sm items-center text-gray-500">
                <FcManager className="text-lg text-gray-500" /> Liveness check
              </p>
              <p className="flex gap-2 text-sm items-center text-gray-500">
                <RiQuestionnaireFill className="text-lg text-gray-500" />{" "}
                Questionnaire
              </p>
              <p className="flex gap-2 text-sm items-center text-gray-500">
                <FaLocationDot className="text-lg text-gray-500" />
                Proof of address
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-md">Guidance</p>
              <p className="flex gap-2 text-sm items-center text-gray-500 mt-3 underline cursor-pointer">
                <MdSlowMotionVideo className="text-lg text-gray-500" /> How to
                verify my identity
              </p>
            </div>

            <button
              onClick={handleModel}
              className="w-full bg-yellow-400 py-2 px-4 mt-14 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {binanceModel && (
        <BinanceModel
          binanceModel={binanceModel}
          setBinanceModel={setBinanceModel}
          setAccountCreation={setAccountCreation}
          setIsOpen={setIsOpen}
          setVerifyAccount={setVerifyAccount}
          //setBinanceModelOpen={setBinanceModelOpen}
        />
      )}

      {countryModel && (
        <CountryListModel
          countryModel={countryModel}
          countryData={countryData}
          setCountryModel={setCountryModel}
          setSelectedCountry={setSelectedCountry}
          handleSelected={handleSelected}
        />
      )}

      {confirModel && (
        <ConfirmationModel
          confirModel={confirModel}
          setConfirModel={setConfirModel}
          setVerifyAccount={setVerifyAccount}
          setAccountCreation={setAccountCreation}
        />
      )}
    </>
  );
}

export default StepOneModel;
