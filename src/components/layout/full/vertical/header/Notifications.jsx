import { useState, useEffect } from 'react';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import Scrollbar from '../../../../custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useNotifications } from '../../../../../hooks/useNotifications';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, refresh } = useNotifications();

  // Refresh notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    } catch {
      return '';
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label={`show ${unreadCount} new notifications`}
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} new`} 
              color="error" 
              size="small"
              onClick={handleMarkAllAsRead}
              sx={{ cursor: 'pointer' }}
            />
          )}
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress size={30} />
            </Box>
          ) : notifications.length === 0 ? (
            <Box p={4} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                No notifications yet
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <Box key={notification.id}>
                <MenuItem 
                  sx={{ 
                    py: 2, 
                    px: 4,
                    bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                    '&:hover': {
                      bgcolor: notification.isRead ? 'action.hover' : 'action.selected',
                    }
                  }}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  <Stack direction="row" spacing={2} width="100%">
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: notification.type === 'success' ? 'success.main' : 
                                notification.type === 'error' ? 'error.main' :
                                notification.type === 'warning' ? 'warning.main' : 'primary.main',
                      }}
                    >
                      {notification.title?.charAt(0).toUpperCase() || 'N'}
                    </Avatar>
                    <Box flex={1}>
                      <Typography
                        variant="subtitle2"
                        color="textPrimary"
                        fontWeight={notification.isRead ? 400 : 600}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="caption"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
                        {formatTime(notification.createdAt)}
                      </Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              </Box>
            ))
          )}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth
            onClick={handleClose2}
          >
            Close
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
