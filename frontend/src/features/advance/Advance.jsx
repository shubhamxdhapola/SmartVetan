import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "./components/PageHeader";
import StatsOverview from "./components/StatsOverview";
import AdvanceGrid from "./components/AdvanceGrid";
import { getAdvancesByMonth, getAdvanceStats } from "../../store/slices/advance.slice";

const Advance = () => {
  const dispatch = useDispatch();
  const { selectedMonth } = useSelector((state) => state.advance);

  // Both the list and the stats cards are driven by the selected month
  useEffect(() => {
    if (selectedMonth) {
      dispatch(getAdvancesByMonth(selectedMonth));
      dispatch(getAdvanceStats(selectedMonth));
    }
  }, [dispatch, selectedMonth]);

  return (
    <DashboardLayout activeMenu="Advance">
      <PageHeader />
      <StatsOverview />
      <AdvanceGrid />
    </DashboardLayout>
  );
};

export default Advance;
