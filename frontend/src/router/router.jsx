import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Employees from "../features/employee/Employees";
import Salary from "../features/salary/Salary";
import Advance from "../features/advance/Advance";
import Settings from "../pages/Settings";
import EmployeeDetails from "../features/employee/EmployeeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "employees",
        children: [
          { index: true, element: <Employees /> },
          { path: ":employeeId", element: <EmployeeDetails /> },
        ],
      },
      { path: "advance", element: <Advance /> },
      { path: "salary", element: <Salary /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
