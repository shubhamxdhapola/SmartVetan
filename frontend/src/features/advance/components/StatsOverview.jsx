import { useSelector } from "react-redux";
import { FaRupeeSign, FaUsers, FaWallet } from "react-icons/fa";

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="glass-card rounded-lg p-6 border border-outline-variant/10 border-l-[3px] border-l-outline-variant/20 flex items-center gap-6">
    <div className="w-12 h-12 rounded-lg bg-surface-container-high/60 animate-pulse flex-shrink-0" />
    <div className="space-y-2 flex-1">
      <div className="h-2.5 w-28 rounded bg-surface-container-high/60 animate-pulse" />
      <div className="h-6 w-20 rounded bg-surface-container-high/60 animate-pulse" />
    </div>
  </div>
);

// ─── Stats card config ────────────────────────────────────────────────────────
const buildStatsData = (stats) => [
  {
    label: "Total Advance This Month",
    Icon: FaRupeeSign,
    value: `₹ ${(stats?.totalAdvance ?? 0).toLocaleString("en-IN")}`,
    iconStyle: "bg-primary/10 text-primary",
    borderAccent: "border-l-primary/50",
  },
  {
    label: "Employees with Advance",
    Icon: FaUsers,
    value: `${stats?.employeesWithAdvance ?? 0}`,
    iconStyle: "bg-tertiary/10 text-tertiary",
    borderAccent: "border-l-tertiary/50",
  },
  {
    label: "Total Salary To Be Paid",
    Icon: FaWallet,
    value: `₹ ${(stats?.totalSalaryToBePaid ?? 0).toLocaleString("en-IN")}`,
    iconStyle: "bg-secondary/10 text-secondary",
    borderAccent: "border-l-secondary/50",
  },
];

const StatsOverview = () => {
  const { stats, statsLoading } = useSelector((state) => state.advance);
  const STATS_DATA = buildStatsData(stats);

  if (statsLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {STATS_DATA.map(({ label, Icon, value, iconStyle, borderAccent }, index) => (
        <div
          key={index}
          className={`glass-card rounded-lg p-6 border border-outline-variant/10 border-l-[3px] ${borderAccent} flex items-center gap-6 hover:bg-surface-container-high/50 transition-colors duration-300`}
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconStyle}`}
          >
            <Icon className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1.5">
              {label}
            </p>
            <p className="text-2xl font-black text-on-surface tracking-tight">
              {value}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
