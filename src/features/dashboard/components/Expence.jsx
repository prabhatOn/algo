import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

import DashboardCard from '../../../components/common/DashboardCard';

const Expence = ({ data = {} }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;

  const totalLoss = Math.abs(data?.tradeStats?.completed?.totalPL || 0) < 0 
    ? Math.abs(data?.tradeStats?.completed?.totalPL || 0) 
    : 0;
  const otherExpenses = totalLoss * 0.1; // Approximate 10% for fees/slippage

  // chart
  const optionsexpencechart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",

      toolbar: {
        show: false,
      },
      height: 120,
    },
    labels: ["Trading Loss", "Fees", "Other"],
    colors: [error, secondary, primary],
    plotOptions: {
      pie: {
        
        donut: {
          size: '70%',
          background: 'transparent'
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriesexpencechart = [
    totalLoss > 0 ? totalLoss : 10,
    otherExpenses > 0 ? otherExpenses : 5,
    15
  ];

  return (
    <DashboardCard>
      <>
        <Typography variant="h4">${totalLoss.toFixed(2)}</Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={2}>
          Total Loss
        </Typography>
        <Chart
          options={optionsexpencechart}
          series={seriesexpencechart}
          type="donut"
          height="120"
        />
      </>
    </DashboardCard>
  );
};

export default Expence;
