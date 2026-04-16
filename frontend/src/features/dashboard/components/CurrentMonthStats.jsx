import { useSelector } from "react-redux";
import { getDate, getFormattedMonth, getTime } from "../../../utils/helper";
import CurrentMonthStatsCard from "../../../components/cards/CurrentMonthStatsCard";
import { IoCashOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { LuCalendar, LuClock3 } from "react-icons/lu";
import { useEffect, useState } from "react";

const CurrentMonthStats = () => {
  const { currentMonth, loading } = useSelector((state) => state.dashboard);
  const month = getFormattedMonth(currentMonth?.month);
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex items-start lg:items-center lg:flex-row gap-5 justify-between flex-col mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-1">
            Current Month Stats
          </h1>
          <p className="text-on-surface-variant text-sm">
            Real-time financial pulse for {month}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm bg-surface-container-high rounded-lg font-medium text-on-background/90 font-['Inter]">
            <LuCalendar className="size-4" />
            {getDate()}
          </div>
          <div className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm bg-primary/20 rounded-lg font-medium font-['Inter] text-on-surface/90">
            <LuClock3 className="size-4" />
            {time}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center justify-center">
        {DATA.map(({ label, value, Icon }, index) =>
          loading ? (
            <Skeleton
              key={index}
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
