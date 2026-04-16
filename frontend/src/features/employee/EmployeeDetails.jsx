import React, { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import EmployeeHero from "../../components/employee/EmployeeHero";
import InfoGrid from "../../components/employee/InfoGrid";
import HistoryGrid from "../../components/employee/HistoryGrid";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEmployee } from "../../store/slices/employee.slice";

const EmployeeDetails = () => {

  const { employeeId } = useParams();
  console.log(employeeId)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployee(employeeId));
  }, [employeeId, dispatch]);

  return (
    <DashboardLayout activeMenu="Employees">
      <div className="space-y-8">
        <EmployeeHero />
        <InfoGrid />
        <HistoryGrid />
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDetails;
