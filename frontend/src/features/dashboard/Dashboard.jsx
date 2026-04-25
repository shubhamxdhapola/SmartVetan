import React from "react";
import CurrentMonthStats from "./components/CurrentMonthStats";
import DailyAdvancesChart from "./components/DailyAdvancesChart";
import HistoricalData from "./components/HistoricalData";
import RecentAcitivity from "./components/RecentAcitivity";
import BottomNavBar from "./components/BottomNavBar";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardData } from "../../store/slices/dashboard.slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <CurrentMonthStats />
      <DailyAdvancesChart />
      <HistoricalData />
      <RecentAcitivity />
    </DashboardLayout>
  );
};

export default Dashboard;
