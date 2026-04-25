import React from "react";

/**
 * Generic delete confirmation dialog.
 *
 * @param {string}   title       - Dialog heading, e.g. "Delete Employee"
 * @param {string}   entityName  - The name/label of the thing being deleted
 * @param {function} onConfirm   - Called when the user clicks Delete
 * @param {function} onCancel    - Called when the user clicks Cancel
 * @param {boolean}  loading     - Shows "Deleting…" and disables the button
 */
const DeleteConfirmationDialog = ({
  title = "Delete",
  entityName,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="w-full max-w-sm glass-card border border-outline-variant/20 rounded-xl shadow-2xl shadow-black/60 overflow-hidden">

      {/* Body */}
      <div className="px-6 pt-7 pb-5 flex flex-col items-center text-center gap-3">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-error/10 border border-error/20 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-error text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            delete
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold font-headline text-on-surface tracking-tight">
          {title}
        </h2>

        {/* Message */}
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Remove{" "}
          {entityName && (
            <span className="text-on-surface font-semibold">{entityName}</span>
          )}
          ? This action cannot be undone.
        </p>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant bg-transparent border border-outline-variant/25 hover:bg-surface-bright hover:text-on-surface transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-error/80 hover:bg-error transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
