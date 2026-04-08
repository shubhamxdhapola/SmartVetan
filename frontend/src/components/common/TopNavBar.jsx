import React from "react";
import { useSelector } from "react-redux";

const TopNavBar = () => {
  const { employer } = useSelector((state) => state.auth);
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-[#060e20] flex justify-end items-center h-16 px-8 transition-all">
      {/* <div className="flex items-center gap-4 bg-[#091328] px-4 py-2 rounded-full w-96 border border-outline-variant/10">
        <span
          className="material-symbols-outlined text-on-surface-variant text-xl"
          data-icon="search"
        >
          search
        </span>
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/50"
          placeholder="Search transactions or employees..."
          type="text"
        />
      </div> */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#a3aac4] hover:bg-[#1f2b49] rounded-full transition-colors relative">
            <span
              className="material-symbols-outlined"
              data-icon="notifications"
            >
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full"></span>
          </button>
          <button className="p-2 text-[#a3aac4] hover:bg-[#1f2b49] rounded-full transition-colors">
            <span className="material-symbols-outlined" data-icon="help">
              help
            </span>
          </button>
          <button className="p-2 text-[#a3aac4] hover:bg-[#1f2b49] rounded-full transition-colors">
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant/30"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface">
              {employer?.name}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              {employer?.email}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full border border-primary/30 overflow-hidden bg-surface-container-highest flex justify-center items-center">
            {employer?.profilePic ? (
              <img
                alt="User profile avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL3EUf5YWMtJEtKBspJmd7Pn7X8hjWd6vB7F8gXpBS-abiRcLuz5DSgtcoc9EGRIGuOsZo93SsEP7r7qRc31dwMJPcbWSREcl9-0x3t3ijmw75DuCg7fhIdBjE6g3vXMDpBiQJQ56FgXpofr3wMBhgm6m59InTbbh8u_8iQpZH1lhJ2Kqqv-u9xBO8vg9UEd08u_5siB1z3b6RMdwBMRrDyj5183avS0oHo83DKmXrcB67Qh8TgzBcPYTCEXwF9S5BM870fm4dLdY"
              />
            ) : (
              <span>{employer?.name.split('')[0]}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
