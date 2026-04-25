import { useSelector } from "react-redux";
import { FaRegCheckCircle, FaUsers } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

const StatsOverview = () => {
  const { employees } = useSelector((state) => state.employee);

  const totalEmployees = employees?.length || 0;
  const activeEmployees = employees?.filter((emp) => emp.isActive !== false).length || 0;
  const inactiveEmployees = employees?.filter((emp) => emp.isActive === false).length || 0;

  const STATS_DATA = [
    {
      label: "Total Employees",
      Icon: FaUsers,
      value: totalEmployees,
      style: "bg-primary/10 text-primary",
    },
    {
      label: "Active Employees",
      Icon: FaRegCheckCircle,
      value: activeEmployees,
      style: "bg-tertiary/10 text-tertiary",
    },
    {
      label: "Inactive Employees",
      Icon: IoMdCloseCircleOutline,
      value: inactiveEmployees,
      style: "text-error bg-error/10",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {STATS_DATA.map(({ label, Icon, value, style }, index) => (
        <div className="glass-card rounded-lg p-6 border border-outline-variant/10 flex items-center gap-6">
          <div
            className={`w-12 h-12 rounded-lg  flex items-center justify-center ${style}`}
          >
            <Icon className="size-5" />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-3xl font-black text-on-surface">{value}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
