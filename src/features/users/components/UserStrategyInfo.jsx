import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Select,
  MenuItem,
  Pagination,
  IconButton,
  Tooltip,
  Alert,
  Switch,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useStrategies } from '../../../hooks/useStrategies';
import { useToast } from '../../../hooks/useToast';
import Loader from '../../../components/common/Loader';

const UserStrategyInfo = () => {
  const theme = useTheme();
  const { strategies, loading, error, updateStrategy, deleteStrategy, refresh } = useStrategies();
  const { showSuccess, showError } = useToast();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleToggleActive = async (strategyId, currentStatus) => {
    try {
      await updateStrategy(strategyId, { isActive: !currentStatus });
      showSuccess('Strategy status updated');
      refresh();
    } catch (err) {
      showError(err.message || 'Failed to update strategy');
    }
  };

  const handleDelete = async (strategyId) => {
    if (window.confirm('Are you sure you want to delete this strategy?')) {
      try {
        await deleteStrategy(strategyId);
        showSuccess('Strategy deleted successfully');
        refresh();
      } catch (err) {
        showError(err.message || 'Failed to delete strategy');
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert severity="error" onClose={refresh}>
        {error}
      </Alert>
    );
  }

  const paginatedStrategies = strategies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const cards = [
    {
      icon: <GroupIcon />,
      title: 'Total',
      digits: strategies.length.toString(),
      color: 'primary',
    },
    {
      icon: <CheckCircleIcon />,
      title: 'Active',
      digits: strategies.filter((s) => s.isActive).length.toString(),
      color: 'success',
    },
    {
      icon: <CancelIcon />,
      title: 'Inactive',
      digits: strategies.filter((s) => !s.isActive).length.toString(),
      color: 'error',
    },
    {
      icon: <PublicIcon />,
      title: 'Public',
      digits: strategies.filter((s) => s.isPublic).length.toString(),
      color: 'info',
    },
    {
      icon: <LockIcon />,
      title: 'Private',
      digits: strategies.filter((s) => !s.isPublic).length.toString(),
      color: 'secondary',
    },
  ];

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        {cards.map((card, index) => {
          const iconColor = theme.palette[card.color]?.main || theme.palette.primary.main;
          const gradientBg = `linear-gradient(135deg, ${iconColor}33, ${iconColor}22)`;

          return (
            <Grid size= {{xs:12 ,sm:4 ,lg:2.4}} key={index}>
              <Card
                elevation={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 4,
                  height: '100%',
                  background: gradientBg,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
                  {card.icon}
                </Avatar>

                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {card.title}
                  </Typography>
                  <Typography variant="h5" color="text.primary" fontWeight={700}>
                    {card.digits}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Strategy Table */}
      <Paper variant="outlined">
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <TableContainer>
            <Table size="medium" sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Visibility</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStrategies.map((strategy, index) => (
                  <TableRow key={strategy.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{strategy.name}</Typography>
                      {strategy.description && (
                        <Typography variant="caption" color="textSecondary">
                          {strategy.description.substring(0, 50)}...
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={strategy.strategyType || 'Intraday'} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={strategy.isActive}
                        onChange={() => handleToggleActive(strategy.id, strategy.isActive)}
                        color="success"
                        size="small"
                      />
                      <Typography
                        variant="caption"
                        color={strategy.isActive ? 'success.main' : 'error.main'}
                        fontWeight="bold"
                        ml={1}
                      >
                        {strategy.isActive ? 'Active' : 'Inactive'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={strategy.isPublic ? <PublicIcon /> : <LockIcon />}
                        label={strategy.isPublic ? 'Public' : 'Private'}
                        size="small"
                        color={strategy.isPublic ? 'info' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{new Date(strategy.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Strategy" arrow>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => alert(`Viewing: ${strategy.name}`)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Strategy" arrow>
                          <IconButton
                            color="info"
                            size="small"
                            onClick={() => alert(`Editing: ${strategy.name}`)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Strategy" arrow>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDelete(strategy.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Pagination Controls */}
        <Box
          mt={4}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          p={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Rows:</Typography>
            <Select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            >
              {[5, 10, 25].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Typography>
            Showing {strategies.length === 0 ? 0 : page * rowsPerPage + 1}-
            {Math.min((page + 1) * rowsPerPage, strategies.length)} of {strategies.length}
          </Typography>

          <Pagination
            count={Math.ceil(strategies.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserStrategyInfo;