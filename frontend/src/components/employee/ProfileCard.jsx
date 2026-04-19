import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { employee } = useSelector((state) => state.employee);
  return (
    <section className="bg-[#0f1930] rounded-xl p-8 mb-8 border border-white/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#192540] flex items-center justify-center text-primary text-2xl font-bold tracking-widest border border-white/5 overflow-hidden">
            {employee?.profilePic ? (
              <img
                src={employee?.profilePic}
                className="object-fill w-20 h-20"
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
        <div className="space-y-5">
          <div className="text-right space-y-1"> 
            <p className="text-sm">Monthly Salary</p>
            <span className="text-xl font-['Manrope'] font-bold">
              ₹ {employee?.salary.toLocaleString("en-IN")}
            </span>
          </div>
          <button className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">receipt_long</span>
            Generate Salary
          </button>
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
