import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormattedMonth, getMonthsArray } from "../../../utils/helper";
import { getHistoricalData } from "../../../store/slices/dashboard.slice";

const HistoricalData = () => {
  const { customMonth } = useSelector((state) => state.dashboard);
  const { employer } = useSelector((state) => state.auth);

  const empJoiningMonth = employer?.createdAt;
  console.log(empJoiningMonth);
  const date = new Date(empJoiningMonth);
  const formattedMonth = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  console.log(formattedMonth);

  const statBlocks = [
    { label: "Employees", value: customMonth?.employees },
    {
      label: "Advance",
      value: "₹ " + customMonth?.advance.toLocaleString("en-IN"),
    },
    {
      label: "Total Salary",
      value: "₹ " + customMonth?.totalSalary.toLocaleString("en-IN"),
    },
    {
      label: "Payable",
      value: "₹ " + customMonth?.payable.toLocaleString("en-IN"),
      colorClass: "text-secondary",
    },
    {
      label: "Paid Amount",
      value: "₹ " + customMonth?.paidAmount.toLocaleString("en-IN"),
      colorClass: "text-primary",
    },
    {
      label: "Pending",
      value: "₹ " + customMonth?.pendingAmount.toLocaleString("en-IN"),
      colorClass: "text-error",
    },
    { label: "Paid Staff", value: customMonth?.paidStaff },
    {
      label: "Pending Staff",
      value: customMonth?.pendingStaff,
      colorClass: "text-error",
    },
  ];

  const monthsArr = getMonthsArray(empJoiningMonth);

  const [selectedMonth, setSelectedMonth] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedMonth) return;
    dispatch(getHistoricalData(selectedMonth));
  }, [selectedMonth]);

  console.log(selectedMonth);
  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#dee5ff]">
            Historical Performance
          </h2>
          <p className="text-on-surface-variant text-sm">
            Deep dive into previous payroll cycles
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-surface-container-high text-on-surface text-sm rounded-lg px-4 py-2.5 pr-10 border-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {monthsArr.map(({ label, value }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <span
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
              data-icon="expand_more"
            >
              expand_more
            </span>
          </div>
          <button className="bg-linear-to-r from-primary to-secondary text-on-primary-fixed font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="download"
            >
              download
            </span>
            Report
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statBlocks.map((stat, index) => (
          <div
            key={index}
            className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/10"
          >
            <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className={`text-xl font-bold ${stat.colorClass || ""}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoricalData;
