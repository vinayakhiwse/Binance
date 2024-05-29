import { Link } from "react-router-dom";

export const DisplayList = ({
  currentItems,
  handleSortingPrice,
  handleChangeSort,
  handleVolumeSort,
  handleMarketCapSort,
}) => {
  return (
    <>
      <table className="w-full text-sm mt-8 text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-normal">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              <div
                onClick={handleSortingPrice}
                className="flex items-center text-xs font-normal cursor-pointer"
              >
                Price
                <Link href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </Link>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div
                onClick={handleChangeSort}
                className="flex items-center text-xs font-normal cursor-pointer"
              >
                Change
                <Link href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </Link>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div
                onClick={handleVolumeSort}
                className="flex items-center text-xs font-normal cursor-pointer"
              >
                Volume
                <Link href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </Link>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div
                onClick={handleMarketCapSort}
                className="flex items-center text-xs font-normal cursor-pointer"
              >
                Market Cap
                <Link href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </Link>
              </div>
            </th>
            <th scope="col" className="px-4">
              <span className="text-gray-400 text-xs font-normal">Details</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {currentItems &&
            currentItems.map((item, i) => (
              <tr
                key={i}
                className="bg-[#ffffff] border-b dark:bg-[#ffffff]-800 dark:border-gray-200"
              >
                <th
                  scope="row"
                  className="flex items-center gap-2 px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-gray-800"
                >
                  <img
                    src="https://t3.gstatic.com/images?q=tbn:ANd9GcSniJo2RadPp6LiPgkKztgFNZUDXQxz-2P76bfPtzwcB1gn1xDO"
                    className="rounded-full w-9 h-9"
                    alt="stock-img"
                  />
                  <p className="w-[200px] text-xl text-gray-800">
                    {item.symbol}{" "}
                    <span className="text-sm text-gray-500 ml-2">
                      {item.name}
                    </span>
                  </p>
                </th>
                <td className="px-6 py-4 text-gray-700 text-[16px]">
                  ${item.quote.USD.price.toFixed(2)}
                </td>
                <td
                  className={
                    item.quote.USD.percent_change_24h < 0
                      ? "text-red-500 px-6 py-4 text-[16px]"
                      : "text-green-500 px-6 py-4 text-[16px]"
                  }
                >
                  {item.quote.USD.percent_change_24h < 0
                    ? `${item.quote.USD.percent_change_24h.toFixed(2)}%`
                    : `+${item.quote.USD.percent_change_24h.toFixed(2)}%`}
                </td>
                <td className="px-6 py-4 text-gray-700 text-[16px]">
                  {`$${(item.quote.USD.volume_24h / 1e9).toFixed(2)}`}B
                </td>
                <td className="px-6 py-4 text-gray-700 text-[16px]">
                  {`$${(item.quote.USD.market_cap / 1e9).toFixed(2)}`}B
                </td>
                <td className="flex items-center justify-evenly px-1 py-4 text-right">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn-bGzl1PhRZ37oaUDjMhkqmapwvDdhHhBfWjU4EBw1jqKEZZPoovnQHS4X1BPTj_dYQw&usqp=CAU"
                      alt="logo"
                      className="w-12 h-12"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jeXBLS__S1BjB5RaJT1fRE6CRcuYvEJzavgrlUpH24h3awAxiG__K9bR151Xns2f-SI&usqp=CAU"
                      alt="logo"
                      className="w-6 h-7"
                    />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {currentItems.length === 0 && (
        <div className="w-full flex pt-8 flex-col items-center justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqWz3Nvdd6XJUuRR4n0iv8ALgkZ-EVZF1ZQ&usqp=CAU"
            alt="no-result"
            className="w-24 h-24"
          />
          <p className="mt-3 text-lg text-gray-500">No results</p>
        </div>
      )}
    </>
  );
};
