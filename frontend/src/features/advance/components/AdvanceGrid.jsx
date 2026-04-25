import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { toast } from "sonner";
import AdvanceCard from "./AdvanceCard";
import AdvanceForm from "./AdvanceForm";
import Modal from "../../../components/Modal";
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import { setSelectedMonth, deleteAdvance, getAdvanceStats } from "../../../store/slices/advance.slice";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Generate month options from employer's join date up to the current month (inclusive).
 * Returns newest first: [{ value: 'YYYY-MM', label: 'Apr 2026' }, ...]
 */
const generateMonthOptions = (joiningDateISO) => {
  const options = [];
  const start = joiningDateISO ? new Date(joiningDateISO) : new Date();
  start.setDate(1);

  const now = new Date();
  // Include the current month (unlike the dashboard which stops at prev month)
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  const cursor = new Date(end);
  while (cursor >= start) {
    const value = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
    const label = cursor.toLocaleString("en-US", { month: "short", year: "numeric" });
    options.push({ value, label });
    cursor.setMonth(cursor.getMonth() - 1);
  }
  return options;
};

/** Format a YYYY-MM string to a display label like "Apr 2026" */
const formatMonthLabel = (month) => {
  const [year, m] = month.split("-").map(Number);
  return new Date(year, m - 1, 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};

/** Group sorted advances by their date (YYYY-MM-DD) */
const groupByDate = (advances) => {
  const groups = {};
  advances.forEach((adv) => {
    const dateKey = new Date(adv.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (!groups[dateKey]) groups[dateKey] = { items: [], total: 0 };
    groups[dateKey].items.push(adv);
    groups[dateKey].total += Number(adv.amount);
  });
  // Sort groups by date descending
  return Object.entries(groups).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );
};

// ─── Skeleton row ─────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="glass-card rounded-lg p-6 border border-outline-variant/10 flex items-center gap-4 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-surface-container-high/60 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3.5 w-36 rounded bg-surface-container-high/60" />
      <div className="h-2.5 w-24 rounded bg-surface-container-high/60" />
    </div>
    <div className="h-6 w-16 rounded bg-surface-container-high/60" />
  </div>
);



// ─── Main Component ───────────────────────────────────────────────────────────
const AdvanceGrid = () => {
  const dispatch = useDispatch();
  const { advances, loading, selectedMonth } = useSelector(
    (state) => state.advance
  );
  const { employer } = useSelector((state) => state.auth);

  // Build month options from employer join date → current month, newest first
  const MONTH_OPTIONS = useMemo(
    () => generateMonthOptions(employer?.createdAt),
    [employer?.createdAt]
  );

  const [editingAdvance, setEditingAdvance] = useState(null);
  const [deletingAdvance, setDeletingAdvance] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const groupedAdvances = useMemo(
    () => groupByDate(advances ?? []),
    [advances]
  );

  const handleMonthChange = (e) => {
    dispatch(setSelectedMonth(e.target.value));
  };

  const handleEdit = (advance) => setEditingAdvance(advance);
  const handleDelete = (advance) => setDeletingAdvance(advance);

  const handleConfirmDelete = () => {
    if (!deletingAdvance) return;
    setIsDeleting(true);
    dispatch(deleteAdvance(deletingAdvance._id))
      .unwrap()
      .then(() => {
        toast.success("Advance deleted successfully");
        setDeletingAdvance(null);
        dispatch(getAdvanceStats(selectedMonth));
      })
      .catch((err) => {
        toast.error(err?.message ?? "Failed to delete advance");
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <div>
      {/* ── Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <h3 className="text-2xl font-extrabold text-on-surface tracking-tight">
          Recent Advances
        </h3>

        {/* Month Filter */}
        <div className="relative inline-block w-48">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
            <FaCalendarAlt className="size-3.5" />
          </div>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="w-full appearance-none bg-surface-container-high border border-outline-variant/10 text-on-surface text-sm font-bold rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:border-primary/50 cursor-pointer transition-colors"
          >
            {MONTH_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
            <FaChevronDown className="text-[10px]" />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="space-y-4">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : (
        <div className="space-y-12">
          {groupedAdvances.length > 0 ? (
            groupedAdvances.map(([date, data]) => (
              <div key={date} className="space-y-4">
                {/* Date Header with Day Total */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-surface-container-high/80 border border-outline-variant/10 px-4 py-2 rounded-lg inline-flex items-center gap-3">
                    <span className="text-sm font-black text-on-surface tracking-wide">
                      {date}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-outline-variant/30" />
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Total:{" "}
                      <span className="text-primary ml-0.5">
                        ₹ {data.total.toLocaleString("en-IN")}
                      </span>
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-outline-variant/10" />
                </div>

                <div className="flex flex-col gap-4">
                  {data.items.map((advance) => (
                    <AdvanceCard
                      key={advance._id}
                      advance={advance}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-surface-container-high/30 rounded-xl border border-outline-variant/10 border-dashed">
              <p className="text-on-surface-variant text-sm font-bold">
                No advances found for {formatMonthLabel(selectedMonth)}
              </p>
              <p className="text-on-surface-variant/50 text-xs mt-1">
                Try selecting a different month from the filter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingAdvance && (
        <Modal>
          <AdvanceForm
            isModalOpen={Boolean(editingAdvance)}
            setIsModalOpen={() => setEditingAdvance(null)}
            advance={editingAdvance}
          />
        </Modal>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deletingAdvance && (
        <Modal>
          <DeleteConfirmationDialog
            title="Delete Advance"
            entityName={deletingAdvance.employeeId?.name ?? deletingAdvance.employeeName ?? "this advance"}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeletingAdvance(null)}
            loading={isDeleting}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdvanceGrid;
