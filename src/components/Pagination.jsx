import PropTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex flew-row justify-between items-center">
      {currentPage > 1 && (
        <button
          className="flex items-center justify-center pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <svg
            className="w-3.5 h-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="#AB8BFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </button>
      )}

      <div className="flex flex-row space-x-2 text-lg text-white">
        <span className="font-bold">{currentPage}</span> /{" "}
        <span className="font-bold text-[#9CA4AB]">{totalPages}</span>
      </div>

      {currentPage && (
        <button
          className="flex items-center justify-center pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <svg
            className="w-3.5 h-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="#AB8BFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};
