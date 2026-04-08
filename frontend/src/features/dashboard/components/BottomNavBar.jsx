import React from "react";

const BottomNavBar = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#091328] flex justify-around items-center h-16 z-50 px-4">
      <a className="flex flex-col items-center text-[#a3a6ff]" href="#">
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        <span className="text-[10px] font-medium mt-1">Dash</span>
      </a>
      <a className="flex flex-col items-center text-[#a3aac4]" href="#">
        <span className="material-symbols-outlined" data-icon="group">
          group
        </span>
        <span className="text-[10px] font-medium mt-1">Staff</span>
      </a>
      <a className="flex flex-col items-center text-[#a3aac4]" href="#">
        <span className="material-symbols-outlined" data-icon="payments">
          payments
        </span>
        <span className="text-[10px] font-medium mt-1">Advance</span>
      </a>
      <a className="flex flex-col items-center text-[#a3aac4]" href="#">
        <span
          className="material-symbols-outlined"
          data-icon="account_balance_wallet"
        >
          account_balance_wallet
        </span>
        <span className="text-[10px] font-medium mt-1">Salary</span>
      </a>
    </nav>
  );
};

export default BottomNavBar;
