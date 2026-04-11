import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/slices/pagination.slice";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Pagination = ({ totalItems, itemsPerPage }) => {
  const totalPages = Array.from(
    { length: Math.ceil(totalItems / itemsPerPage) },
    (_, i) => i + 1,
  );
  const { currentPage } = useSelector((state) => state.pagination);
  const firstPage = 1;
  const lastPage = totalPages.length;
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between">
        <p className="text-xs text-on-surface-variant">
          Showing {currentPage} of {totalPages.length} entries
        </p>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border border-outline-variant/20 text-xs cursor-pointer hover:bg-surface-container-high transition-colors ${currentPage === firstPage && "hidden"}`}
            disabled={currentPage === firstPage}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <GrFormPrevious className="size-5" />
          </button>
          {totalPages?.map((item, i) => (
            <button
              className={`px-3 py-1 rounded bg-primary/10 border border-primary/20 text-xs text-primary font-bold cursor-pointer ${currentPage === item && 'bg-primary/30' }`}
              key={i}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </button>
          ))}

          <button
            className={`px-3 py-1 rounded border border-outline-variant/20 text-xs cursor-pointer hover:bg-surface-container-high transition-colors ${currentPage == lastPage && "hidden"}`}
            disabled={currentPage === lastPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <GrFormNext className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
