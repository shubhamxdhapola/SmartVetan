import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  const { isFeatured } = employee;

  // Determine specific classes based on whether the card is "Featured" or not
  const wrapperClass = isFeatured
    ? "relative glass-card rounded-lg p-6 border-2 border-primary/50 shadow-2xl shadow-primary/10 group bg-surface-container-high"
    : "relative glass-card rounded-lg p-6 border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group";

  const imgBorderClass = isFeatured
    ? "border-primary/40"
    : "border-outline-variant/20";

  const roleTextClass = isFeatured
    ? "text-primary font-bold"
    : "text-on-surface-variant font-medium";

  const advanceWrapperClass = isFeatured
    ? "bg-surface-container-lowest border-primary/20"
    : "bg-surface-container-low border-outline-variant/5";

  const advanceLabelClass = isFeatured
    ? "text-primary font-bold"
    : "text-on-surface-variant/60 font-bold";

  const viewDetailsClass = isFeatured
    ? "bg-primary text-on-primary-fixed font-bold shadow-lg shadow-primary/20"
    : "bg-surface-container-high hover:bg-surface-bright text-on-surface font-semibold border border-outline-variant/10";

  return (
    <div className={wrapperClass}>
      {/* Photo + Info Row */}
      <div className="flex items-start gap-5 mb-6">
        <div className="relative flex-shrink-0">
          {/* Subtle glow effect for normal cards on hover */}
          {!isFeatured && (
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
          {employee.profilePic ? (
            <img
              alt={`${employee.name} Portrait`}
              className={`relative w-16 h-16 rounded-xl object-cover border-2 shadow-lg ${imgBorderClass}`}
              src={employee.profilePic}
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-dim to-primary flex justify-center items-center text-xl font-black text-white">
              <span>{employee.name[0]}</span>
            </div>
          )}

          {/* Status Indicator Dot */}
          <div className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface z-10 ${employee.isActive !== false
            ? 'bg-green-400'
            : 'bg-error'
            }`}></div>

          {/* Custom Bottom-Right Badge */}
          {employee.badge && (
            <div
              className={`absolute -bottom-2 -right-2 w-7 h-7 ${employee.badge.bgClass} ${employee.badge.textClass} rounded-full flex items-center justify-center shadow-lg border-4 border-surface`}
            >
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                {employee.badge.icon}
              </span>
            </div>
          )}

          {/* Featured Top-Left Badge */}
          {isFeatured && (
            <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-primary text-on-primary-fixed text-[8px] font-black rounded-full uppercase tracking-widest">
              Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
            <h3 className="text-lg font-bold text-on-surface leading-tight">
              {employee.name}
            </h3>

            <p className={`text-sm leading-snug ${roleTextClass}`}>
              {employee.designation}
            </p>
          </div>
          <p className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">
            EMP-{employee._id.slice(-4).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className={`p-4 rounded-lg border ${advanceWrapperClass}`}>
          <p className={`text-[10px] uppercase tracking-widest mb-1 ${advanceLabelClass}`}>
            Total Advance Taken
          </p>
          <p className="text-2xl font-black text-on-surface">
            ₹ {(employee.totalMonthlyAdvance || 0).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <Link
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg transition-all ${viewDetailsClass}`}
        to={employee?._id}
      >
        View Details
        <span className="material-symbols-outlined text-lg">
          arrow_right_alt
        </span>
      </Link>
    </div>
  );
}
