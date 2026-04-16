import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  const { isFeatured } = employee;

  // Determine specific classes based on whether the card is "Featured" or not
  const wrapperClass = isFeatured
    ? "glass-card rounded-lg p-6 border-2 border-primary/50 shadow-2xl shadow-primary/10 group bg-surface-container-high"
    : "glass-card rounded-lg p-6 border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group";

  const imgBorderClass = isFeatured
    ? "border-primary/40"
    : "border-outline-variant/20";

  const editBtnClass = isFeatured
    ? "bg-primary/20 text-primary"
    : "bg-surface-bright/50 text-on-surface-variant hover:text-primary";

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
      <div className="flex items-start justify-between mb-6">
        <div className="relative">
          {/* Subtle glow effect for normal cards on hover */}
          {!isFeatured && (
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
          {employee.profilePic ? (
            <img
              alt={`${employee.name} Portrait`}
              className={`relative w-20 h-20 rounded-lg object-cover border-2 shadow-lg ${imgBorderClass}`}
              src={employee.profilePic}
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-surface-container-low flex justify-center items-center text-lg">
              <span>{employee.name.split("")[0]}</span>
            </div>
          )}

          {/* Custom Bottom-Right Badge */}
          {employee.badge && (
            <div
              className={`absolute -bottom-2 -right-2 w-8 h-8 ${employee.badge.bgClass} ${employee.badge.textClass} rounded-full flex items-center justify-center shadow-lg border-4 border-surface`}
            >
              <span
                className="material-symbols-outlined text-sm"
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
        <button className={`p-2 rounded-lg transition-colors ${editBtnClass}`}>
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-on-surface mb-0.5">
          {employee.name}
        </h3>
        <p className={`text-sm ${roleTextClass}`}>{employee.designation}</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-sm">call</span>
          <span className="text-xs font-mono tracking-wider">
            {employee.phone}
          </span>
        </div>
        <div className={`p-4 rounded-lg border ${advanceWrapperClass}`}>
          <p
            className={`text-[10px] uppercase tracking-widest mb-1 ${advanceLabelClass}`}
          >
            Total Advance Taken
          </p>
          <p className="text-2xl font-black text-on-surface">
            {employee.totalMonthlyAdvance}
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
