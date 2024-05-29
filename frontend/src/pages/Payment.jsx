import React, { useEffect, useState } from "react";
import DashboardSidebar from "../utils/DashboardSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function Payment() {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");
  const getWithdrawHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/payment/withdraw/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status === 200) {
        setHistory(res.data.data);
      }
    } catch (error) {
      console.log("error in payment detail", error);
    }
  };

  useEffect(() => {
    getWithdrawHistory();
  }, []);

  return (
    <>
      <div className="w-full flex gap-5 mt-5 bg-[#ffffff]">
        <DashboardSidebar />
        <div className="w-[80%] mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-md text-gray-700 uppercase bg-yellow-50 dark:bg-yellow-400">
              <tr>
                <th scope="col" className="px-8 py-4">
                  TRANSACTION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    DATE & TIME
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
                  <div className="flex items-center">
                    AMOUNT
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
                  <div className="flex items-center">
                    TRANSACTION TYPE
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
                  <div className="flex items-center">
                    STATUS
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
                  <div className="flex items-center">Explore</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {history &&
                history?.map((el, i) => (
                  <tr
                    key={i}
                    className={`${
                      el.transactionType === "deposit"
                        ? "bg-white dark:bg-white border-b border-gray-100 cursor-pointer"
                        : "bg-gray-100 dark:bg-gray-100 border-b border-gray-100 cursor-pointer"
                    } `}
                  >
                    <th
                      scope="row"
                      className="px-4 py-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-gray-700"
                    >
                      {el.payment_Id}
                    </th>
                    <td className="px-6 py-6 text-gray-500 text-md">
                      {el.updatedAt}
                    </td>
                    <td className="px-6 py-6 text-gray-500 text-md">
                      {el.payment_Amount}
                    </td>
                    <td className="px-6 py-6 text-gray-500 text-md">
                      {el.transactionType === "deposit" ? (
                        <span className="text-green-600">deposit</span>
                      ) : (
                        <span className="text-red-600">withdrawal</span>
                      )}
                    </td>
                    <td className="px-6 py-6 text-md">
                      {el.status === "Complete" ? (
                        <span className="text-green-600">Complete</span>
                      ) : (
                        <span className="text-red-600">Incomplete</span>
                      )}
                    </td>
                    <td className="px-6 py-6 text-gray-500 text-md">
                      <Link to={`/payment/detail/${el._id}`}> View </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Payment;
