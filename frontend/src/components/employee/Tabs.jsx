import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-outline-variant/10">
      <button
        onClick={() => setActiveTab("salary")}
        className={`px-8 py-5 text-sm font-bold uppercase tracking-widest transition-colors ${
          activeTab === "salary"
            ? "text-primary border-b-2 border-primary bg-primary/5"
            : "text-on-surface-variant hover:text-on-surface border-b-2 border-transparent"
        }`}
      >
        Salary History
      </button>
      <button
        onClick={() => setActiveTab("advance")}
        className={`px-8 py-5 text-sm font-bold uppercase tracking-widest transition-colors ${
          activeTab === "advance"
            ? "text-primary border-b-2 border-primary bg-primary/5"
            : "text-on-surface-variant hover:text-on-surface border-b-2 border-transparent"
        }`}
      >
        Advance History
      </button>
    </div>
  );
};

export default Tabs;
