import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Tooltip, Typography,
  TextField, MenuItem, Pagination, Select, Switch, Checkbox, Divider, Drawer, useMediaQuery, Avatar, Button,
  InputAdornment
} from '@mui/material';
import Scrollbar from '../../../components/custom-scroll/Scrollbar';
import PageContainer from '../../../components/common/PageContainer';
import { IconEye } from '@tabler/icons-react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useNavigate } from 'react-router-dom';
import { Close, Delete, Search } from '@mui/icons-material';
import AddUserDialog from './AddUserDialog';
import DeleteConfirm from './DeleteConfirm';
const initialRows = [
  {
    id: 1,
    name: 'Asha Verma',
    username: 'ashaV',
    email: 'asha@gmail.com',
    phone: '+91 9999999999',
    verified: false,
    status: 'Inactive',
    subscription: 'Not Subscribed',
    plan: 'Free',
    joinedDate: '2024-09-12',
  },
  {
    id: 2,
    name: 'Sunil Joshi',
    username: 'sunilj',
    email: 'sunil@gmail.com',
    phone: '+91 9876543210',
    verified: true,
    status: 'Active',
    subscription: 'Subscribed',
    plan: 'Pro',
    joinedDate: '2024-12-01',
  },
  {
    id: 3,
    name: 'Priya Nair',
    username: 'priyanair',
    email: 'priya@gmail.com',
    phone: '+91 9988776655',
    verified: true,
    status: 'Active',
    subscription: 'Subscribed',
    plan: 'Enterprise',
    joinedDate: '2024-08-10',
  },
  {
    id: 4,
    name: 'Rohan Mehta',
    username: 'rohanm',
    email: 'rohan@gmail.com',
    phone: '+91 9123456789',
    verified: false,
    status: 'Inactive',
    subscription: 'Not Subscribed',
    plan: 'Free',
    joinedDate: '2025-01-20',
  },
  {
    id: 5,
    name: 'Neha Sharma',
    username: 'nehas',
    email: 'neha@gmail.com',
    phone: '+91 8877665544',
    verified: true,
    status: 'Active',
    subscription: 'Subscribed',
    plan: 'Pro',
    joinedDate: '2024-11-05',
  },
  {
    id: 6,
    name: 'Amit Patel',
    username: 'amitp',
    email: 'amit@gmail.com',
    phone: '+91 9988001122',
    verified: false,
    status: 'Inactive',
    subscription: 'Not Subscribed',
    plan: 'Free',
    joinedDate: '2024-07-15',
  },
  {
    id: 7,
    name: 'Deepika Rao',
    username: 'deepikar',
    email: 'deepika@gmail.com',
    phone: '+91 9012345678',
    verified: true,
    status: 'Active',
    subscription: 'Subscribed',
    plan: 'Enterprise',
    joinedDate: '2024-10-03',
  },
  {
    id: 8,
    name: 'Kunal Desai',
    username: 'kunald',
    email: 'kunal@gmail.com',
    phone: '+91 9090909090',
    verified: false,
    status: 'Inactive',
    subscription: 'Not Subscribed',
    plan: 'Free',
    joinedDate: '2024-06-18',
  },
  {
    id: 9,
    name: 'Sneha Kapoor',
    username: 'snehak',
    email: 'sneha@gmail.com',
    phone: '+91 9445566778',
    verified: true,
    status: 'Active',
    subscription: 'Subscribed',
    plan: 'Pro',
    joinedDate: '2024-05-12',
  },
  {
    id: 10,
    name: 'Raj Malhotra',
    username: 'rajm',
    email: 'raj@gmail.com',
    phone: '+91 9333344455',
    verified: false,
    status: 'Inactive',
    subscription: 'Not Subscribed',
    plan: 'Free',
    joinedDate: '2024-04-25',
  },
];


const filterOptions = {
  status: ['Active', 'Inactive'],
  subscription: ['Subscribed', 'Not Subscribed'],
  plan: ['Free', 'Pro', 'Enterprise'],
  verification: ['Verified', 'Pending']
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const UserTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [deleteUser, setDeleteUser] = React.useState(null);
  const [filters, setFilters] = React.useState({ status: [], subscription: [], plan: [], verification: [] });
  const [userRows, setUserRows] = React.useState(initialRows);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [openAdd, setOpenAdd] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStatusToggle = (id) => {
    setUserRows((prevRows) =>
      prevRows.map((user) =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
      )
    );
  };

  const handleAddUser = (data) => {
  const id = Date.now();
  setUserRows((rows) => [
    {
      id,
      name: data.fullname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      plan: data.plan,
      status: 'Active',
      joinedDate: new Date().toLocaleDateString(),
      subscription: data.plan === 'Free' ? 'Not Subscribed' : 'Subscribed',
      verified: false,
    },
    ...rows,
  ]);
};

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleResetFilters = () => {
    setFilters({ status: [], subscription: [], plan: [], verification: [] });
    setSearchQuery('');
  };

  const filteredRows = userRows.filter((row) => {
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = filters.status.length === 0 || filters.status.includes(row.status);
    const matchesSubscription = filters.subscription.length === 0 || filters.subscription.includes(row.subscription);
    const matchesPlan = filters.plan.length === 0 || filters.plan.includes(row.plan);
    const matchesVerification =
      filters.verification.length === 0 ||
      (filters.verification.includes('Verified') && row.verified) ||
      (filters.verification.includes('Pending') && !row.verified);

    return matchesSearch && matchesStatus && matchesSubscription && matchesPlan && matchesVerification;
  });
  const hasFilters = Object.values(filters).some(val => val.length > 0);
  const drawer = (
    <Scrollbar
      sx={{
        width: 250,
        height: 600,
        '& .simplebar-scrollbar:before': {
          backgroundColor: primary,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: 'primary.light' }}>
              <FilterListIcon sx={{ color: 'primary.main' }} />
            </Avatar>
            <Box>
              <Typography variant="h6">Filters</Typography>
              <Typography variant="body2" color="text.secondary">Refine your users</Typography>
            </Box>
          </Box>
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ my: 0.5 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            {Object.values(filters).reduce((acc, val) => acc + val.length, 0)} filter(s) applied
          </Typography>

          <Button
            size="small"
            onClick={handleResetFilters}
            startIcon={<RestartAltIcon />}
            sx={{
              color: hasFilters ? '#fff' : 'text.secondary',
              bgcolor: hasFilters ? 'secondary.main' : 'transparent',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
              fontWeight: hasFilters ? 600 : 400,
              borderRadius: 2,
            }}
          >
            Reset
          </Button>
        </Box>

        <Divider sx={{ my: 0.5 }} />

        {Object.entries(filterOptions).map(([key, options]) => (
          <Box key={key} mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
            {options.map((option) => (
              <Box key={option} display="flex" alignItems="center">
                <Checkbox
                  size="small"
                  checked={filters[key].includes(option)}
                  onChange={() => handleFilterChange(key, option)}
                  sx={{ color: 'primary.main' }}
                />
                <Typography variant="body2">{option}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </Box>
    </Scrollbar>
  );


  return (
    <PageContainer title="User Table" description="This is the User Table page">

      <Box display="flex" overflow="hidden">
        {isMobile ? (
          <>
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
              {drawer}
            </Drawer>
            <Box
              sx={{
                position: 'fixed',
                bottom: 16,
                left: 16,
                zIndex: 1300,
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  '&:hover': { bgcolor: 'background.default' },
                }}
              >
                <FilterListIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{ width: 250, borderRight: '1px solid #e0e0e0' }}>{drawer}</Box>
        )}

        <Box flex={1} p={2} overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            mb={2}
          >

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              User Information
            </Typography>



            <Box
              display="flex"
              flexDirection={{ xs: 'column-reverse', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              justifyContent="flex-end"
              gap={2}
              width="100%"
            >
              {/* Search Bar */}
              <TextField
                size="small"
                placeholder="Search strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: '100%', sm: '250px' },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    borderRadius: 4,
                  },
                }}
              />

              {/* New API Button */}
             <Button
  variant="contained"
  sx={{ bgcolor: 'primary.main', color: '#fff', px: 3, borderRadius: 4 }}
  onClick={() => setOpenAdd(true)}
>
  + New User
</Button>
            </Box>

          </Box>

<AddUserDialog
  open={openAdd}
  onClose={() => setOpenAdd(false)}
  onSubmit={handleAddUser}
/>

          <Paper variant="outlined">
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <TableContainer>
                <Table size="medium" sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Joined Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(filteredRows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow hover key={row.id}>
                          <TableCell>
                            <Typography variant="subtitle2">{row.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{row.username}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{row.email}</Typography>
                            <Typography variant="body2" color="text.secondary">{row.phone}</Typography>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={row.status === 'Active' ? 'Click to deactivate' : 'Click to activate'}>
                              <Switch
                                checked={row.status === 'Active'}
                                onChange={() => handleStatusToggle(row.id)}
                                size="small"
                                color="success"
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>{row.joinedDate}</TableCell>
                          <TableCell>
                            <Tooltip title="View Info">
                              <IconButton
                                color="error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/admin/user-data/${row.id}`, { state: { user: row } });
                                }}
                              >
                                <IconEye size={18} />
                              </IconButton>
                            </Tooltip>
                           <Tooltip title="Delete User">
  <IconButton color="error" onClick={() => setDeleteUser(row)}>
    <Delete fontSize="small" />
  </IconButton>
</Tooltip>
<DeleteConfirm
  open={Boolean(deleteUser)}
  name={deleteUser?.name}
  onClose={() => setDeleteUser(null)}
  onConfirm={() => {
    setUserRows((rows) => rows.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);      
  }}
/>

                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

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
                  {[5, 10, 25, 50].map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Showing {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of {filteredRows.length}
              </Typography>

              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page + 1}
                onChange={(e, value) => setPage(value - 1)}
                shape="rounded"
                variant="outlined"
                color="primary"
                sx={{ mb: 1, mr: 1 }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default UserTable;
