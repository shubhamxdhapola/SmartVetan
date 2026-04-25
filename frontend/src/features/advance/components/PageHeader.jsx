import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../../../components/Modal";
import AdvanceForm from "./AdvanceForm";

const PageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight flex items-center gap-4">
          Advances Overview
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-lg text-sm">
          Track employee advance payments, deductions, and outstanding balances
          across your workforce.
        </p>
      </div>
      <button
        className="flex items-center gap-2 px-6 py-3 text-sm bg-primary/90 cursor-pointer text-on-primary-fixed font-extrabold rounded-md transition-all font-['Manrope'] hover:shadow-[0_4px_16px_rgba(163,166,255,0.3)] active:scale-[0.97]"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="size-3.5" />
        Add Advance
      </button>
      {isModalOpen && (
        <Modal>
          <AdvanceForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </section>
  );
};

export default PageHeader;
