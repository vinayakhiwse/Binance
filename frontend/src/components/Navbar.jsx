import React, { useState } from "react";
import {
  MdDarkMode,
  MdLanguage,
  MdKeyboardArrowDown,
  MdOutlineManageHistory,
  MdSupervisorAccount,
} from "react-icons/md";
import { FaFileDownload, FaBorderAll, FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiGovernmentFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { PiIdentificationCardFill } from "react-icons/pi";
import { GiStoneWheel } from "react-icons/gi";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FcManager } from "react-icons/fc";
import { AiFillSecurityScan } from "react-icons/ai";
import { BsFillGiftFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { traderAuth } from "../redux/slice/traderAuth";
import { Toast } from "../utils/toast";
import { checkAuth } from "../redux/slice/checkAuth";
import SideBar from "../utils/SideBar";

function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const data = useSelector((state) => state.trader.value);
  const { name } = useSelector((state) => state.country.country);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const googleLogout = () => {
    window.open(`http://localhost:8080/auth/logout`, "_self");
    localStorage.removeItem("token");
    dispatch(checkAuth());
    dispatch(traderAuth(""));
    Toast.success("LogOut Successfully.");
    setTimeout(() => {
      return navigate("/login/auth");
    }, 2000);
  };

  return (
    <>
      {auth ? (
        <nav className="bg-[#FFFFFF] shadow-gray-300/20 shadow-lg border-gray-100 dark:bg-[#FFFFFF]-900">
          <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center justify-evenly w-[28%] md:order-2">
              <FaSearch className="text-xl text-gray-600" />
              <button
                onClick={() => setOpenSideBar(!openSideBar)}
                className="flex gap-1 text-sm items-center rounded-md bg-yellow-400 py-2 px-2"
              >
                <LuDownload className="text-md text-gray-800" /> Deposit
              </button>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-5 h-5 rounded-full"
                  src={
                    data.profile
                      ? data.profile
                      : "https://cdn-icons-png.flaticon.com/256/149/149071.png"
                  }
                  alt="user_profile"
                  onError={(e) => {
                    e.target.src =
                      "https://cdn-icons-png.flaticon.com/256/149/149071.png";
                  }}
                />
              </button>
              {/* <!-- Dropdown menu --> */}
              <FaBorderAll className="text-xl text-gray-600" />
              <RiGovernmentFill className="text-xl text-gray-600" />
              <IoNotifications className="text-xl text-gray-600" />
              <FaFileDownload className="text-xl text-gray-600" />
              <MdLanguage className="text-xl text-gray-600" />
              <MdDarkMode className="text-xl text-gray-600" />
              {isUserMenuOpen && (
                <div
                  className="z-50 absolute right-52 top-16 mt-2 w-52 bg-white rounded-md overflow-hidden shadow-lg"
                  id="user-dropdown"
                >
                  <div className="px-4 py-4">
                    <span className="block text-sm text-gray-500 dark:text-gray-800">
                      Bonnie Green
                    </span>
                    <span className="block text-sm  text-gray-100 truncate dark:text-gray-800">
                      {data?.email}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-800">
                      Country:{" "}
                      <span className="text-yellow-500">
                        {name ? name : "India"}
                      </span>
                    </span>
                  </div>
                  <div className="w-[80%] m-auto flex justify-around">
                    <button className="text-[10px] rounded-2xl bg-yellow-400 py-1 px-2">
                      {data?.isVerified ? "Verified" : "Unverified"}
                    </button>
                    <button className="text-[10px] rounded-2xl bg-yellow-400 py-1 px-2">
                      Regular User
                    </button>
                  </div>
                  <ul className="py-3" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to={"/"}
                        onClick={toggleUserMenu}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <FcManager className="text-2xl" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <AiFillSecurityScan className="text-2xl" /> Security
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <PiIdentificationCardFill className="text-2xl" />{" "}
                        Identification
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <MdSupervisorAccount className="text-2xl" /> Referral
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <GiStoneWheel className="text-2xl" /> New User Zone
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <BsFillGiftFill className="text-2xl" /> Rewards Hub
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <MdOutlineManageHistory className="text-2xl" /> API
                        Management
                      </Link>
                    </li>
                    <li onClick={googleLogout}>
                      <Link
                        href="#"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-500 dark:hover:text-white"
                      >
                        <TbLogout className="text-2xl" /> Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <Link to="/" className="flex items-center mr-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
                  className="h-8 mr-2"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-yellow-500 text-2xl font-semibold whitespace-nowrap dark:text-gray">
                  Binance
                </span>
              </Link>
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#FFFFFF]-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-[#FFFFFF] dark:bg-[#FFFFFF]-800 md:dark:bg-[#FFFFFF]-900 dark:border-[#FFFFFF]-700">
                <li>
                  <Link
                    to={"/buycrypto"}
                    className="block py-2  text-sm  text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Buy Crypto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/markets"
                    className="block py-2 text-sm text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Markets
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center py-2 text-sm text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Trade <MdKeyboardArrowDown className="text-md" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center py-2 text-sm text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Futures <MdKeyboardArrowDown className="text-md" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 text-sm text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Earn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center py-2 text-sm text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Square <MdKeyboardArrowDown className="text-md" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-sm py-2 text-gray-800 rounded hover:bg-yellow-100 md:hover:bg-transparent md:hover:text-yellow-700 md:p-0 dark:text-gray md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-yellow md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    More <MdKeyboardArrowDown className="text-md" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <div className="w-full shadow-gray-300/20 shadow-lg flex justify-between py-5 px-8">
          <div className="w-1/12">
            <img src={logo} className="w-full" alt="binance-logo" />
          </div>
          <div>
            <MdDarkMode className="text-3xl" />
          </div>
        </div>
      )}

      {/* dashboard navbar */}

      {openSideBar && (
        <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      )}
    </>
  );
}

export default Navbar;
