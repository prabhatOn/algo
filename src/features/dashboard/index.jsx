

import UserDashboard from './pages/UserDashboard';
import StrategyDashboard from './pages/StrategyDashboard';
import DashbaordUser from './pages/DashboarUser';
import TradeDashboard from './pages/TradeDashboard';

export const AdminDasRoutes = [
  { path: 'user-dashboard', element: <UserDashboard /> },
  { path: 'strategy-dashboard', element: <StrategyDashboard /> },
  { path: 'trade-dashboard', element: <TradeDashboard /> },
  { path: 'dashboard', element: <DashbaordUser /> },
];


export const UserDasRoutes = [
  { path: 'dashboard', element: <DashbaordUser /> },
];

