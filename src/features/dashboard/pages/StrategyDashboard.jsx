import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import {
  Search,
  Filter,
  Plus,
  Download,
  Settings,
  Play,
  Pause,
  BarChart3,
  Target,
  TrendingUp,
} from "lucide-react";
import { Wifi, WifiOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import StatsOverview from "../components/StatsOverview";
import PerformanceChart from "../components/PerformanceChart";
import StrategyTable from "../components/StrategyTable";
import TopSubscribedStrategies from "../components/TopSubscribedStrategies";
import Breadcrumb from "../../../components/layout/full/shared/breadcrumb/Breadcrumb";
import DateRangePicker from '../../../components/shared/DateRangePicker';
import ExportReportDialog from '../../../components/shared/ExportReportDialog';
import NotificationsPanel from '../../../components/shared/NotificationsPanel';
import QuickActions from '../../../components/shared/QuickActions';
import useWebSocket from '../../../hooks/useWebSocket';
import { useToast } from '../../../hooks/useToast';
const topPerformers = [
  { name: "Alpha Momentum", return: "+24.5%", risk: "Medium", winRate: "78%" },
  { name: "Beta Scalper", return: "+18.2%", risk: "Low", winRate: "72%" },
  { name: "Gamma Swing", return: "+15.8%", risk: "High", winRate: "65%" },
  { name: "Delta Hedge", return: "+21.3%", risk: "Low", winRate: "85%" },
  { name: "Epsilon Breakout", return: "+19.7%", risk: "High", winRate: "68%" },
  { name: "Zeta Momentum", return: "+16.4%", risk: "Medium", winRate: "74%" },
  { name: "Theta Scalper", return: "+14.9%", risk: "Low", winRate: "69%" },
];

const StrategyDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  // WebSocket for real-time strategy updates
  const { isConnected, lastMessage } = useWebSocket('mock://localhost:8080', {
    onMessage: (data) => {
      console.log('Real-time strategy update:', data);
    },
  });

  useEffect(() => {
    if (lastMessage) {
      console.log('Processing strategy update:', lastMessage);
    }
  }, [lastMessage]);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    showToast('Date range updated', 'info');
  };

  const handleExport = async (exportData) => {
    try {
      console.log('Exporting strategies:', exportData);
      showToast('Strategies exported successfully', 'success');
    } catch {
      showToast('Failed to export strategies', 'error');
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'newStrategy':
        navigate('/user/strategies/create');
        break;
      case 'newTrade':
        showToast('New trade feature coming soon', 'info');
        break;
      case 'refresh':
        window.location.reload();
        break;
      case 'export':
        setExportDialogOpen(true);
        break;
      case 'notifications':
        setNotificationsPanelOpen(true);
        break;
      default:
        break;
    }
  };
  const [filterStatus, setFilterStatus] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 4 }}>
      {/* Header */}
     <Breadcrumb title="Strategy Dashboard"/>

      <Box px={4} mt={4}>
        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Grid */}
        <Grid container spacing={3} mt={1}>
          {/* Left Column */}
          <Grid size={{xs:12,md:12,sm:12,lg:7}}>
            <Box display="flex" flexDirection="column" gap={3}>
              <PerformanceChart timeRange={timeRange} setTimeRange={setTimeRange} />

              {/* Strategy Table */}
              <Card>
                <CardHeader
                  title={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Target size={20} />
                      <Typography variant="h6">Active Strategies</Typography>
                    </Box>
                  }
                  action={
                    <Box display="flex" gap={2}>
                      <TextField
                        size="small"
                        placeholder="Search strategies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search size={16} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          label="Status"
                          startAdornment={<Filter size={16} style={{ marginRight: 4 }} />}
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="paused">Paused</MenuItem>
                          <MenuItem value="stopped">Stopped</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  }
                />
                <CardContent>
                  <StrategyTable searchTerm={searchTerm} filterStatus={filterStatus} />
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid size={{xs:12,md:12,sm:12,lg:5}}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Quick Actions */}
              <Card>
                <CardHeader title="Quick Actions" />
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button fullWidth variant="outlined" startIcon={<Play />}>
                    Start All Strategies
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<Pause />}>
                    Pause All Strategies
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<Settings />}>
                    Global Settings
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<BarChart3 />}>
                    Analytics Report
                  </Button>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader
                  title={
                    <Box display="flex" alignItems="center" gap={1}>
                      <TrendingUp size={20} color="green" />
                      <Typography variant="h6">Top Performers</Typography>
                    </Box>
                  }
                />
                <Scrollbar sx={{ maxHeight: 300, overflowY: "auto" }}>
                  {topPerformers.map((strategy, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                      borderRadius={2}
                      bgcolor="action.hover"
                      mb={1}
                    >
                      <Box>
                        <Typography fontSize="0.9rem" fontWeight="500">
                          {strategy.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {strategy.risk} Risk • Win: {strategy.winRate}
                        </Typography>
                      </Box>
                      <Chip
                        label={strategy.return}
                        size="small"
                        sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: 500 }}
                      />
                    </Box>
                  ))}
                </Scrollbar>
              </Card>

              {/* Top Subscribed Strategies */}
              <TopSubscribedStrategies />
            </Box>
          </Grid>
        </Grid>

        {/* Date Range Filter */}
        <Box sx={{ mt: 3 }}>
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </Box>

        {/* Live Connection Status */}
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Chip
            icon={isConnected ? <Wifi /> : <WifiOff />}
            label={isConnected ? 'Live Updates' : 'Disconnected'}
            color={isConnected ? 'success' : 'default'}
            size="small"
          />
        </Box>
      </Box>

      {/* Quick Actions Speed Dial */}
      <QuickActions onAction={handleQuickAction} />

      {/* Export Report Dialog */}
      <ExportReportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={handleExport}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        open={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
      />
    </Box>
  );
};

export default StrategyDashboard;
