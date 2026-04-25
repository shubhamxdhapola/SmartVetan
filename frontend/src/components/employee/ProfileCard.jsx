import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { employee, advanceHistory } = useSelector((state) => state.employee);

  const currentMonthName = dayjs().format("MMM, YYYY");
  const currentMonthAdvance = advanceHistory?.find(h => h.month === currentMonthName)?.totalAmount || 0;

  return (
    <section className="bg-[#0f1930] rounded-xl p-8 mb-8 border border-white/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#192540] flex items-center justify-center text-primary text-2xl font-bold tracking-widest border border-white/5 overflow-hidden">
            {employee?.profilePic ? (
              <img
                src={employee?.profilePic}
                className="object-cover w-20 h-20"
              />
            ) : (
              <span>{employee?.name.split(" ")[0][0]}</span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-on-surface">
              {employee?.name}
            </h1>
            <p className="text-secondary font-medium">
              {employee?.designation}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="flex items-center gap-8 bg-surface-container-low px-6 py-4 rounded-xl border border-outline-variant/5">
            <div className="text-right space-y-1">
              <p className="text-sm text-on-surface-variant font-medium">Monthly Salary</p>
              <span className="text-2xl font-['Manrope'] font-black text-on-surface">
                ₹ {employee?.salary.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block"></div>
            <div className="text-left space-y-1">
              <p className="text-[10px] text-error/80 uppercase tracking-wider font-bold">Advance ({dayjs().format("MMM")})</p>
              <span className="text-2xl font-['Manrope'] font-black text-error">
                ₹ {currentMonthAdvance.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          {/* <button className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">receipt_long</span>
            Generate Salary
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Employee ID
            </p>
            <p className="text-on-surface font-medium text-sm">
              EMP-{employee?._id.slice(-4).toUpperCase()}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Joining Date
            </p>
            <p className="text-on-surface font-medium text-sm">
              {dayjs(employee?.joiningDate).format("DD MMM, YYYY")}
            </p>
          </div>
        </>
        <>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Phone
            </p>
            <p className="text-on-surface font-medium text-sm">
              +91{" "}
              {employee?.phone.slice(0, -5) + " " + employee?.phone.slice(-5)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Email Address
            </p>
            <p className="text-on-surface font-medium text-sm">
              {employee?.email}
            </p>
          </div>
        </>

        <>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Aadhaar Number
            </p>
            <p className="text-on-surface font-medium text-sm">
              {employee?.aadhar}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Residential Address
            </p>
            <p className="text-on-surface font-medium text-sm">
              {employee?.address}
            </p>
          </div>
        </>
      </div>
    </section>
  );
};

export default ProfileCard;
