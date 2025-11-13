import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import iconUser from '../../../assets/images/svgs/icon-user-male.svg';
import iconActive from '../../../assets/images/svgs/icon-connect.svg';
import iconInactive from '../../../assets/images/svgs/icon-mailbox.svg';
import iconVerified from '../../../assets/images/svgs/icon-favorites.svg';
import iconUnverified from '../../../assets/images/svgs/icon-speech-bubble.svg';
import iconPlan from '../../../assets/images/svgs/icon-briefcase.svg';
import iconPending from '../../../assets/images/svgs/icon-dd-lifebuoy.svg';
import DashboardCard from '../../../components/common/DashboardCard';

const TopCards = () => {
  const theme = useTheme();

  const groupedCards = [
    {
      title: 'User',
      icon: <PersonIcon color="info" />,
      stats: [
        { icon: iconUser, label: 'Total', value: '12,540', color: 'info' },
        { icon: iconActive, label: 'Active Users', value: '9,450', color: 'success' },
        { icon: iconInactive, label: 'Inactive Users', value: '3,090', color: 'error' },
      ],
    },
    {
      title: 'Verification',
      icon: <VerifiedUserIcon color="primary" />,
      stats: [
        { icon: iconVerified, label: 'Verified Users' , value: '8,720', color: 'info' },
        { icon: iconUnverified, label: 'Unverified', value: '1,320', color: 'warning' },
        { icon: iconPending, label: 'Pending', value: '500', color: 'secondary' },
      ],
    },
    {
      title: 'Plan',
      icon: <WorkspacePremiumIcon color="success" />,
      stats: [
        { icon: iconPlan, label: 'Subscribers', value: '6,780', color: 'success' },

        { icon: iconPending, label: 'Pending', value: '760', color: 'secondary' },
        { icon: iconPlan, label: 'Unsubscribers', value: '5,760', color: 'secondary' },
      ],
    },
  ];

  return (
    <Grid container spacing={3}>
  {groupedCards.map((group, idx) => (
    <Grid size={{xs:12,sm:4,lg:4}} key={idx}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DashboardCard sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            {group.icon}
            <Typography variant="h6" fontWeight={800}>
              {group.title}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {group.stats.map((stat, i) => (
              <Grid
                key={i}
                sx={{ display: 'flex' }}
              >
              
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    flex: 1, 
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: `${theme.palette[stat.color].light}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={stat.icon} alt={stat.label} width="20" />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight={600}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      color={theme.palette[stat.color].main}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DashboardCard>
      </Box>
    </Grid>
  ))}
</Grid>

  );
};

export default TopCards;


