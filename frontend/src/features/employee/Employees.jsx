import React, { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "./components/PageHeader";
import StatsOverview from "./components/StatsOverview";
import EmployeeGrid from "./components/EmployeeGrid";
import { useDispatch } from "react-redux";
import { getEmployees } from "../../store/slices/employee.slice";

const Employees = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <DashboardLayout activeMenu="Employees">
      <PageHeader />
      <StatsOverview />
      <EmployeeGrid />
    </DashboardLayout>
  );
};

export default Employees;
