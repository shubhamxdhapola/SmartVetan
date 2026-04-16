import { useEffect, useRef, useState } from "react";
import { IoMdSearch, IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { MdToken } from "react-icons/md";
import { useSelector } from "react-redux";

const TopNavBar = () => {
  const { employer } = useSelector((state) => state.auth);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef(null);

  const hideSearchBar = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", hideSearchBar);
    return () => {
      document.removeEventListener("mousedown", hideSearchBar);
    };
  });

  return (
    <header
      className={`fixed ${showSearchBar ? "-top-100" : "top-0"} right-0 left-0 md:left-65 xl:left-76 z-40 bg-[#060e20] flex justify-between items-center px-4 py-4 transition-all flex-col-reverse md:flex-row gap-4 duration-300`}
    >
      <div
        className={`flex items-center gap-4 bg-[#091328] px-4 py-3 rounded-md w-[95%] border border-outline-variant/10 md:static fixed ${showSearchBar ? "top-3" : "-top-20"} transition-all duration-300`}
        ref={searchBarRef}
      >
        <IoMdSearch className="size-5" />
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full h-inherit focus:outline-none placeholder:text-on-surface-variant/50"
          placeholder="Search transactions or employees..."
          type="text"
        />
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
