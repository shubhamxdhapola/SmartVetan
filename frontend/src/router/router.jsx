import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

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
        { path: "dashboard", element: <Dashboard /> }
    ],
  },
]);

export default router;
