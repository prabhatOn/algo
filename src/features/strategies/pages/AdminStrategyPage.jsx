import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";

import StrategyOverview from "../../dashboard/components/StrategyOverview";
import ProfitLossCard from "../components/ProfitLossCard";
import Customers from "../components/Customers";
import Followers from "../components/Followers";
import EnhancedTable from "../components/EnhancedTable";
import Trades from "../components/Trades";
import Breadcrumb from "../../../components/layout/full/shared/breadcrumb/Breadcrumb";
import { adminStrategyService } from "../../../services/adminStrategyService";
import adminUserService from "../../../services/adminUserService";
import { useToast } from "../../../hooks/useToast";

const formatStrategyForOverview = (strategy) => ({
  id: strategy.id,
  name: strategy.name || "Untitled Strategy",
  createdBy: strategy.user?.name || strategy.createdBy || strategy.madeBy || "Unknown",
  createdOn: strategy.createdAt || strategy.createdOn || strategy.updatedAt || null,
  type: strategy.type || (strategy.isPublic ? "Public" : "Private"),
  category: strategy.segment || strategy.symbol || "General",
  status: strategy.isActive ? "Active" : "Inactive",
  isActive: strategy.isActive,
  madeBy: strategy.madeBy,
  user: strategy.user,
});
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
}
const StrategyPage = () => {
  const { showToast } = useToast();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tab, setTab] = useState(0);
  const [strategies, setStrategies] = useState([]);
  const [strategyStats, setStrategyStats] = useState(null);
  const [strategiesLoading, setStrategiesLoading] = useState(true);
  const [strategiesError, setStrategiesError] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUserPages, setTotalUserPages] = useState(1);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  const fetchStrategies = useCallback(async () => {
    setStrategiesLoading(true);
    setStrategiesError(null);
    try {
      const [statsRes, listRes] = await Promise.all([
        adminStrategyService.getStrategyStats(),
        adminStrategyService.getAllStrategies({ limit: 5 }),
      ]);

      let overviewList = [];

      if (statsRes?.success) {
        setStrategyStats(statsRes.data);
        if (Array.isArray(statsRes.data?.recent) && statsRes.data.recent.length) {
          overviewList = statsRes.data.recent;
        }
      } else if (statsRes?.message) {
        setStrategiesError(statsRes.message);
      }

      if (!overviewList.length) {
        if (listRes?.success) {
          overviewList = listRes.data?.strategies || [];
        } else {
          setStrategiesError(listRes?.message || "Failed to fetch strategies");
        }
      }

      setStrategies(overviewList.map(formatStrategyForOverview));
    } catch (error) {
      console.error("Failed to load strategies", error);
      setStrategiesError("Failed to load strategies");
    } finally {
      setStrategiesLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const result = await adminUserService.getAllUsers({ page: page + 1, limit: rowsPerPage });
      if (result.success) {
        const responseData = result.data || {};
        const list = responseData.users || responseData.data || [];
        const pagination = responseData.pagination || result.pagination;
        setUsers(list);
        const total = pagination?.total ?? list.length;
        setTotalUsers(total);
        const pages = pagination?.pages || Math.max(Math.ceil((total || 1) / rowsPerPage), 1);
        setTotalUserPages(pages);
      } else {
        setUsers([]);
        setTotalUsers(0);
        setTotalUserPages(1);
        setUsersError(result.error || "Failed to load users");
      }
    } catch (error) {
      console.error("Failed to load users", error);
      setUsers([]);
      setTotalUsers(0);
      setTotalUserPages(1);
      setUsersError("Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = async (id) => {
    setTogglingId(id);
    try {
      const result = await adminStrategyService.toggleStrategyStatus(id, "isActive");
      if (result.success) {
        const updated = result.data ? formatStrategyForOverview(result.data) : null;
        setStrategies((prev) =>
          prev.map((strategy) =>
            strategy.id === id
              ? updated || { ...strategy, status: strategy.status === "Active" ? "Inactive" : "Active" }
              : strategy
          )
        );
        showToast(result.message || "Strategy status updated", "success");
      } else {
        setStrategiesError(result.message || "Failed to update strategy");
        showToast(result.message || "Failed to update strategy", "error");
      }
    } catch (error) {
      console.error("Failed to toggle strategy", error);
      setStrategiesError("Failed to update strategy");
      showToast("Failed to update strategy", "error");
    } finally {
      setTogglingId(null);
    }
  };

  const BCrumb = [
    { to: "/strategies", title: "Strategies" },
    { title: "Strategies Info" },
  ];

  const startIndex = totalUsers === 0 ? 0 : page * rowsPerPage + 1;
  const endIndex = totalUsers === 0 ? 0 : Math.min((page + 1) * rowsPerPage, totalUsers);
  const paginationCount = Math.max(totalUserPages, 1);
  const currentPage = Math.min(page + 1, paginationCount);

  const selectedStrategy = useMemo(() => (strategies.length ? strategies[0] : null), [strategies]);

  const segmentRows = useMemo(() => {
    const segments = strategyStats?.bySegment || [];
    return segments.map((segment, index) => {
      const count = Number(segment?.dataValues?.count ?? segment?.count ?? 0);
      const percentage = strategyStats?.total
        ? ((count / strategyStats.total) * 100).toFixed(1)
        : null;
      return {
        id: `${segment.segment || "segment"}-${index}`,
        sno: index + 1,
        symbol: segment.segment || "Uncategorized",
        quantity: count,
        price: segment.averagePrice || "-",
        type: "Segment",
        pnl: percentage ? `${percentage}%` : `${count}`,
        currentPrice: strategyStats?.total || "-",
      };
    });
  }, [strategyStats]);

  const openOrderRows = useMemo(() =>
    strategies.map((strategy, index) => ({
      id: strategy.id || index,
      sno: index + 1,
      symbol: strategy.category || strategy.segment || strategy.symbol || "N/A",
      quantity:
        strategy.tradeCount ??
        strategy.totalTrades ??
        strategy.followersCount ??
        strategy.subscribersCount ??
        0,
      price: strategy.createdAt
        ? new Date(strategy.createdAt).toLocaleDateString()
        : "-",
      type: strategy.type || (strategy.isPublic ? "Public" : "Private"),
      currentPrice: strategy.status || (strategy.isActive ? "Active" : "Inactive"),
    })),
  [strategies]);

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
          {strategiesLoading ? (
            <Grid size={12} sx={{ mt: 2 }}>
              <Box display="flex" justifyContent="center" py={6}>
                <CircularProgress />
              </Box>
            </Grid>
          ) : strategiesError ? (
            <Grid size={12} sx={{ mt: 2 }}>
              <Alert severity="error">{strategiesError}</Alert>
            </Grid>
          ) : strategies.length ? (
            strategies.map((strategy) => (
              <Grid size={{ xs: 12, lg: 7 }} key={strategy.id} sx={{ mt: 2 }}>
                <StrategyOverview
                  strategy={strategy}
                  onToggleStatus={handleToggleStatus}
                  disabled={togglingId === strategy.id}
                />
              </Grid>
            ))
          ) : (
            <Grid size={12} sx={{ mt: 2 }}>
              <Alert severity="info">No strategies found yet.</Alert>
            </Grid>
          )}
          <Grid size={{ xs: 12, lg: 5 }} sx={{ mt: 2 }}>
            <ProfitLossCard stats={strategyStats} />
          </Grid>

          {/* Row 2: Followers + Right Column with Trades + Customers */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Followers
              segmentStats={strategyStats?.bySegment}
              recentStrategies={strategyStats?.recent}
              selectedStrategy={selectedStrategy}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4, md: 4 }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Trades stats={strategyStats} />
              </Grid>
              <Grid item>
                <Customers stats={strategyStats} />
              </Grid>
            </Grid>
          </Grid>

          {/* Row 3: Table */}
          <Grid size={12}>
            <EnhancedTable positions={segmentRows} openOrders={openOrderRows} />
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
                {usersLoading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Box display="flex" alignItems="center" justifyContent="center" py={3} gap={2}>
                        <CircularProgress size={24} />
                        <Typography variant="body2">Loading users...</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : usersError ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Alert severity="error">{usersError}</Alert>
                    </TableCell>
                  </TableRow>
                ) : users.length ? (
                  users.map((user) => (
                    <TableRow key={user.id || user.email}>
                      <TableCell sx={{ px: 2, py: 2, fontSize: 16 }}>
                        {user.id ?? "-"}
                      </TableCell>
                      <TableCell sx={{ px: 2, py: 2, fontSize: 16 }}>
                        {user.name || user.username || "Unknown"}
                      </TableCell>
                      <TableCell sx={{ px: 2, py: 2, fontSize: 16 }}>
                        {user.email || "-"}
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
                              (user.role || "User").toLowerCase() === "admin"
                                ? "success.main"
                                : "info.main",
                          }}
                        >
                          {user.role || "User"}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body2" align="center">
                        No users found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
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
                onChange={handleChangeRowsPerPage}
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
              Showing {startIndex} - {endIndex} of {totalUsers}
            </Typography>

            {/* Page Number Pagination */}
            <Pagination
              count={paginationCount}
              page={currentPage}
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
