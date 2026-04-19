import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Modal from "../../../components/Modal";
import EmployeeForm from "../../../components/forms/EmployeeForm";

const PageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex items-end justify-between mb-12">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight flex items-center gap-4">
          Workforce Overview
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-lg text-sm">
          Unify your global workforce, growth tracking, and payroll in a single
          ledger.
        </p>
      </div>
      <button
        className="flex items-center gap-2 px-6 py-3 text-sm bg-primary/90 cursor-pointer text-on-primary-fixed font-extrabold rounded-md transition-all font-['Manrope']"
        onClick={() => setIsModalOpen(true)}
      >
        <FaUserPlus className="size-5" />
        Add Employee
      </button>
      {isModalOpen && (
        <Modal>
          <EmployeeForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </section>
  );
};

export default PageHeader;
