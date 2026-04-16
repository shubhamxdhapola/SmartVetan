import React from "react";
import { useSelector } from "react-redux";

const EmployeeHero = () => {
  const { employee } = useSelector((state) => state.employee);
  return (
    <section className="relative rounded-xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-secondary-container via-primary-dim to-primary-container opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-surface overflow-hidden shadow-xl">
              <img
                alt={employee?.name}
                className="w-full h-full object-cover"
                data-alt="Close-up portrait of a male professional with a confident expression, soft studio lighting on dark background"
                src={employee?.profilePic}
              />
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-tertiary-container rounded-full flex items-center justify-center border-2 border-surface animate-pulse">
              <div className="w-2 h-2 bg-on-tertiary-container rounded-full"></div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold font-headline text-on-primary-container tracking-tight">
              {employee?.name}
            </h1>
            <p className="text-on-primary-container/80 font-medium mt-1">
              {employee?.designation}•{" "}
              <span className="opacity-75">EMP-{employee?._id.slice(-3).toUpperCase()}</span>
            </p>
            {/* <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-4 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-sm text-on-primary-container text-xs font-semibold">
                Engineering
              </span>
              <span className="px-4 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-sm text-on-primary-container text-xs font-semibold">
                Remote
              </span>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3 bg-surface-container-lowest/10 backdrop-blur-md p-6 rounded-xl border border-on-primary-container/10">
          <p className="text-xs uppercase tracking-widest text-on-primary-container/70 font-bold">
            Monthly Salary
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-on-primary-container">
              ₹
            </span>
            <span className="text-5xl font-extrabold font-headline text-on-primary-container">
              {employee?.salary.toLocaleString('en-IN')}
            </span>
          </div>
          <button className="mt-2 px-8 py-2.5 bg-on-primary-container text-primary-container font-bold rounded-full flex items-center gap-2 hover:bg-surface-bright hover:text-on-surface transition-all active:scale-95">
            <span
              className="material-symbols-outlined text-sm"
              data-icon="edit"
            >
              edit
            </span>
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmployeeHero;
