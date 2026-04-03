import React from "react";

const HomeNav = () => {
  return (
    <nav className="sticky top-0 py-2 w-full z-40 bg-[#091328] shadow-none h-20">
      <div className="flex justify-between items-center h-16 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-dim to-primary flex items-center justify-center rounded-sm">
            <span
              className="material-symbols-outlined text-on-primary-container text-xl"
              data-icon="account_balance_wallet"
            >
              account_balance_wallet
            </span>
          </div>
          <span className="text-xl font-bold text-[#dee5ff] tracking-wider font-headline">
            SmartVetan
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#dee5ff] font-medium text-sm border border-outline-variant/30 px-6 py-2 hover:bg-[#1f2b49] transition-colors duration-200 rounded-sm font-bold">
            Login
          </button>
          <button className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold text-sm px-6 py-2 rounded-sm active:scale-95 transition-transform">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
