import { useSelector } from "react-redux";
import { getFormattedMonth } from "../../../utils/helper";
import CurrentMonthStatsCard from "../../../components/cards/CurrentMonthStatsCard";
import { IoCashOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const CurrentMonthStats = () => {
  const { currentMonth, loading } = useSelector((state) => state.dashboard);
  const month = getFormattedMonth(currentMonth?.month);

  const DATA = [
    {
      label: "Total Salary",
      value: "₹ " + currentMonth?.totalSalary.toLocaleString("en-IN"),
      Icon: IoCashOutline,
    },
    {
      label: "Total Advances",
      value: "₹ " + currentMonth?.advance.toLocaleString("en-IN"),
      Icon: CiBank,
    },
    {
      label: "Total Employees",
      value: currentMonth?.employees,
      Icon: FaUsers,
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center">
        {DATA.map(({ label, value, Icon }, index) =>
          loading ? (
            <Skeleton
              height="133px"
              borderRadius={8}
              baseColor="#141f38"
              highlightColor="#1f2b49"
            />
          ) : (
            <CurrentMonthStatsCard
              key={index}
              label={label}
              value={value}
              Icon={Icon}
            />
          ),
        )}
      </div>
    </section>
  );
};

export default CurrentMonthStats;
