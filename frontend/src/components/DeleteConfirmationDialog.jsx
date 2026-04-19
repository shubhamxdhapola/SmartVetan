import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../store/slices/employee.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DeleteConfirmationDialog = ({
  employeeName,
  empId,
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.employee);

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployee(empId))
      .unwrap()
      .then((res) => {
        toast.success("Employee deleted successfully");
        setIsModalOpen(false);
        navigate("/employees");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-[#000000]/80 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg bg-[#192540]/60 backdrop-blur-[20px] border border-outline-variant/15 rounded-lg overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
        {/* Warning Header with Icon */}
        <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-error-container/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-error-container/10">
            <span
              className="material-symbols-outlined text-error text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
          </div>

          <h2 className="text-2xl font-extrabold font-headline text-on-surface tracking-tight mb-4">
            Delete Employee
          </h2>

          <div className="space-y-4">
            <p className="text-on-surface leading-relaxed font-medium">
              Are you sure you want to delete this employee
            </p>
            <p className="text-on-surface-variant text-sm px-4">
              This action is permanent and cannot be undone. All payroll and
              history records for this employee will be removed from the
              Luminous Ledger system.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-surface-container-high/40 p-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            // onClick={onClose}
            className="flex-1 order-2 sm:order-1 px-6 py-4 rounded-lg font-bold text-on-surface-variant bg-transparent hover:bg-surface-bright hover:text-on-surface transition-all duration-300 border border-outline-variant/20"
            onClick={() => setIsModalOpen(false)}
          >
           Cancel
          </button>

          <button
            type="button"
            className="flex-1 order-1 sm:order-2 px-6 py-4 rounded-lg font-extrabold text-on-surface bg-gradient-to-br from-error-container to-error-dim hover:from-error hover:to-error-container transition-all duration-300 shadow-xl shadow-error-container/20 active:scale-[0.98]"
            onClick={handleDeleteEmployee}
          >
            {loading ? "Deleting" : "Delete Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
