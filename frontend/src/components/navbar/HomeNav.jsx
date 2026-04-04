import { MdDashboard, MdLogout, MdToken } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutEmployer } from "../../store/slices/auth.slice";
import { toast } from "sonner";

const HomeNav = () => {
  
  const { employer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutEmployer())
      .unwrap()
      .then((res) => {
        console.log(res)
        toast.success(res?.message);
      })
      .catch((err) => toast.error(err?.message));
  };
  return (
    <nav className="sticky top-0 py-2 sm:py-3 w-full z-40 bg-surface-container-low shadow-none">
      <div className="flex justify-between items-center h-16 px-8 max-w-7xl mx-auto">
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
        <div className="flex items-center gap-3 sm:gap-4">
          {employer ? (
            <>
              <Link to="/dashboard">
                <button className="text-[#dee5ff] text-sm border border-outline-variant/30 px-4 py-2 hover:bg-surface-bright transition-colors duration-200 rounded-sm font-bold cursor-pointer flex justify-center items-center gap-1">
                  <MdDashboard className="size-4" />
                  <span className="hidden sm:inline-block">Dashboard</span>
                </button>
              </Link>

              <button
                className="text-[#dee5ff] text-sm border border-outline-variant/30 px-4 py-2.5 hover:bg-surface-bright transition-colors duration-200 rounded-sm font-bold cursor-pointer flex justify-center items-center gap-1"
                onClick={handleLogout}
              >
                <MdLogout className="size-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-[#dee5ff] text-sm border border-outline-variant/30 px-6 py-2 hover:bg-surface-bright transition-colors duration-200 rounded-sm font-bold cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-linear-to-r from-primary-dim to-primary text-on-primary-container font-bold text-sm px-6 py-2 rounded-sm cursor-pointer">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
