import React, { useEffect, useState } from "react";
import { sideBarArray } from "../utils/navigation";
import { Link, useLocation } from "react-router-dom";
function DashboardSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const handleBg = (i) => {
    setActiveIndex(i);
  };

  useEffect(() => {
    const currentIndex = sideBarArray.findIndex(
      (el) => el.to === location.pathname
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="w-[15%] bg-[#ffffff]">
        <ul className="">
          {sideBarArray &&
            sideBarArray?.map((el, i) => (
              <Link to={el.to} key={i} onClick={() => handleBg(i)}>
                <li
                  className={`flex gap-3 text-lg items-center text-gray-500 my-4 py-3 px-12 cursor-pointer ${
                    i === activeIndex ? "bg-gray-100" : "hover:bg-gray-100"
                  }`}
                >
                  {el.icon} {el.text}
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
}

export default DashboardSidebar;
