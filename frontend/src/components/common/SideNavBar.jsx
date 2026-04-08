import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdDashboard,
  MdLogout,
  MdOutlinePayments,
  MdToken,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutEmployer } from "../../store/slices/auth.slice";
import { toast } from "sonner";

const SideNavTabs = [
  { label: "Dashboard", route: "/dashboard", icon: MdDashboard },
  { label: "Employees", route: "/employees", icon: FaUsers },
  { label: "Advance", route: "/advance", icon: MdAccountBalance },
  { label: "Salary", route: "/salary", icon: MdAccountBalanceWallet },
];

const SideNavBar = ({ activeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutEmployer())
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <aside className="fixed left-0 top-0 pt-8 pb-6  flex-col h-full w-64 bg-surface-container-low z-50 hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
      <div className="px-8 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
            <MdToken className="text-on-primary text-2xl" />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <h2 className="text-xl font-bold authority-text text-on-surface">
              SmartVetan
            </h2>
            <p className="text-xs uppercase label-spacing text-primary-dim">
              Enterprise HRMS
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {SideNavTabs.map(({ label, route, icon: Icon }, index) => (
          <Link
            id={index}
            to={route}
            className={`flex items-center gap-3 ${activeMenu === label && "bg-surface-container-high"} text-on-surface/90 rounded-md px-4 py-3 hover:translate-x-1 transition-transform`}
          >
            <Icon className="size-5" />
            <span className="font-medium font-['Inter'
            ]">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 space-y-2 pt-6 border-t border-outline-variant/20">
        <Link
          to="/settings"
          className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-[#192540] hover:text-[#dee5ff] hover:translate-x-1 transition-transform"
        >
          <IoSettingsSharp className="size-5" />
          <span className="font-medium text-sm font-['Inter']">Settings</span>
        </Link>
        <button
          className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-[#192540] hover:text-[#dee5ff] hover:translate-x-1 transition-transform cursor-pointer"
          onClick={handleLogout}
        >
          <MdLogout className="size-5" />
          <span className="font-medium text-sm font-['Inter']">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;
