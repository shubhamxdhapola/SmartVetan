import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetEmployee } from "../../store/slices/employee.slice";
import EmployeeForm from "../forms/EmployeeForm";
import Modal from "../Modal";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";

const ActionButtons = () => {
  const { employee } = useSelector((state) => state.employee);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const setDelete = () => {
    setIsDeleting(true);
    setIsModalOpen(true);
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
      <div className="flex gap-2">
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
                employeeName={employee?.name}
                empId={employee?._id}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            ) : (
              <EmployeeForm
                isModalOpen={isModalOpen}
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
