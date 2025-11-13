import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Avatar } from '@mui/material';
import DashboardCard from '../../../components/common/DashboardCard';
import { IconArrowUpRight } from '@tabler/icons-react';

import icon1 from '../../../assets/images/svgs/icon-bars.svg';

const Growth = ({ data = {} }) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  const totalTrades = data?.counts?.trades || 0;
  const completedTrades = data?.tradeStats?.completed?.count || 0;
  const growthRate = totalTrades > 0 ? ((completedTrades / totalTrades) * 100) : 0;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      height: 25,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    colors: [secondary],
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      data: [0, 10, 10, 10, 35, 45, 30, 30, 30, 50, 52, 30, 25, 45, 50, 80, 60, 65],
    },
  ];

  return (
    <DashboardCard>
      <>
        <Box
          width={38}
          height={38}
          bgcolor="secondary.light"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar src={icon1} alt="img" sx={{ width: 25, height: 25 }} />
        </Box>

        <Box mt={3} mb={2}>
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="25px" />
        </Box>

        <Typography variant="h4">
          {growthRate.toFixed(0)}%
          <span>
            <IconArrowUpRight width={18} color="#39B69A" />
          </span>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Success Rate
        </Typography>
      </>
    </DashboardCard>
  );
};

export default Growth;
