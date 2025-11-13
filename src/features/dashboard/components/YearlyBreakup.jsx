import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box, Grid } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from '../../../components/common/DashboardCard';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
const YearlyBreakup = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const secondarylight = theme.palette.secondary.light;
  const successlight = theme.palette.success.light;
  const chartLabels = ['April', 'May', 'June'];
  const chartData = [12000, 9800, 14558];

  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      toolbar: { show: false },
      height: 155,
    },
    labels: chartLabels,
    colors: [primary, primarylight, secondarylight], 
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: { size: '75%' },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex];
        const label = w.config.labels[seriesIndex];
        return `<div style="background:${primary}; color:white; padding:6px 10px; border-radius:4px;">
                  <strong>${label}</strong><br/>₹${value.toLocaleString()}
                </div>`;
      }
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: { width: 120 },
        },
      },
    ],
  };


  return (
    <DashboardCard 
       icon={<RealEstateAgentIcon color="primary" />} 
    title="Total Sales">
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={7}>
          <Typography variant="h3" fontWeight="700">
            ₹{chartData.reduce((a, b) => a + b).toLocaleString()}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +9%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last month
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                April
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                May
              </Typography>
            </Stack>
               <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: secondarylight  }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
              June
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid size={5}>
          <Box>
            <Chart
              options={optionscolumnchart}
              series={chartData}
              type="donut"
              height="130px"
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
