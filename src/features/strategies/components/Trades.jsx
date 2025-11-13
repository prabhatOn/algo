import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box, Grid } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from '../../../components/common/DashboardCard';

const TotalROI = () => {
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const greyLight = theme.palette.grey[200];
  const successLight = theme.palette.success.light;

  const optionsDonutChart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: theme.palette.text.secondary,
      toolbar: { show: false },
      height: 160,
    },
    colors: [primary, primaryLight, greyLight],
    labels: ['2025 ROI', '2024 ROI', 'Other'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 400,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: 600,
              formatter: () => '10%',
              offsetY: 10,
            },
            total: {
              show: true,
              label: 'Total ROI',
              fontSize: '14px',
              fontWeight: 500,
              formatter: () => '10%',
            },
          },
        },
      },
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 140,
          },
        },
      },
    ],
  };

  const seriesDonutChart = [38, 40, 22]; // Total 100 = 10% ROI (e.g., scaled or dummy)

  return (
    <DashboardCard title="Total ROI">
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Typography variant="h3" fontWeight={700}>
            10%
          </Typography>
          <Stack direction="row" spacing={1} mt={4} alignItems="center">
            <Avatar sx={{ bgcolor: successLight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight={600}>
              +2%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              since last year
            </Typography>
          </Stack>

          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }} />
              <Typography variant="subtitle2" color="textSecondary">
                2025
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 9, height: 9, bgcolor: primaryLight, svg: { display: 'none' } }} />
              <Typography variant="subtitle2" color="textSecondary">
                2024
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* <Grid size={5}>
          <Box>
            <Chart
              options={optionsDonutChart}
              series={seriesDonutChart}
              type="donut"
              height={130}
            />
          </Box>
        </Grid> */}
      </Grid>
    </DashboardCard>
  );
};

export default TotalROI;
