// OrderHistory.jsx
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  TextField,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Pagination,
  Box,
  Stack,
  Select,
  Avatar,
  Tabs,
  Tab
} from '@mui/material';
import {
  Download,
  FilterList,
  CalendarToday,
  Search,
  TrendingUp,
  TrendingDown,
  ListAlt,
  CheckCircleOutline,
  HourglassEmpty,
  Cancel,
  ShowChart
} from '@mui/icons-material';
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';

const OrderHistory = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedBrokers, setSelectedBrokers] = useState([]);
  const [anchorElMarket, setAnchorElMarket] = useState(null);
  const [anchorElBroker, setAnchorElBroker] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0);

  const marketOptions = ['Forex', 'Crypto', 'Indian'];
  const brokerOptions = {
    forex: ['MetaTrader 5', 'FXCM', 'IG Markets', 'OANDA'],
    crypto: ['Binance', 'Coinbase Pro', 'KuCoin', 'Kraken'],
    indian: ['Zerodha', 'Upstox', 'Angel One', 'ICICI Direct'],
  };


const orderData = [
  {
    id: "ORD001",
    market: "Forex",
    symbol: "EUR/USD",
    type: "Buy",
    amount: 10000,
    price: 1.085,
    currentPrice: 1.092,
    pnl: 70.0,
    pnlPercentage: 0.65,
    status: "Completed",
    date: "2024-01-15",
    broker: "MetaTrader 5",
    brokerType: "forex",
  },
  {
    id: "ORD002",
    market: "Crypto",
    symbol: "BTC/USDT",
    type: "Sell",
    amount: 0.5,
    price: 42500,
    currentPrice: 41800,
    pnl: 350.0,
    pnlPercentage: 1.65,
    status: "Completed",
    date: "2024-01-14",
    broker: "Binance",
    brokerType: "crypto",
  },
  {
    id: "ORD003",
    market: "Indian",
    symbol: "RELIANCE",
    type: "Buy",
    amount: 100,
    price: 2450.75,
    currentPrice: 2485.2,
    pnl: 3445.0,
    pnlPercentage: 1.41,
    status: "Pending",
    date: "2024-01-14",
    broker: "Zerodha",
    brokerType: "indian",
  },
  {
    id: "ORD004",
    market: "Forex",
    symbol: "GBP/JPY",
    type: "Sell",
    amount: 5000,
    price: 185.25,
    currentPrice: 183.8,
    pnl: 145.0,
    pnlPercentage: 0.78,
    status: "Completed",
    date: "2024-01-13",
    broker: "FXCM",
    brokerType: "forex",
  },
  {
    id: "ORD005",
    market: "Crypto",
    symbol: "ETH/USDT",
    type: "Buy",
    amount: 2.5,
    price: 2650.3,
    currentPrice: 2580.5,
    pnl: -174.5,
    pnlPercentage: -2.63,
    status: "Failed",
    date: "2024-01-13",
    broker: "Coinbase Pro",
    brokerType: "crypto",
  },
  {
    id: "ORD006",
    market: "Indian",
    symbol: "TCS",
    type: "Sell",
    amount: 50,
    price: 3890.5,
    currentPrice: 3925.75,
    pnl: -1762.5,
    pnlPercentage: -0.91,
    status: "Completed",
    date: "2024-01-12",
    broker: "Upstox",
    brokerType: "indian",
  },
  {
    id: "ORD007",
    market: "Forex",
    symbol: "USD/CAD",
    type: "Buy",
    amount: 8000,
    price: 1.3425,
    currentPrice: 1.3465,
    pnl: 32.0,
    pnlPercentage: 0.3,
    status: "Completed",
    date: "2024-01-12",
    broker: "IG Markets",
    brokerType: "forex",
  },
  {
    id: "ORD008",
    market: "Crypto",
    symbol: "ADA/USDT",
    type: "Buy",
    amount: 1000,
    price: 0.485,
    currentPrice: 0.512,
    pnl: 27.0,
    pnlPercentage: 5.57,
    status: "Completed",
    date: "2024-01-11",
    broker: "KuCoin",
    brokerType: "crypto",
  },
]

  const filteredOrders = orderData.filter((order) => {
    const matchSearch =
      order.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.broker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMarket = selectedMarkets.length === 0 || selectedMarkets.includes(order.market);
    const matchBroker = selectedBrokers.length === 0 || selectedBrokers.includes(order.broker);
    return matchSearch && matchMarket && matchBroker;
  });

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleMarket = (market) => {
    setSelectedMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    );
  };

  const toggleBroker = (broker) => {
    setSelectedBrokers((prev) =>
      prev.includes(broker) ? prev.filter((b) => b !== broker) : [...prev, broker]
    );
  };

  const getPnLDisplay = (pnl, pnlPercentage) => {
    const isProfit = pnl >= 0;
    return (
      <Box color={isProfit ? 'green' : 'red'}>
        <Typography variant="body2">{`${isProfit ? '+' : ''}$${pnl.toFixed(2)}`}</Typography>
        <Typography variant="caption">({`${isProfit ? '+' : ''}${pnlPercentage.toFixed(2)}%`})</Typography>
      </Box>
    );
  };

  const getStatusChip = (status) => {
    const color =
      status === 'Completed' ? 'success' : status === 'Pending' ? 'warning' : 'error';
    return <Chip label={status} color={color} size="small" variant="outlined" />;
  };

  const getMarketChip = (market) => {
    const color =
      market === 'Forex' ? 'primary' : market === 'Crypto' ? 'warning' : 'success';
    return <Chip label={market} color={color} size="small" variant="outlined" />;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box p={3}>
      <Breadcrumb title="Order History" />

      <Grid container spacing={3} mb={3}>
        {[{
          title: 'Total Orders',
          count: filteredOrders.length,
          bgcolor: 'primary',
          icon: ListAlt,
        }, {
          title: 'Completed',
          count: filteredOrders.filter((o) => o.status === 'Completed').length,
          bgcolor: 'success',
          icon: CheckCircleOutline,
        }, {
          title: 'Pending',
          count: filteredOrders.filter((o) => o.status === 'Pending').length,
          bgcolor: 'warning',
          icon: HourglassEmpty,
        }, {
          title: 'Failed',
          count: filteredOrders.filter((o) => o.status === 'Failed').length,
          bgcolor: 'error',
          icon: Cancel,
        }, {
          title: 'Total P&L',
          count: `$${filteredOrders.reduce((s, o) => s + o.pnl, 0).toFixed(2)}`,
          bgcolor: filteredOrders.reduce((s, o) => s + o.pnl, 0) >= 0 ? 'success' : 'error',
          icon: ShowChart,
        }].map((card, index) => {
          const iconColor = theme.palette[card.bgcolor]?.main || theme.palette.primary.main;
          const gradientBg = `linear-gradient(135deg, ${iconColor}22, ${iconColor}08)`;

          return (
            <Grid size={{xs:12,sm:6,md:3,lg:2.4}} key={index}>
              <Card elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 4, height: '100%', background: gradientBg, transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 8px 20px ${iconColor}44` } }}>
                <Avatar sx={{ bgcolor: iconColor, color: '#fff', width: 48, height: 48, mr: 2, boxShadow: `0 2px 6px ${iconColor}88` }}>
                  <card.icon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>{card.title}</Typography>
                  <Typography variant="h5" color="text.primary" fontWeight={700}>{card.count}</Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <TextField variant="outlined" size="small" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <Search fontSize="small" /> }} />
          <div>
            <Button onClick={(e) => setAnchorElMarket(e.currentTarget)} variant="outlined" startIcon={<FilterList />} color={selectedMarkets.length > 0 ? 'primary' : 'inherit'}>Market ({selectedMarkets.length})</Button>
            <Menu anchorEl={anchorElMarket} open={Boolean(anchorElMarket)} onClose={() => setAnchorElMarket(null)}>{marketOptions.map((market) => (<MenuItem key={market} onClick={() => toggleMarket(market)}><Checkbox checked={selectedMarkets.includes(market)} /><ListItemText primary={market} /></MenuItem>))}</Menu>
          </div>
          <div>
            <Button onClick={(e) => setAnchorElBroker(e.currentTarget)} variant="outlined" startIcon={<FilterList />} color={selectedBrokers.length > 0 ? 'primary' : 'inherit'}>Broker ({selectedBrokers.length})</Button>
            <Menu anchorEl={anchorElBroker} open={Boolean(anchorElBroker)} onClose={() => setAnchorElBroker(null)}>{[...brokerOptions.forex, ...brokerOptions.crypto, ...brokerOptions.indian].map((broker) => (<MenuItem key={broker} onClick={() => toggleBroker(broker)}><Checkbox checked={selectedBrokers.includes(broker)} /><ListItemText primary={broker} /></MenuItem>))}</Menu>
          </div>
          {(selectedMarkets.length > 0 || selectedBrokers.length > 0) && (
            <Button variant="contained" color="secondary" onClick={() => { setSelectedMarkets([]); setSelectedBrokers([]); }}>Reset Filters</Button>
          )}
        </Box>
        <Button variant="contained" startIcon={<Download />}>Export</Button>
      </Box>

  
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" sx={{mb:2}}>
          <Tab label="Orders" />
          <Tab label="Positions" />
        </Tabs>
     

      {tabValue === 0 && (
        <Card>
          <CardHeader title={`Orders `} />
          <CardContent>
            <Box overflow="auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Market</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Entry</TableCell>
                    <TableCell>Current</TableCell>
                    <TableCell>P&L</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Broker</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{getMarketChip(order.market)}</TableCell>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {order.type === 'Buy' ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                          <Typography color={order.type === 'Buy' ? 'green' : 'red'}>{order.type}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{order.market === 'Indian' ? `₹${order.price}` : `$${order.price}`}</TableCell>
                      <TableCell>{order.market === 'Indian' ? `₹${order.currentPrice}` : `$${order.currentPrice}`}</TableCell>
                      <TableCell>{getPnLDisplay(order.pnl, order.pnlPercentage)}</TableCell>
                      <TableCell>{getStatusChip(order.status)}</TableCell>
                      <TableCell>{order.broker}</TableCell>
                      <TableCell><CalendarToday fontSize="small" sx={{ mr: 1 }} />{new Date(order.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            {filteredOrders.length === 0 && (
              <Typography align="center" mt={4} color="textSecondary">No orders found.</Typography>
            )}
            <Box mt={4} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" gap={2} p={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">Rows:</Typography>
                <Select size="small" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                  {[5, 10, 25].map((num) => (<MenuItem key={num} value={num}>{num}</MenuItem>))}
                </Select>
              </Box>
              <Typography>
                Showing {filteredOrders.length === 0 ? 0 : page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, filteredOrders.length)} of {filteredOrders.length}
              </Typography>
              <Pagination count={Math.ceil(filteredOrders.length / rowsPerPage)} page={page + 1} onChange={handleChangePage} shape="rounded" color="primary" />
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
       <Card>
  <CardHeader title="Open Positions" />
  <CardContent>
    <Box overflow="auto">
      <Table>
        <TableHead>
    <TableRow>
  {[
    "S.No",
    "Strategy",
    "Script",
    "Symbol",
    "Quantity",
    "Avg. Price",
    "MTM",
    "Date",
  ].map((header, idx) => (
    <TableCell key={idx}>
      <Typography variant="subtitle1" fontWeight="bold">
        {header}
      </Typography>
    </TableCell>
  ))}
</TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(
            filteredOrders.reduce((acc, order) => {
              const key = order.symbol;
              if (!acc[key]) {
                acc[key] = {
                  ...order,
                  totalAmount: 0,
                  totalPrice: 0,
                  count: 0,
                  lastDate: order.date,
                };
              }
              acc[key].totalAmount += order.amount;
              acc[key].totalPrice += order.price * order.amount;
              acc[key].count += 1;
              acc[key].lastDate = order.date > acc[key].lastDate ? order.date : acc[key].lastDate;
              return acc;
            }, {})
          ).map(([symbol, data], index) => {
            const avgPrice = data.totalPrice / data.totalAmount;
            const mtm = (data.currentPrice - avgPrice) * data.totalAmount;
            return (
              <TableRow key={symbol}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>Strategy A</TableCell>
                <TableCell>{symbol.split("/")[0]}</TableCell>
                <TableCell>{symbol}</TableCell>
                <TableCell>{data.totalAmount}</TableCell>
                <TableCell>
                  {data.market === 'Indian' ? `₹${avgPrice.toFixed(2)}` : `$${avgPrice.toFixed(2)}`}
                </TableCell>
                <TableCell sx={{ color: mtm >= 0 ? 'green' : 'red' }}>
                  {(mtm >= 0 ? '+' : '') +
                    (data.market === 'Indian'
                      ? `₹${mtm.toFixed(2)}`
                      : `$${mtm.toFixed(2)}`)}
                </TableCell>
                <TableCell> <CalendarToday fontSize="small" sx={{ mr: 1 }} />{new Date(data.lastDate).toLocaleDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  </CardContent>
</Card>

      )}
    </Box>
  );
};

export default OrderHistory;
