import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, resetEmployee } from "../../store/slices/employee.slice";
import ProfileCard from "../../components/employee/ProfileCard";
import Tabs from "../../components/employee/Tabs";
import SalaryHistory from "../../components/employee/SalaryHistory";
import AdvanceHistory from "../../components/employee/AdvanceHistory";
import ActionButtons from "../../components/employee/ActionButtons";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [activeTab, setActiveTab] = useState("salary");
  const { loading } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEmployee(employeeId));
    return () => {
      dispatch(resetEmployee());
    };
  }, [employeeId, dispatch]);

  return (
    <DashboardLayout activeMenu="Employees">
      <ActionButtons />
      <ProfileCard />
      <section className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "salary" ? <SalaryHistory /> : <AdvanceHistory />}
      </section>
    </DashboardLayout>
  );
};

export default EmployeeDetails;
