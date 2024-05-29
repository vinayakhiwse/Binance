import React from "react";

const coindata = [
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxgJ78PhGixmXF5JLybLvYtq-Sxusys1NIp4hqQD-VoTX9rgmn",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQjPqmPC_RLAE6FSPiL_PBirHOJemSOcwJhqFavy7owEg0vV6Hw",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR8IgToGdpIY4Zog8Oh3oLh_ymo2NsZHgMgtmxtV8_QvTL_tDKQ",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
  {
    name: "BNB to USD",
    price: " 212.94 ",
    img1: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqVktKKrm3eQdVLTPlsrExWla89lLYanyfzPjfO-BZpheV6dMh",
    img2: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGTAB5U3JqrXQ-6e1LuO46TCcaedT1dicUGiGr1sd_M4DFyosk",
  },
];

function Coversions() {
  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl mt-32">
        <p className="text-4xl font-medium text-center">
          Popular BNB Conversions
        </p>
        <p className="text-center mt-10 text-gray-500 font-light">
          A selection of other popular currency conversions of BNB to various
          fiat currencies.
        </p>
        <div className="border-t border-l grid grid-rows-3 mt-14 grid-flow-col gap-0">
          {coindata?.map((el, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-8 pl-10 pr-16 border-b border-r border-gray-300"
            >
              <div className="flex flex-col">
                <p className="text-xl">{el.name}</p>
                <p className="text-lg text-gray-500 font-normal mt-2">
                  1 BNB ={el.price} USD
                </p>
              </div>
              <div className="flex relative">
                <img
                  src={el.img1}
                  className="w-10 h-10 z-50 overflow-hidden"
                  alt="img1"
                />
                <img
                  src={el.img2}
                  className="absolute z-10 top-0 overflow-visible left-10 w-10 h-10"
                  alt="img2"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-4 text-gray-500">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>
    </>
  );
}

export default Coversions;
