import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetEmployee, deleteEmployee, updateEmployee } from "../../store/slices/employee.slice";
import EmployeeForm from "../forms/EmployeeForm";
import Modal from "../Modal";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";

const ActionButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employee, loading } = useSelector((state) => state.employee);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const setDelete = () => {
    setIsDeleting(prev => !prev);
    setIsModalOpen(prev => !prev);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEmployee(employee?._id))
      .unwrap()
      .then(() => {
        toast.success("Employee deleted successfully");
        setIsModalOpen(false);
        setIsDeleting(false);
        navigate("/employees");
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to delete employee");
        setIsDeleting(false);
      });
  };

  const handleToggleActive = () => {
    if (!employee) return;
    const newStatus = employee.isActive === false ? true : false;
    dispatch(
      updateEmployee({
        employeeId: employee._id,
        employeeData: { isActive: newStatus },
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`Employee marked as ${newStatus ? 'Active' : 'Inactive'}`);
      })
      .catch((err) => {
        toast.error(err?.message || "Failed to update status");
      });
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <Link
        to="/employees"
        className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="text-sm font-medium">Back to Employees</span>
      </Link>
      <div className="flex items-center gap-2">
        {/* Active Toggle Switch */}
        <div className="flex items-center gap-3 mr-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10">
          <span className="text-sm font-bold text-on-surface-variant">
            {employee?.isActive !== false ? "Active" : "Inactive"}
          </span>
          <button
            onClick={handleToggleActive}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed ${
              employee?.isActive !== false ? 'bg-green-500' : 'bg-surface-variant'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                employee?.isActive !== false ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="material-symbols-outlined text-xl">edit</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-error transition-all"
          onClick={setDelete}
        >
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>

        {isModalOpen && (
          <Modal>
            {isDeleting ? (
              <DeleteConfirmationDialog
                title="Delete Employee"
                entityName={employee?.name}
                onConfirm={handleConfirmDelete}
                onCancel={setDelete}
                loading={loading}
              />
            ) : (
              <EmployeeForm
                setIsModalOpen={setIsModalOpen}
                isEditing={true}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
