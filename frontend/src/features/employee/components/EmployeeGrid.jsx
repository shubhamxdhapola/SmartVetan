import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import EmployeeCard from "../../../components/cards/EmployeeCard";

const EmployeeGrid = () => {
  const { employees } = useSelector((state) => state.employee);
  const [filter, setFilter] = useState("All");

  const filteredEmployees = employees?.filter((employee) => {
    if (filter === "All") return true;
    if (filter === "Active") return employee.isActive !== false;
    if (filter === "Inactive") return employee.isActive === false;
    return true;
  });

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-on-surface">Employee Directory</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage and view all your staff members.</p>
        </div>
        
        <div className="relative inline-block w-48">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-surface-container-high border border-outline-variant/10 text-on-surface text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer transition-colors shadow-sm"
          >
            <option value="All">All Employees</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
          <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
            <FaChevronDown className="text-[10px]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEmployees?.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </section>
  );
};

export default EmployeeGrid;
