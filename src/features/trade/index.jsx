import AdminOrderHistory from '../users/pages/AdminOrderHistory';
import OrderHistory from '../users/pages/OrderHistory';
import TradeInfo from './pages/TradeInfo'; 
import UserTradePanel from './pages/UserTradePanel'; 

export const AdminTradeRoutes = [
    { path: "order-history", element: <AdminOrderHistory /> },
];

export const UserTradeRoutes = [
  { path: 'trade-info', element: <TradeInfo /> },
  { path: 'trade-panel', element: <UserTradePanel /> },
    { path: "order-history", element: <OrderHistory /> },
];