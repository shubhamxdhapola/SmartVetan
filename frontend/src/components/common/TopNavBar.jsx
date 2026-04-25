import { useEffect, useRef, useState } from "react";
import { IoMdSearch, IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdToken } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchEmployee } from "../../store/slices/employee.slice";

const TopNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employer } = useSelector((state) => state.auth);
  const { searchEmployees, searchLoading } = useSelector((state) => state.employee);
  
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarRef = useRef(null);

  const hideSearchBar = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setShowSearchBar(false);
      setSearchQuery(""); // Optionally clear search on click outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", hideSearchBar);
    return () => {
      document.removeEventListener("mousedown", hideSearchBar);
    };
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchEmployee(searchQuery));
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch]);

  const handleEmployeeClick = (id) => {
    setSearchQuery("");
    setShowSearchBar(false);
    navigate(`/employees/${id}`);
  };

  return (
    <header
      className={`fixed ${showSearchBar ? "-top-100" : "top-0"} right-0 left-0 md:left-65 xl:left-76 z-40 bg-[#060e20] flex justify-between items-center px-4 py-4 transition-all flex-col-reverse md:flex-row gap-4 duration-300`}
    >
      <div
        className={`relative flex items-center gap-4 bg-[#091328] px-4 py-3 rounded-md w-[95%] md:w-full max-w-md border border-outline-variant/10 md:relative fixed ${showSearchBar ? "top-3" : "-top-20"} md:top-0 transition-all duration-300`}
        ref={searchBarRef}
      >
        <IoMdSearch className="size-5" />
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full h-inherit focus:outline-none placeholder:text-on-surface-variant/50"
          placeholder="Search employees..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search Results Dropdown */}
        {searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-high border border-outline-variant/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-80 overflow-y-auto">
            {searchLoading ? (
              <div className="p-4 text-center text-sm text-on-surface-variant">Searching...</div>
            ) : searchEmployees?.length > 0 ? (
              <ul>
                {searchEmployees.map((emp) => (
                  <li 
                    key={emp._id}
                    onClick={() => handleEmployeeClick(emp._id)}
                    className="px-4 py-3 hover:bg-surface-bright cursor-pointer flex items-center gap-3 border-b border-outline-variant/5 last:border-b-0 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                      {emp.profilePic ? (
                        <img src={emp.profilePic} alt={emp.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold text-primary">{emp.name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface truncate">{emp.name}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{emp.designation}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-on-surface-variant">No employees found</div>
            )}
          </div>
        )}
      </div>

      <div
        className={`flex items-center gap-4 justify-between md:justify-end w-full`}
      >
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-9 h-9 primary-gradient rounded-lg flex items-center justify-center">
            <MdToken className="text-on-primary text-2xl" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold authority-text text-on-surface">
              SmartVetan
            </h2>
            <p className="text-[10px] uppercase label-spacing text-primary-dim">
              Enterprise HRMS
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-on-surface-variant h-10 w-10  justify-center items-center bg-surface-bright/60 rounded-md transition-colors cursor-pointer hover:bg-surface-bright/80">
              <IoMdSettings className="size-5" />
            </button>
            <button
              className="md:hidden text-on-surface-variant h-10 w-10 flex justify-center items-center bg-surface-bright/60 rounded-md transition-colors cursor-pointer hover:bg-surface-bright/80"
              onClick={() => setShowSearchBar(true)}
            >
              <IoSearch className="size-5" />
            </button>
            <button className=" text-on-surface-variant h-10 w-10 flex justify-center items-center bg-surface-bright/60 rounded-md transition-colors cursor-pointer hover:bg-surface-bright/80">
              <FiLogOut className="size-5" />
            </button>
          </div>

          <div className="h-8 w-px bg-outline-variant/30  inline-block"></div>

          <div className="h-10 w-10 rounded-full border border-primary/30 overflow-hidden bg-surface-container-highest flex justify-center items-center">
            {employer?.profileImage ? (
              <img
                alt="User profile avatar"
                className="w-full h-full object-cover"
                src={employer?.profileImage}
              />
            ) : (
              <span>{employer?.name.split("")[0]}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
