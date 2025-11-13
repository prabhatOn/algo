import * as React from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Tooltip, TextField,
  Switch, Button,
  InputAdornment
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { TableSortLabel } from '@mui/material';
import PageContainer from '../../../components/common/PageContainer';
import { Search } from '@mui/icons-material';
import AddApiDialog from './AddApiDialog';
import ViewApiDialog from './ViewApiDialog';
import EditApiDialog from './EditApiDialog';
import DeleteConfirm from './DeleteConfirm';

const rowsData = [
  { id: 1, name: 'Zerodha API', broker: 'Zerodha', brokerId: '232', autologin: true, status: 'Active', segment: 'Indian' },
  { id: 2, name: 'Binance API', broker: 'Binance', brokerId: '262', autologin: false, status: 'Active', segment: 'Crypto' },
  { id: 3, name: 'Binance API', broker: 'Binance', brokerId: '272', autologin: true, status: 'Pending', segment: 'Forex' },
]

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

const ApiTableHead = ({ order, orderBy, onRequestSort }) => {
  const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'API Name' },
    { id: 'broker', label: 'Broker' },
    { id: 'brokerId', label: 'Broker ID' },
    { id: 'autologin', label: 'Autologin' },
    { id: 'status', label: 'Status' },
    { id: 'segment', label: 'Segment' },
    { id: 'actions', label: 'Actions' },
  ];

  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
const ApiTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState({ status: [], segment: [] });
  const [rows, setRows] = React.useState(rowsData);
  const [openApi, setOpenApi] = React.useState(false);
  const [viewApi, setViewApi] = React.useState(null);
  const [editApi, setEditApi] = React.useState(null);
  const [deleteApi, setDeleteApi] = React.useState(null);

  const handleAddApi = (data) => {
    console.log('NEW API PAYLOAD', data);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleToggle = (id, field) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, [field]: field === 'autologin' ? !row.autologin : row.status === 'Active' ? 'Inactive' : 'Active' }
          : row
      )
    );
  };
 const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.broker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status.length === 0 || filters.status.includes(row.status);
    const matchesSegment = filters.segment.length === 0 || filters.segment.includes(row.segment);
    return matchesSearch && matchesStatus && matchesSegment;
  });
  return (
    <PageContainer title="API Table" description="This is the API Table page">
      <Box display="flex" overflow="hidden">

        <Box flex={1} p={1} overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            mb={2}
          >
          <Box
              display="flex"
              flexDirection={{ xs: 'column-reverse', sm: 'row' }}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              justifyContent="flex-end"
              gap={2}
              width="100%"
            >
              <TextField
                size="small"
                placeholder="Search APIs..."
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

              <Button
                variant="contained"
                onClick={() => setOpenApi(true)}
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  width: { xs: '100%', sm: 'auto' },
                  borderRadius: 4,
                }}
              >
                + New API
              </Button>
            </Box>
          </Box>
          <AddApiDialog
            open={openApi}
            onClose={() => setOpenApi(false)}
            onSubmit={handleAddApi}
          />
          <Paper variant="outlined">
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <TableContainer>
                <Table size="medium" >
                  <ApiTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                  <TableBody>
                    {stableSort(filteredRows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.broker}</TableCell>
                          <TableCell>{row.brokerId}</TableCell>
                          <TableCell>
                            <Tooltip title={row.autologin ? 'Click to disable' : 'Click to enable'}>
                              <Switch
                                checked={row.autologin}
                                onChange={() => handleToggle(row.id, 'autologin')}
                                size="small"
                                color="primary"
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={row.status === 'Active' ? 'Click to deactivate' : 'Click to activate'}>
                              <Switch
                                checked={row.status === 'Active'}
                                onChange={() => handleToggle(row.id, 'status')}
                                size="small"
                                color="success"
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>{row.segment}</TableCell>
                          <TableCell>
                            <Tooltip title="View">
                              <IconButton color="primary" onClick={() => setViewApi(row)}>
                                <IconEye size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton color="primary" onClick={() => setEditApi(row)}>
                                <IconEdit size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton color="error" onClick={() => setDeleteApi(row)}>
                                <IconTrash size={18} />
                              </IconButton>
                            </Tooltip>

                            <ViewApiDialog
                              open={Boolean(viewApi)}
                              api={viewApi}
                              onClose={() => setViewApi(null)}
                            />

                            <EditApiDialog
                              open={Boolean(editApi)}
                              api={editApi}
                              onClose={() => setEditApi(null)}
                              onSave={(updated) =>
                                setRows((rows) => rows.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)))
                              }
                            />

                            <DeleteConfirm
                              open={Boolean(deleteApi)}
                              name={deleteApi?.name}
                              onClose={() => setDeleteApi(null)}
                              onConfirm={() => {
                                setRows((rows) => rows.filter((r) => r.id !== deleteApi.id));
                                setDeleteApi(null);
                              }}
                            />

                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ApiTable;



