// import React from 'react';
// import { Typography, Grid, Paper, Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const TopCards = () => {
//   const theme = useTheme();

//   const cards = [
//     { title: 'Total Strategies', digits: '25', bgcolor: 'success' },
//     { title: 'Active Strategies', digits: '15', bgcolor: 'success' },
//     { title: 'Inactive Strategies', digits: '10', bgcolor: 'error' },
//     { title: 'Most Used', digits: '5', bgcolor: 'info' },
//     { title: 'Admin Strategies', digits: '20', bgcolor: 'warning' },
//     { title: 'Client Strategies', digits: '5', bgcolor: 'secondary' },
//     { title: 'Private Strategies', digits: '3', bgcolor: 'success' },
//     { title: 'Public Strategies', digits: '22', bgcolor: 'secondary' },
//   ];

//   return (
//     <Grid container spacing={2}>
//       {cards.map((card, index) => (
//         <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
//           <Paper
//             elevation={3}
//             sx={{
//               borderRadius: '16px',
//               p: 3,
//               textAlign: 'center',
//               transition: 'all 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-4px)',
//                 boxShadow: theme.shadows[6],
//               },
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               color="textSecondary"
//               fontWeight={500}
//               gutterBottom
//             >
//               {card.title}
//             </Typography>

//             <Box
//               sx={{
//                 display: 'inline-block',
//                 px: 2,
//                 py: 1,
//                 borderRadius: '12px',
//                 bgcolor: theme.palette[card.bgcolor].light,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 fontWeight={700}
//                 color={theme.palette[card.bgcolor].main}
//               >
//                 {card.digits}
//               </Typography>
//             </Box>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TopCards;
import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Avatar, Tooltip, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconUser,
  IconUserCheck,
  IconUserX,
  IconUserPlus,
  IconClock,
} from '@tabler/icons-react';
import adminUserService from '../../../services/adminUserService';

const TopCards = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    new: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await adminUserService.getUserStats();
        if (result.success) {
          setStats({
            total: result.data.total || 0,
            active: result.data.active || 0,
            inactive: result.data.inactive || 0,
            new: result.data.recentSignups || 0,
            pending: 0, // Not tracked yet
          });
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { icon: IconUser, title: 'Total Users', digits: stats.total.toString(), color: 'primary' },
    { icon: IconUserCheck, title: 'Active Users', digits: stats.active.toString(), color: 'success' },
    { icon: IconUserX, title: 'Inactive Users', digits: stats.inactive.toString(), color: 'error' },
    { icon: IconUserPlus, title: 'New Users', digits: stats.new.toString(), color: 'info' },
    { icon: IconClock, title: 'Pending', digits: stats.pending.toString(), color: 'warning' },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => {
        const iconColor = theme.palette[card.color]?.main || theme.palette.primary.main;
        const gradientBg = `linear-gradient(135deg, ${iconColor}33, ${iconColor}22)`;

        const CardContent = (
          <Card
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 4,
              height: '100%',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              background: gradientBg,
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 20px ${iconColor}44`,
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: iconColor,
                color: theme.palette.common.white,
                width: 48,
                height: 48,
                mr: 2,
                boxShadow: `0 2px 6px ${iconColor}88`,
              }}
            >
              <card.icon size={24} />
            </Avatar>

            <Box>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {card.title}
              </Typography>
              {card.digits && (
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                >
                  {card.digits}
                </Typography>
              )}
            </Box>
          </Card>
        );

        return (
             <Grid size={{ xs: 12, sm: 4, lg: 2.4 }} key={index}>
            {card.title === 'Add Users' ? (
              <Tooltip title="Click to add a new user" placement="bottom">
                <Box sx={{ height: '100%' }}>{CardContent}</Box>
              </Tooltip>
            ) : (
              CardContent
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCards;
