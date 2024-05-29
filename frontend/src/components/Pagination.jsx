import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ handlePageClick, pageCount }) {
  return (
    <>
      <ReactPaginate
        breakLabel="....."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex bg-[#ffffff] dark:bg-[#ffffff]-800 rounded-md"
        pageClassName="flex items-center justify-center py-2 px-3 cursor-pointer"
        breakClassName="flex items-center justify-center py-2 px-3 cursor-pointer"
        previousClassName="flex items-center justify-center py-2 px-3 cursor-pointer"
        nextClassName="flex items-center justify-center py-2 px-3 cursor-pointer"
        activeLinkClassName="bg-gray-200 px-2 py-1 rounded-md text-gray-700"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </>
  );
}

export default Pagination;
