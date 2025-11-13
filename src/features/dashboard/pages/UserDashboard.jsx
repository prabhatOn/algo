import React from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import TopCards from '../components/TopCards';
import YearlyBreakup from '../components/YearlyBreakup';
import UserGrowthChart from '../components/UserGrowthChart';
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/common/PageContainer';
import RegisterUserData from '../components/RegisterUserData';
const BCrumb = [
  { to: '/dashboard', title: ' Dashboard' },
  { title: 'User ' },
];

const UserDashboard = () => {
  return (
    <Box>
      <PageContainer title="User Dashboard" description="this is User Dashboard page"></PageContainer>
      <Breadcrumb title="User Dashboard" items={BCrumb} />
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
    </Box>
  );
};


export default UserDashboard;