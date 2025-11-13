"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import {
  MoreHoriz,
  PlayArrow,
  Pause,
  Settings,
  Visibility,
  ContentCopy,
  Delete,
} from "@mui/icons-material";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";


const strategies = [
  {
    id: 1,
    name: "Alpha Momentum",
    type: "Intraday",
    status: "active",
    pnl: "+₹12,450",
    pnlType: "positive",
    winRate: "72%",
    positions: 8,
    lastTrade: "2 min ago",
    risk: "Medium",
  },
  {
    id: 2,
    name: "Beta Scalper",
    type: "Scalping",
    status: "active",
    pnl: "+₹8,920",
    pnlType: "positive",
    winRate: "68%",
    positions: 12,
    lastTrade: "5 min ago",
    risk: "Low",
  },
  {
    id: 3,
    name: "Gamma Swing",
    type: "Swing",
    status: "paused",
    pnl: "-₹2,340",
    pnlType: "negative",
    winRate: "45%",
    positions: 3,
    lastTrade: "1 hour ago",
    risk: "High",
  },
  {
    id: 4,
    name: "Delta Hedge",
    type: "Hedging",
    status: "active",
    pnl: "+₹15,680",
    pnlType: "positive",
    winRate: "85%",
    positions: 6,
    lastTrade: "10 min ago",
    risk: "Low",
  },
  {
    id: 5,
    name: "Epsilon Breakout",
    type: "Breakout",
    status: "stopped",
    pnl: "+₹5,230",
    pnlType: "positive",
    winRate: "62%",
    positions: 0,
    lastTrade: "2 hours ago",
    risk: "High",
  },
  {
    id: 6,
    name: "Zeta Momentum",
    type: "Momentum",
    status: "active",
    pnl: "+₹9,870",
    pnlType: "positive",
    winRate: "74%",
    positions: 5,
    lastTrade: "15 min ago",
    risk: "Medium",
  },
  {
    id: 7,
    name: "Theta Options",
    type: "Options",
    status: "active",
    pnl: "+₹18,450",
    pnlType: "positive",
    winRate: "81%",
    positions: 9,
    lastTrade: "8 min ago",
    risk: "High",
  },
  {
    id: 8,
    name: "Iota Arbitrage",
    type: "Arbitrage",
    status: "paused",
    pnl: "+₹3,210",
    pnlType: "positive",
    winRate: "92%",
    positions: 2,
    lastTrade: "45 min ago",
    risk: "Low",
  },
]


export default function StrategyTable({ searchTerm, filterStatus }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuStrategyId, setMenuStrategyId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuStrategyId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuStrategyId(null);
  };

  const getStatusChip = (status) => {
    const map = {
      active: { label: "Active", color: "success" },
      paused: { label: "Paused", color: "warning" },
      stopped: { label: "Stopped", color: "error" },
    };
    return (
      <Chip
        label={map[status]?.label || status}
        color={map[status]?.color || "default"}
        size="small"
      />
    );
  };

  const getRiskChip = (risk) => {
    const colors = {
      Low: "success.main",
      Medium: "warning.main",
      High: "error.main",
    };
    return (
      <Chip
        label={risk}
        variant="outlined"
        size="small"
        sx={{ color: colors[risk], borderColor: colors[risk] }}
      />
    );
  };

  const filteredStrategies = strategies.filter((strategy) => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || strategy.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Paper>
   <Scrollbar sx={{ maxHeight: 605, overflowX: "auto" }}>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Strategy</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>P&amp;L</TableCell>
                <TableCell>Win Rate</TableCell>
                <TableCell>Positions</TableCell>
                <TableCell>Risk</TableCell>
                <TableCell>Last Trade</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStrategies.map((strategy) => (
                <TableRow key={strategy.id} hover>
                  <TableCell>
                    <Typography fontWeight="bold">{strategy.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {strategy.type}
                    </Typography>
                  </TableCell>
                  <TableCell>{getStatusChip(strategy.status)}</TableCell>
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      color={strategy.pnlType === "positive" ? "success.main" : "error.main"}
                    >
                      {strategy.pnl}
                    </Typography>
                  </TableCell>
                  <TableCell>{strategy.winRate}</TableCell>
                  <TableCell>{strategy.positions}</TableCell>
                  <TableCell>{getRiskChip(strategy.risk)}</TableCell>
                  <TableCell>{strategy.lastTrade}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, strategy.id)}>
                      <MoreHoriz fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={menuStrategyId === strategy.id}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        {strategy.status === "active" ? (
                          <>
                            <Pause fontSize="small" sx={{ mr: 1 }} /> Pause Strategy
                          </>
                        ) : (
                          <>
                            <PlayArrow fontSize="small" sx={{ mr: 1 }} /> Start Strategy
                          </>
                        )}
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <Settings fontSize="small" sx={{ mr: 1 }} /> Settings
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        <ContentCopy fontSize="small" sx={{ mr: 1 }} /> Clone Strategy
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
                        <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Paper>
  );
}
