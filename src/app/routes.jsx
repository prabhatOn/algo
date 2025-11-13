// routes/AppRoutes.jsx
import { Navigate, useRoutes } from 'react-router-dom';
import FullLayout from '../components/layout/full/FullLayout';
import ProtectedRoute from './ProtectedRoute';

// Feature Route Imports (Named Exports)
import { AdminUserRoutes, UserUserRoutes } from '../features/users';
import { AdminTradeRoutes, UserTradeRoutes } from '../features/trade';
import { AdminStrategyRoutes, UserStrategyRoutes } from '../features/strategies';
import { AdminDasRoutes, UserDasRoutes } from '../features/dashboard';
import { AdminApiRoutes, UserApiRoutes } from '../features/api';
import AuthRoutes from '../features/auth';

const AppRoutes = () => {
  const routes = useRoutes([
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/auth/*',
    children: AuthRoutes,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      ...AdminUserRoutes,
      ...AdminTradeRoutes,
      ...AdminStrategyRoutes,
      ...AdminDasRoutes,
      ...AdminApiRoutes,
    ],
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      ...UserUserRoutes,
      ...UserTradeRoutes,
      ...UserStrategyRoutes,
      ...UserDasRoutes,
      ...UserApiRoutes,
    ],
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
]);


  return routes;
};

export default AppRoutes;
