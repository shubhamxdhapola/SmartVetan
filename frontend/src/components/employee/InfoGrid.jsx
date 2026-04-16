import React from "react";
import { useSelector } from "react-redux";

const InfoGrid = () => {
  const {employee} = useSelector(state => state.employee)
  return (

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Personal Details */}
      <div className="bg-surface-container p-6 rounded-xl space-y-6 hover:bg-surface-container-high transition-colors duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-headline">Contact Information</h3>
          <span className="material-symbols-outlined text-outline" data-icon="contact_page">contact_page</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary" data-icon="mail">mail</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Work Email</p>
              <p className="text-on-surface">{employee?.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary" data-icon="call">call</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Phone Number</p>
              <p className="text-on-surface">+91 {employee?.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Statutory Details */}
      <div className="bg-surface-container p-6 rounded-xl space-y-6 hover:bg-surface-container-high transition-colors duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-headline">Identity &amp; Address</h3>
          <span className="material-symbols-outlined text-outline" data-icon="verified_user">verified_user</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary" data-icon="location_on">location_on</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Current Address</p>
              <p className="text-on-surface leading-relaxed">{employee?.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary" data-icon="badge">badge</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Aadhaar Number</p>
              <p className="text-on-surface tracking-widest">{employee?.aadhar}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoGrid;
