// src/features/strategies/index.jsx

import StrategiesData from "./pages/AdminStrategiesData";
import StrategyPage from "./pages/AdminStrategyPage";
import MarketPlace from "./pages/MarketPlace";
import CreateStrategy from "./pages/CreateStrategy";
import UserStrategy from "./pages/UserStrategy";

export const AdminStrategyRoutes = [
  { path: 'startegies-data', element: <StrategiesData /> },
  { path: 'startegy-overview', element: <StrategyPage /> },
  { path: 'marketplace', element: <MarketPlace /> }, // Admin can view marketplace
  { path: 'create', element: <CreateStrategy /> }, // Admin can create strategies
];

export const UserStrategyRoutes = [
  { path: 'marketplace', element: <MarketPlace /> },
  { path: 'create', element: <CreateStrategy /> },
  { path: 'strategy-info', element: <UserStrategy /> },
];

