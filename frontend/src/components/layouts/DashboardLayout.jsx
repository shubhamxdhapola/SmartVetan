import TopNavBar from "../common/TopNavBar";
import SideNavBar from "../common/SideNavBar";
import BottomNavBar from "../../features/dashboard/components/BottomNavBar";

const DashboardLayout = ({ activeMenu, children }) => {
  return (
    <div className="min-h-screen">
      <TopNavBar />
      <SideNavBar activeMenu={activeMenu} /> {/* Desktop Nav */}
      <main className="md:ml-64 xl:ml-75 pt-24 px-6 md:px-8 pb-12">{children}</main>
      <BottomNavBar activeMenu={activeMenu} /> {/* Mobile Nav */}
    </div>
  );
};

export default DashboardLayout;
