import React, { useState } from 'react';
import {
  Stack,
  Typography,
  Avatar,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import { IconArrowUpRight } from '@tabler/icons-react';
import { PieChart } from '@mui/x-charts/PieChart';
import DashboardCard from '../../../components/common/DashboardCard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const UserGrowthChart = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const [timeframe, setTimeframe] = useState('1W');

  const userGrowthData = {
    '1W': [
      { label: 'New Users', value: 120 },
      { label: 'Returning Users', value: 80 },
    ],
    '1M': [
      { label: 'New Users', value: 540 },
      { label: 'Returning Users', value: 360 },
    ],
    '3M': [
      { label: 'New Users', value: 1200 },
      { label: 'Returning Users', value: 950 },
    ],
    '6M': [
      { label: 'New Users', value: 1800 },
      { label: 'Returning Users', value: 1500 },
    ],
    '1Y': [
      { label: 'New Users', value: 3500 },
      { label: 'Returning Users', value: 3000 },
    ],
  };

  // Apply theme colors to each data point
  const chartData = userGrowthData[timeframe].map((item, index) => ({
    ...item,
    color: index === 0 ? primary : secondary,
  }));

  const totalUsers = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <DashboardCard
        icon={<GroupAddIcon color="primary" />} 
      title="User Growth"
      action={
        <FormControl size="small">
          <InputLabel id="timeframe-select-label">Period</InputLabel>
          <Select
            labelId="timeframe-select-label"
            id="timeframe-select"
            value={timeframe}
            label="Period"
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <MenuItem value="1W">1 Week</MenuItem>
            <MenuItem value="1M">1 Month</MenuItem>
            <MenuItem value="3M">3 Months</MenuItem>
            <MenuItem value="6M">6 Months</MenuItem>
            <MenuItem value="1Y">1 Year</MenuItem>
          </Select>
        </FormControl>
      }
    >
      <Box display="flex" alignItems="center" gap={6}>
        <PieChart
          series={[
            {
              innerRadius: 60,
              outerRadius: 80,
              paddingAngle: 3,
              data: chartData,
            },
          ]}
          height={190}
          width={210}
          legend={{ hidden: true }}
        />

        <Stack spacing={1}>
          <Typography variant="h3" fontWeight={700}>
            {totalUsers.toLocaleString()}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Total Users ({timeframe})
          </Typography>
          <Stack direction="column" spacing={1} alignItems="center">
            <Avatar
              sx={{ bgcolor: theme.palette.success.light, width: 27, height: 27 }}
            >
              <IconArrowUpRight width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight={600}>
              +14%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              compared to last
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </DashboardCard>
  );
};

export default UserGrowthChart;
