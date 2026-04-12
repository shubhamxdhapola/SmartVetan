import { FaUsers } from "react-icons/fa";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdDashboard,
} from "react-icons/md";
import { Link } from "react-router-dom";

const TABS = [
  { label: "Dashboard", Icon: MdDashboard, url: "/dashboard" },
  { label: "Employees", Icon: FaUsers, url: "/employees" },
  { label: "Advance", Icon: MdAccountBalance, url: "/advance" },
  { label: "Salary", Icon: MdAccountBalanceWallet, url: "/salary" },
];

const BottomNavBar = ({ activeMenu }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low flex justify-around items-center h-16 z-50 px-4">
      {TABS.map(({ label, Icon, url }, index) => (
        <Link
          key={index}
          to={url}
          className={`flex flex-col items-center ${label === activeMenu ? " text-[#a3a6ff]" : "text-on-surface-variant"}`}
        >
          <Icon className="size-6" />
          <span className="text-[10px] font-medium mt-1 font-['Manrope']">
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavBar;
