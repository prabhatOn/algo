import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  LinearProgress,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import { Users, Zap, TrendingUp } from 'lucide-react';

const usageData = [
  {
    title: 'User Accounts',
    icon: Users,
    current: 847,
    limit: 1000,
    percentage: 84.7,
    trend: '+12%',
    status: 'warning',
    gradientFrom: '#3B82F6',
    gradientTo: '#8B5CF6',
  },
  {
    title: 'API Integrations',
    icon: Zap,
    current: 156,
    limit: 200,
    percentage: 78,
    trend: '+8%',
    status: 'good',
    gradientFrom: '#10B981',
    gradientTo: '#14B8A6',
  },
  {
    title: 'Trading Strategies',
    icon: TrendingUp,
    current: 234,
    limit: 300,
    percentage: 78,
    trend: '+15%',
    status: 'good',
    gradientFrom: '#F97316',
    gradientTo: '#EF4444',
  },
];

const getChipColor = (status) => {
  switch (status) {
    case 'good':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'error';
    default:
      return 'default';
  }
};

const UsageCard = ({
  title,
  icon: Icon,
  current,
  limit,
  percentage,
  trend,
  status,
  gradientFrom,
  gradientTo,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            width: 48,
            height: 48,
          }}
        >
          <Icon color="white" size={20} />
        </Avatar>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {current}{' '}
            <Typography component="span" variant="body2" color="text.secondary">
              of {limit} limit
            </Typography>
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'seconadary.main',
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            },
          }}
        />
        <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            label={`${percentage}% used`}
            size="small"
            sx={{ bgcolor: `${gradientFrom}33`, color: theme.palette.text.primary }}
          />
          <Typography variant="caption" color={getChipColor(status) + '.main'}>
            {trend}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default function StatsGrid() {
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        {usageData.map((data, index) => (
          <Grid size={{
            xs:12,md:4,lg:4
          }} key={index}>
            <UsageCard {...data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
