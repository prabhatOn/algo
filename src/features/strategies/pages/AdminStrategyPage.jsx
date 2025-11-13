import React, { useState } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";

import StrategyOverview from "../../dashboard/components/StrategyOverview";
import ProfitLossCard from "../components/ProfitLossCard";
import Customers from "../components/Customers";
import Followers from "../components/Followers";
import EnhancedTable from "../components/EnhancedTable";
import Trades from "../components/Trades";
import Breadcrumb from "../../../components/layout/full/shared/breadcrumb/Breadcrumb";
const dummyUsers = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "User",
}));
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
}
const StrategyPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tab, setTab] = useState(0);
  const [strategies, setStrategies] = useState([
    {
      id: "1",
      name: "Momentum Strategy",
      createdBy: "Admin",
      createdOn: "2024-06-01",
      type: "Swing",
      category: "Equity",
      status: "Active",
    },
  ]);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleToggleStatus = (id) => {
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  const BCrumb = [
    { to: "/strategies", title: "Strategies" },
    { title: "Strategies Info" },
  ];

  return (
    <Box>
      <Breadcrumb title="Strategy Overview" items={BCrumb} />
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            borderRadius: 1,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              minWidth: 120,
              px: 2,
              borderRadius: 0,
              mr: 1,
            },
          }}
        >
          <Tab label="Strategy Info" />
          <Tab label="Users" />
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <Grid container spacing={2}>
          {/* Row 1: Strategy Overview and Profit/Loss */}
          {strategies.map((strategy) => (
            <Grid size={{ xs: 12, lg: 7 }} key={strategy.id} sx={{ mt: 2 }}>
              <StrategyOverview
                strategy={strategy}
                onToggleStatus={handleToggleStatus}
              />
            </Grid>
          ))}
          <Grid size={{ xs: 12, lg: 5 }} sx={{ mt: 2 }}>
            <ProfitLossCard />
          </Grid>

          {/* Row 2: Followers + Right Column with Trades + Customers */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Followers />
          </Grid>
          <Grid size={{ xs: 12, lg: 4, md: 4 }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Trades />
              </Grid>
              <Grid item>
                <Customers />
              </Grid>
            </Grid>
          </Grid>

          {/* Row 3: Table */}
          <Grid size={12}>
            <EnhancedTable />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Paper
          variant="outlined"
        >
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
                     <TableContainer>
                       <Table size="medium" sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 16, px: 2, py: 1.5 }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 16, px: 2, py: 1.5 }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 16, px: 2, py: 1.5 }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 16, px: 2, py: 1.5 }}
                  >
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      key={user.id}
                     
                    >
                      <TableCell sx={{ px: 2, py: 2, fontSize: 16 }}>
                        {user.id}
                      </TableCell>
                      <TableCell sx={{ px: 2, py: 2, fontSize: 16 }}>
                        {user.name}
                      </TableCell>
                      <TableCell sx={{ px: 2, py: 2, fontSize: 16 }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ px: 2, py: 2 }}>
                        <Box
                          component="span"
                          sx={{
                            px: 1.5,
                            py: 1,
                            borderRadius: 1,
                            fontSize: 16,
                            color: "#fff",
                            bgcolor:
                              user.role === "Admin"
                                ? "success.main"
                                : "info.main",
                          }}
                        >
                          {user.role}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            px={2}
            gap={2}
          >
            {/* Rows Per Page Selector */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">Rows:</Typography>
              <Select
                size="small"
                value={rowsPerPage}
                onChange={(e) => {
                  handleChangeRowsPerPage(e);
                  setPage(0); // Reset to first page
                }}
              >
                {[5, 10, 25, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Showing range */}
            <Typography variant="body2" color="text.secondary">
              Showing {page * rowsPerPage + 1} -{" "}
              {Math.min((page + 1) * rowsPerPage, dummyUsers.length)} of{" "}
              {dummyUsers.length}
            </Typography>

            {/* Page Number Pagination */}
            <Pagination
              count={Math.ceil(dummyUsers.length / rowsPerPage)}
              page={page + 1}
              onChange={(event, value) => handleChangePage(event, value - 1)}
              shape="rounded"
              variant="outlined"
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  border: "1px solid",
                  borderColor: "divider",
                },
                "& .Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                  borderColor: "primary.main",
                },
                mr: 2,
                mb: 1,
                mt: 4,
              }}
            />
          </Box>
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default StrategyPage;
