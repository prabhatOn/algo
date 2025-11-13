// src/features/strategies/index.jsx

import StrategiesData from "./pages/AdminStrategiesData";
import StrategyPage from "./pages/AdminStrategyPage";
import MarketPlace from "./pages/MarketPlace";
import CreateStrategy from "./pages/CreateStrategy";
import UserStrategy from "./pages/UserStrategy";

export const AdminStrategyRoutes = [
  { path: 'startegies-data', element: <StrategiesData /> },
  { path: 'startegy-overview', element: <StrategyPage /> },  ];

export const UserStrategyRoutes = [
  { path: 'marketplace', element: <MarketPlace /> },
  { path: 'create', element: <CreateStrategy /> },
  { path: 'strategy-info', element: <UserStrategy /> },
];

