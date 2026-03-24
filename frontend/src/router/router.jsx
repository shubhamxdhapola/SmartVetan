import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import Dashboard from '../features/dashboard/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        index: true,
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/dashboard',
        element : <Dashboard />
    }
])

export default router;