import { useSelector } from "react-redux";
import { getFormattedMonth } from "../../../utils/helper";

const CurrentMonthStats = () => {
  const { currentMonth } = useSelector((state) => state.dashboard);

  const month = getFormattedMonth(currentMonth?.month);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#dee5ff] mb-1">
            Current Month Stats
          </h1>
          <p className="text-on-surface-variant text-sm">
            Real-time financial pulse for {month}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-lg text-xs font-medium text-tertiary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          Live Data
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Salary Card */}
        <div className="bg-surface-container-high p-6 rounded-lg relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-6xl"
              data-icon="payments"
            >
              payments
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium mb-2">
            Total Salary Disbursed
          </p>
          <h3 className="text-4xl font-extrabold text-[#dee5ff] tracking-tight mb-4">
            ₹ {currentMonth?.totalSalary.toLocaleString("en-IN")}
          </h3>
          <div className="flex items-center gap-2 text-secondary text-xs font-semibold">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="trending_up"
            >
              trending_up
            </span>
            8.4% vs last month
          </div>
        </div>
        {/* Total Advance Card */}
        <div className="bg-surface-container-high p-6 rounded-lg relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-6xl"
              data-icon="account_balance"
            >
              account_balance
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium mb-2">
            Total Advances
          </p>
          <h3 className="text-4xl font-extrabold text-[#dee5ff] tracking-tight mb-4">
            ₹ {currentMonth?.advance.toLocaleString("en-IN")}
          </h3>
          <div className="flex items-center gap-2 text-error text-xs font-semibold">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="trending_up"
            >
              trending_up
            </span>
            12.1% vs last month
          </div>
        </div>
        {/* Total Employees Card */}
        <div className="bg-surface-container-high p-6 rounded-lg relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span
              className="material-symbols-outlined text-6xl"
              data-icon="badge"
            >
              badge
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium mb-2">
            Active Employees
          </p>
          <h3 className="text-4xl font-extrabold text-[#dee5ff] tracking-tight mb-4">
            {currentMonth?.employees}
          </h3>
          <div className="flex items-center gap-2 text-secondary text-xs font-semibold">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="person_add"
            >
              person_add
            </span>
            14 new this month
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentMonthStats;
