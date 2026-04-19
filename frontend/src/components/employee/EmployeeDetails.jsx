import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import Tabs from "./Tabs";
import SalaryHistory from "./SalaryHistory";
import AdvanceHistory from "./AdvanceHistory";

const EmployeeDetails = () => {
  const [activeTab, setActiveTab] = useState("salary");

  return (
    <div className="bg-[#060e20] text-on-surface min-h-screen">
      {/* TopNavBar */}
      <header className="bg-[#060e20]/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="flex justify-between items-center h-16 px-6 w-full max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tight text-[#dee5ff]">
            Luminous Ledger
          </div>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-[#a3aac4] hover:text-[#ba9eff] transition-colors cursor-pointer active:scale-95 duration-200">
              notifications
            </span>
            <span className="material-symbols-outlined text-[#a3aac4] hover:text-[#ba9eff] transition-colors cursor-pointer active:scale-95 duration-200">
              settings
            </span>
            <img
              alt="Employee Profile Avatar"
              className="w-8 h-8 rounded-full border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJph7iT-ExsMEbn4uzPUBDFIZlmhF94m1OPJLFXdXrcvvmzcer8tdmDyWHkTD636cKnV8jdzNMeh3OO7FHcrU5YnSqa7kk3qs-4GwQ9uW18-wjicbul71aHKzYGCFtis4CdPfj-obpkkvN-HPvoYIewxYp10zwLVfdctpD8DThCelHCQX2hRL0je_XOfxOET24_gECe53c7sArrMX7SLWU9EZwqq9JTBZ4dtz1yxz4zxzwyGqqImRvE8t2J4PW_cJeq-6HP-1YHHM"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Back Button and Actions Row */}
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Employees</span>
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-error transition-all">
              <span className="material-symbols-outlined text-xl">delete</span>
            </button>
          </div>
        </div>

        <ProfileCard />

        <section className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "salary" ? <SalaryHistory /> : <AdvanceHistory />}
        </section>
      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 h-20 bg-[#060e20]/90 backdrop-blur-2xl z-50">
        <div className="flex flex-col items-center justify-center text-[#a3aac4] hover:text-[#dee5ff] transition-all cursor-pointer">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
            Home
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#6366f1]/20 text-[#ba9eff] rounded-full px-6 py-2 cursor-pointer">
          <span className="material-symbols-outlined">badge</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
            Staff
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#a3aac4] hover:text-[#dee5ff] transition-all cursor-pointer">
          <span className="material-symbols-outlined">account_balance</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
            Wallet
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#a3aac4] hover:text-[#dee5ff] transition-all cursor-pointer">
          <span className="material-symbols-outlined">menu</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
            Menu
          </span>
        </div>
      </nav>
    </div>
  );
};

export default EmployeeDetails;
