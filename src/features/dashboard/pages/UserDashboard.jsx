import React, { useState, useEffect } from 'react';
import { Box, Chip } from '@mui/material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Wifi, WifiOff } from '@mui/icons-material';
import TopCards from '../components/TopCards';
import YearlyBreakup from '../components/YearlyBreakup';
import UserGrowthChart from '../components/UserGrowthChart';
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/common/PageContainer';
import RegisterUserData from '../components/RegisterUserData';
import DateRangePicker from '../../../components/shared/DateRangePicker';
import ExportReportDialog from '../../../components/shared/ExportReportDialog';
import NotificationsPanel from '../../../components/shared/NotificationsPanel';
import QuickActions from '../../../components/shared/QuickActions';
import useWebSocket from '../../../hooks/useWebSocket';
import { useToast } from '../../../hooks/useToast';

const BCrumb = [
  { to: '/dashboard', title: ' Dashboard' },
  { title: 'User ' },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  // WebSocket for real-time updates
  const { isConnected, lastMessage } = useWebSocket('mock://localhost:8080', {
    onMessage: (data) => {
      console.log('Real-time update:', data);
      // Update dashboard data based on WebSocket messages
    },
    onConnect: () => {
      console.log('Connected to real-time updates');
    },
    onDisconnect: () => {
      console.log('Disconnected from real-time updates');
    },
  });

  useEffect(() => {
    if (lastMessage) {
      // Handle real-time data updates
      console.log('Processing real-time data:', lastMessage);
    }
  }, [lastMessage]);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    showToast('Date range updated', 'info');
    // Fetch data for new date range
  };

  const handleExport = async (exportData) => {
    try {
      console.log('Exporting report:', exportData);
      showToast(
        `Report exported successfully as ${exportData.format.toUpperCase()}`,
        'success'
      );
    } catch {
      showToast('Failed to export report', 'error');
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

  return (
    <Box>
      <PageContainer
        title="User Dashboard"
        description="this is User Dashboard page"
      ></PageContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Breadcrumb title="User Dashboard" items={BCrumb} />
        <Chip
          icon={isConnected ? <Wifi /> : <WifiOff />}
          label={isConnected ? 'Live Updates' : 'Disconnected'}
          color={isConnected ? 'success' : 'default'}
          size="small"
        />
      </Box>

      {/* Date Range Filter */}
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />

      <Grid container spacing={3}>
        {/* column */}
        <Grid size={{ sm: 12, lg: 12 }}>
          <TopCards />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RegisterUserData />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid spacing={3} container columns={{ xs: 12, sm: 6 }}>
            <Grid size={12}>
              <YearlyBreakup />
            </Grid>
            <Grid size={12}>
              <UserGrowthChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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

export default UserDashboard;