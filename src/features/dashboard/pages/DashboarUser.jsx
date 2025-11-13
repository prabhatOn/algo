import React from 'react';
import { Grid, Box, CircularProgress, Alert } from '@mui/material';

import PageContainer from '../../../components/common/PageContainer';
import WeeklyStats from '../components/WeeklyStats';
import YearlySales from '../components/YearlySales';
import PaymentGateways from '../components/PaymentGateways';
import WelcomeCard from '../components/WelcomeCard';
import Expence from '../components/Expence';
import Growth from '../components/Growth';
import RevenueUpdates from '../components/RevenueUpdates';
import SalesOverview from '../components/SalesOverview';
import SalesTwo from '../components/SalesTwo';
import Sales from '../components/Sales';
import MonthlyEarnings from '../components/MonthlyEarnings';
import ProductPerformances from '../components/ProductPerformances';
import RecentTransactions from '../components/RecentTransactions';
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';
import { useDashboard } from '../../../hooks/useDashboard';
import Loader from '../../../components/common/Loader';

const BCrumb = [
  { to: '/dashboard/user', title: 'User' },
  { title: 'Dashboard' },
];

const DashbaordUser = () => {
  const { data, loading, error, refresh } = useDashboard('user');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PageContainer title="User Dashboard" description="this is User Dashboard page">
        <Breadcrumb title="Dashboard" items={BCrumb} />
        <Box mt={3}>
          <Alert severity="error" onClose={refresh}>
            {error}
          </Alert>
        </Box>
      </PageContainer>
    );
  }
  return (
    <PageContainer title="User Dashboard" description="this is User Dashboard page">
       <Breadcrumb title="Dashboard "  items={BCrumb}  />
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <WelcomeCard data={data} />
        </Grid>

        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid spacing={3} container columns={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Expence data={data} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Sales data={data} />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <RevenueUpdates />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <SalesOverview />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Grid container spacing={3} columns={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <SalesTwo data={data} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 'grow' }}>
              <Growth data={data} />
            </Grid>
            <Grid size={12}>
              <MonthlyEarnings data={data} />
            </Grid>
          </Grid>
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <WeeklyStats />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <YearlySales />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <PaymentGateways />
        </Grid>
        {/* column */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <RecentTransactions trades={data?.recentTrades || []} />
        </Grid>
        {/* column */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <ProductPerformances />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashbaordUser;
