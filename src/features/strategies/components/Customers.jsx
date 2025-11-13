import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpRight } from '@tabler/icons-react';

import DashboardCard from '../../../components/common/DashboardCard';

const Customers = () => {
  const theme = useTheme();

  const primary = theme.palette.primary.main;

  const successMain = theme.palette.success.main;
  const successLight = theme.palette.success.light;

  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: theme.palette.text.secondary,
      toolbar: {
        show: false,
      },
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: [primary], // stroke line color
    },
    fill: {
      type: 'solid',
      opacity: 0.2,
      colors: [primary], // area fill color
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode,
      x: {
        show: false,
      },
    },
    xaxis: {
      type: 'category',
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Customers',
      data: [30, 25, 35, 20, 30, 40],
    },
  ];

  return (
    <DashboardCard
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height={105}
          width="100%"
        />
      }
    >
      <Typography variant="subtitle2" color="textSecondary">
        Total Trades Executed
      </Typography>
      <Typography variant="h4">36,358</Typography>
      <Stack direction="row" spacing={1} mt={1} alignItems="center">
        <Avatar sx={{ bgcolor: successLight, width: 24, height: 24 }}>
          <IconArrowUpRight width={18} color={successMain} />
        </Avatar>
        <Typography variant="subtitle2" fontWeight={600}>
          +9%
        </Typography>
      </Stack>
    </DashboardCard>
  );
};

export default Customers;
