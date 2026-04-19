import React, { useEffect, useState } from "react";
import ProfilePhotoSelector from "../common/ProfilePhotoSelector";
import Input from "../common/Input";
import { X } from "lucide-react";
import { validateEmployeeForm } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
} from "../../store/slices/employee.slice";
import { toast } from "sonner";
import dayjs from "dayjs";

const EmployeeForm = ({ isModalOpen, setIsModalOpen, isEditing }) => {
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);

  const defaultFormData = {
    name: isEditing ? employee?.name : "",
    email: isEditing ? employee?.email : "",
    phone: isEditing ? employee?.phone : "",
    salary: isEditing ? employee?.salary : null,
    designation: isEditing ? employee?.designation : "",
    address: isEditing ? employee?.address : "",
    aadhar: isEditing ? employee?.aadhar : "",
    profilePic: isEditing ? employee?.profilePic : "",
    joiningDate: isEditing
      ? dayjs(employee?.joiningDate).format("YYYY-MM-DD")
      : "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setIsModalOpen(false);
  };

  const handleSubmitForm = () => {
    const action = isEditing
      ? updateEmployee({
          employeeId: employee?._id,
          employeeData: formData,
        })
      : addEmployee(formData);

    dispatch(action)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        // dispatch(getEmployees());
        resetForm();
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const isFormOkay = validateEmployeeForm(
      formData?.name,
      formData?.phone,
      formData?.email,
      formData?.salary,
      formData?.aadhar,
    );
    if (isFormOkay === true) {
      handleSubmitForm();
    }
  };

  return (
    <form
      className="p-8 md:p-12 space-y-10 bg-background md:w-[50%] mx-auto max-h-[95vh] overflow-scroll mt-4 relative"
      onSubmit={handleOnSubmit}
    >
      <button
        className="absolute right-2 top-2 cursor-pointer"
        onClick={resetForm}
        type="button"
      >
        <X className="size-5 hover:text-on-surface/70 duration-300" />
      </button>
      <ProfilePhotoSelector
        profileImg={employee?.profilePic}
        setFormData={setFormData}
      />

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleOnChange}
            placeholder="Ayush Sharma"
            label="Employee Name"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleOnChange}
            placeholder="name@company.com"
            label="Email Address"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Input
            type="text"
            name="phone"
            value={formData?.phone}
            onChange={handleOnChange}
            placeholder="+91 XXXXX XXXXX"
            label="Phone Number"
          />
        </div>

        {/* Base Salary */}
        <div className="space-y-2">
          <Input
            type="number"
            name="salary"
            value={formData?.salary}
            onChange={handleOnChange}
            placeholder="₹ 15,000"
            label="Base Salary"
          />
        </div>

        {/* Joining Date */}
        <div className="space-y-2">
          <Input
            type="date"
            name="joiningDate"
            value={formData?.joiningDate}
            onChange={handleOnChange}
            label="Joining Date"
          />
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Input
            type="text"
            name="designation"
            value={formData?.designation}
            onChange={handleOnChange}
            placeholder="Software Developer"
            label="Designation"
          />
        </div>

        {/* Aadhaar Number */}
        <div className="space-y-2">
          <Input
            type="text"
            name="aadhar"
            value={formData?.aadhar}
            onChange={handleOnChange}
            placeholder="90XXX 00XXX 78XX"
            label="Aadhar Number"
          />
        </div>

        {/* Empty space to maintain grid alignment */}
        <div className="hidden md:block"></div>

        {/* Residential Address */}
        <div className="space-y-2 md:col-span-2">
          <label className="font-label uppercase tracking-widest text-on-surface-variant text-[10px] font-bold ml-1 inline-block">
            Residential Address
          </label>
          <div className="relative">
            <textarea
              className="w-full bg-surface-container-high border border-outline-variant/10 focus:border-primary/50 focus:ring-0 rounded-sm px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/30 transition-all text-sm"
              placeholder="Anand Vihar, Pune - 41220"
              rows="3"
              name="address"
              onChange={handleOnChange}
              value={formData?.address}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-outline-variant/10">
        <p className="text-[11px] text-on-surface-variant order-2 md:order-1 flex items-center">
          <span
            className="material-symbols-outlined text-sm align-middle mr-2"
            data-icon="info"
          >
            info
          </span>
          Information will be securely stored in the Vault.
        </p>
        <div className="flex gap-4 w-full md:w-auto order-1 md:order-2">
          <button
            className="flex-1 md:flex-none px-8 py-3.5 rounded-sm font-bold text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-bright transition-all boxy"
            onClick={resetForm}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex-1 md:flex-none px-12 py-3.5 rounded-sm font-bold text-on-primary bg-gradient-to-br from-primary-dim to-primary hover:shadow-[0_4px_12px_rgba(186,158,255,0.3)] transition-all flex items-center justify-center gap-2 boxy"
            type="submit"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
            <span
              className="material-symbols-outlined"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
