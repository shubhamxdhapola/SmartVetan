import React, { useState, useRef, useEffect } from "react";
import { X, Phone, Loader2 } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";
import Input from "../../../components/common/Input";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { searchEmployee } from "../../../store/slices/employee.slice";
import { validateAdvanceForm } from "../../../utils/helper";
import { addAdvance, updateAdvance, getAdvanceStats } from "../../../store/slices/advance.slice";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

// Today as YYYY-MM-DD — used for default value and max constraint
const TODAY = new Date().toISOString().split("T")[0];

/**
 * @param {function}     setIsModalOpen  - Closes the modal
 * @param {object|null}  advance         - When provided, form runs in edit mode
 */
const AdvanceForm = ({ setIsModalOpen, advance: editingAdvance = null }) => {
  const dispatch = useDispatch();
  const { searchEmployees, searchLoading } = useSelector((state) => state.employee);
  const { selectedMonth } = useSelector((state) => state.advance);

  const isEditMode = Boolean(editingAdvance);

  // Resolve pre-populated employee from the editing advance
  const preselectedEmployee = isEditMode
    ? editingAdvance.employeeId ?? null
    : null;

  const [formData, setFormData] = useState({
    employeeId: isEditMode ? (editingAdvance.employeeId?._id ?? editingAdvance.employeeId ?? "") : "",
    amount: isEditMode ? editingAdvance.amount ?? "" : "",
    reason: isEditMode ? editingAdvance.reason ?? "" : "",
    date: isEditMode
      ? (editingAdvance.date ? new Date(editingAdvance.date).toISOString().split("T")[0] : TODAY)
      : TODAY,
  });

  const [selectedEmployee, setSelectedEmployee] = useState(
    isEditMode && preselectedEmployee
      ? { ...preselectedEmployee, _id: preselectedEmployee._id ?? formData.employeeId }
      : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced employee search
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const delay = setTimeout(() => {
      dispatch(searchEmployee(searchQuery));
    }, 400);
    return () => clearTimeout(delay);
  }, [searchQuery, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "amount" ? Number(e.target.value) : e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({ employeeId: "", amount: "", reason: "" });
    setSearchQuery("");
    setShowDropdown(false);
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAdvanceForm(
      formData.employeeId,
      formData.amount,
      formData.reason
    );
    if (isValid !== true) return;

    if (isEditMode) {
      dispatch(
        updateAdvance({
          advanceId: editingAdvance._id,
          advanceData: {
            amount: formData.amount,
            reason: formData.reason,
          },
        })
      )
        .unwrap()
        .then((res) => {
          toast.success(res?.message ?? "Advance updated successfully");
          dispatch(getAdvanceStats(selectedMonth));
          resetForm();
        })
        .catch((err) => {
          toast.error(err?.message ?? "Failed to update advance");
        });
    } else {
      dispatch(addAdvance(formData))
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          dispatch(getAdvanceStats(selectedMonth));
          resetForm();
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const handleSelectEmployee = (emp) => {
    setSelectedEmployee(emp);
    setFormData((prev) => ({ ...prev, employeeId: emp._id }));
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleClearEmployee = () => {
    setSelectedEmployee(null);
    setFormData((prev) => ({ ...prev, employeeId: "" }));
    setSearchQuery("");
  };

  return (
    <form
      className="p-8 md:p-12 space-y-10 bg-background md:w-[45%] mx-auto max-h-[95vh] overflow-y-auto mt-4 relative rounded-xl border border-outline-variant/10 shadow-2xl"
      onSubmit={handleOnSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        className="absolute right-4 top-4 cursor-pointer p-1 rounded-md hover:bg-surface-container-high transition-colors"
        onClick={resetForm}
        type="button"
      >
        <X className="size-5 text-on-surface-variant hover:text-on-surface duration-300" />
      </button>

      {/* Header */}
      <div>
        <h3 className="text-2xl font-black text-on-surface mb-1.5">
          {isEditMode ? "Edit Advance" : "Record Advance"}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          {isEditMode
            ? "Update the advance details below."
            : "Fill in the details below to record a new advance payment."}
        </p>
      </div>

      <div className="space-y-7">
        {/* ─── Employee Search / Selection ─── */}
        <div className="space-y-2" ref={dropdownRef}>
          <div className="relative">
            {formData.employeeId && selectedEmployee ? (
              /* ── Selected Employee Card ── */
              <div className="w-full bg-surface-container-high/80 border border-outline-variant/10 rounded-sm px-4 py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  {selectedEmployee.profilePic ? (
                    <img
                      src={selectedEmployee.profilePic}
                      alt={selectedEmployee.name}
                      className="w-10 h-10 rounded-full flex-shrink-0 object-cover border border-outline-variant/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary-dim to-primary text-white font-black text-xs tracking-wide">
                      {getInitials(selectedEmployee.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-on-surface text-sm font-bold truncate">
                      {selectedEmployee.name}
                    </h4>
                    <p className="text-on-surface-variant text-[11px] flex items-center gap-1.5 opacity-80">
                      <span className="truncate">{selectedEmployee.designation}</span>
                      {selectedEmployee.phone && (
                        <>
                          <span className="opacity-40 text-[8px]">●</span>
                          <Phone className="size-2.5 flex-shrink-0" />
                          <span className="flex-shrink-0">{selectedEmployee.phone}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {/* In edit mode the employee cannot be changed */}
                {!isEditMode && (
                  <button
                    type="button"
                    onClick={handleClearEmployee}
                    className="text-primary hover:text-primary-fixed text-xs font-bold transition-colors px-2.5 py-1 rounded-md hover:bg-primary/10 flex-shrink-0"
                  >
                    Change
                  </button>
                )}
              </div>
            ) : (
              /* ── Search Input + Dropdown ── */
              <>
                <div onClick={() => setShowDropdown(true)}>
                  <Input
                    type="text"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    placeholder="Search by name..."
                    label="Select Employee"
                  />
                </div>

                {showDropdown && searchQuery.trim().length > 0 && (
                  <div className="absolute z-10 w-full mt-1.5 bg-surface-container-high border border-outline-variant/10 rounded-sm shadow-xl shadow-black/20 max-h-52 overflow-y-auto">
                    {searchLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="animate-spin size-5 text-primary" />
                      </div>
                    ) : searchEmployees.length > 0 ? (
                      searchEmployees.map((emp) => (
                        <div
                          key={emp._id}
                          onClick={() => handleSelectEmployee(emp)}
                          className="px-4 py-3 hover:bg-primary/10 cursor-pointer border-b border-outline-variant/5 last:border-0 transition-colors flex items-center gap-3"
                        >
                          {emp.profilePic ? (
                            <img
                              src={emp.profilePic}
                              alt={emp.name}
                              className="w-10 h-10 rounded-full flex-shrink-0 object-cover border border-outline-variant/20"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary-dim to-primary text-white font-bold text-[10px]">
                              {getInitials(emp.name)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-on-surface text-sm font-bold truncate">
                              {emp.name}
                            </p>
                            <p className="text-on-surface-variant mt-0.5 text-xs tracking-wider">
                              <span>EMP-{emp._id.slice(-4).toUpperCase()}</span>
                              <span className="text-xs mx-1">●</span>
                              <span>{emp.designation}</span>
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-on-surface-variant text-sm text-center">
                        No employees found.
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ─── Amount + Date (side by side) ─── */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleOnChange}
              placeholder="₹ 5000"
              label="Advance Amount"
            />
          </div>

          <div className="space-y-2">
            <label className="font-label uppercase tracking-widest text-on-surface-variant text-[10px] font-bold ml-1 inline-block">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-on-surface-variant/50">
                <FaCalendarAlt className="size-3.5" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                max={TODAY}
                onChange={handleOnChange}
                className="w-full bg-surface-container-high border border-outline-variant/10 focus:border-primary/50 focus:ring-0 rounded-sm pl-10 pr-4 py-3.5 text-on-surface transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* ─── Reason ─── */}
        <div className="space-y-2">
          <Input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleOnChange}
            placeholder="Medical emergency, rent payment, etc."
            label="Reason"
          />
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div className="pt-6 flex gap-3 justify-end border-t border-outline-variant/10">
        <button
          className="px-7 py-3 rounded-lg font-bold text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-bright transition-all text-sm"
          onClick={resetForm}
          type="button"
        >
          Cancel
        </button>
        <button
          className="px-7 py-3 rounded-lg font-bold text-on-primary bg-gradient-to-br from-primary-dim to-primary hover:shadow-[0_4px_16px_rgba(163,166,255,0.3)] transition-all flex items-center justify-center gap-2 text-sm"
          type="submit"
        >
          {isEditMode ? "Save Changes" : "Add Advance"}
        </button>
      </div>
    </form>
  );
};

export default AdvanceForm;
