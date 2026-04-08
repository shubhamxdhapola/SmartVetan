import React from "react";
import CurrentMonthStats from "./components/CurrentMonthStats";
import HistoricalData from "./components/HistoricalData";
import RecentAcitivity from "./components/RecentAcitivity";
import BottomNavBar from "./components/BottomNavBar";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardData } from "../../store/slices/dashboard.slice";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const { loading } = useSelector((state) => state.dashboard);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <Loader2 className="animate-spin" />
  //     </div>
  //   );
  // }
  return (
    <DashboardLayout activeMenu="Dashboard">
     <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10">
          <Loader2 className="animate-spin" />
        </div>
      )}
      </div>
      <CurrentMonthStats />
      <HistoricalData />
      <RecentAcitivity />
    </DashboardLayout>
  );
};

export default Dashboard;
