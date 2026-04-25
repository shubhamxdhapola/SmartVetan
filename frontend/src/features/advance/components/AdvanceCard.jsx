import React from "react";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../../../utils/helper";

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("");

/**
 * @param {object}   advance   - Advance object from Redux (includes populated employeeId)
 * @param {function} onEdit    - Called with the advance object to open edit modal
 * @param {function} onDelete  - Called with the advance object to trigger delete confirm
 */
const AdvanceCard = ({ advance, onEdit, onDelete }) => {

  // Support both populated employeeId object and plain employeeName (legacy)
  const employeeName =
    advance.employeeId?.name ?? advance.employeeName ?? "Unknown";

  const profilePic = advance.employeeId?.profilePic ?? null;

  const formattedDate = formatDate(advance.date);

  return (
    <div className="glass-card rounded-lg p-6 border border-outline-variant/10 hover:border-primary/20 transition-all duration-200 group bg-surface-container-high/30 hover:bg-surface-container-high/60 flex items-center justify-between gap-4">
      {/* Left: avatar + info */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {profilePic ? (
          <img
            src={profilePic}
            alt={employeeName}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover border border-outline-variant/20"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary-dim to-primary text-white font-black text-sm tracking-wide shadow-sm">
            {getInitials(employeeName)}
          </div>
        )}
        <div className="min-w-0">
          <h4 className="text-base font-bold text-on-surface truncate leading-tight">
            {employeeName}
          </h4>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span className="opacity-90 truncate">{advance.reason || "Advance Payment"}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-outline-variant/40 flex-shrink-0" />
            <span className="flex items-center gap-1 opacity-60 flex-shrink-0">
              <FaCalendarAlt className="size-2" />
              {formattedDate}
            </span>
          </p>
        </div>
      </div>

      {/* Right: amount + actions */}
      <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
        {/* Amount — hidden on mobile */}
        <div className="text-right hidden sm:block">
          <div className="flex items-baseline gap-0.5 justify-end">
            <span className="text-on-surface-variant/60 text-xs">₹</span>
            <span className="text-on-surface font-black text-lg tabular-nums">
              {Number(advance.amount).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Amount — visible only on mobile */}
        <div className="flex items-baseline gap-0.5 sm:hidden">
          <span className="text-on-surface-variant/60 text-xs">₹</span>
          <span className="text-on-surface font-black text-lg tabular-nums">
            {Number(advance.amount).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onEdit?.(advance)}
            className="p-2 text-on-surface-variant/50 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            title="Edit advance"
          >
            <FaEdit className="size-3" />
          </button>
          <button
            onClick={() => onDelete?.(advance)}
            className="p-2 text-on-surface-variant/50 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
            title="Delete advance"
          >
            <FaTrash className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceCard;
