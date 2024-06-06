import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Pagination = ({
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
}) => {
    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <FaChevronLeft />
            </button>
            <span>Page {currentPage}</span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
