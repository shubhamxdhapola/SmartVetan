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

const EmployeeForm = ({ setIsModalOpen, isEditing }) => {
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
      className="p-8 md:p-12 space-y-10 bg-background md:w-[50%] mx-auto max-h-[95vh] overflow-y-auto mt-4 relative rounded-xl border border-outline-variant/10 shadow-2xl"
      onSubmit={handleOnSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute right-4 top-4 cursor-pointer p-1 rounded-md hover:bg-surface-container-high transition-colors"
        onClick={resetForm}
        type="button"
      >
        <X className="size-5 text-on-surface-variant hover:text-on-surface duration-300" />
      </button>

      {/* Header */}
      <div>
        <h3 className="text-2xl font-black text-on-surface mb-1.5">
          {isEditing ? "Update Employee" : "Add Employee"}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Fill in the details below to {isEditing ? "update the employee's profile" : "add a new employee to the ledger"}.
        </p>
      </div>
      {/* All Fields */}
      <div className="space-y-6">
        {/* Top Section: Photo + Primary Info side by side */}
        <div className="flex items-center gap-10 justify-center">
          <ProfilePhotoSelector
            profileImg={employee?.profilePic}
            setFormData={setFormData}
          />
          <div className="flex-1 flex flex-col justify-between gap-4">
            <Input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleOnChange}
              placeholder="Ayush Sharma"
              label="Employee Name"
            />
            <Input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleOnChange}
              placeholder="name@company.com"
              label="Email Address"
            />
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
          <div className="space-y-2 md:col-span-2">
            <Input
              type="text"
              name="aadhar"
              value={formData?.aadhar}
              onChange={handleOnChange}
              placeholder="90XXX 00XXX 78XX"
              label="Aadhar Number"
            />
          </div>



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

        {/* ─── Footer ─── */}
        <div className="pt-6 flex gap-3 justify-end items-center border-t border-outline-variant/10">
          <button
            className="flex-1 md:flex-none px-7 py-3 rounded-lg font-bold text-on-surface-variant hover:text-on-surface bg-transparent hover:bg-surface-bright transition-all text-sm"
            onClick={resetForm}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex-1 md:flex-none px-7 py-3 rounded-lg font-bold text-on-primary bg-gradient-to-br from-primary-dim to-primary hover:shadow-[0_4px_16px_rgba(163,166,255,0.3)] transition-all flex items-center justify-center gap-2 text-sm"
            type="submit"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
