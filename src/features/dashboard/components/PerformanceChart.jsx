import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { BarChart, TrendingUp } from "@mui/icons-material";

const tabList = ["overview", "returns", "risk"];

const PerformanceChart = ({ timeRange, setTimeRange }) => {
  const [tab, setTab] = React.useState("overview");

  return (
    <Card>
      <CardHeader
        title={
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <TrendingUp />
              <Typography variant="h6">Performance Analytics</Typography>
            </Box>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="time-range-label">Range</InputLabel>
              <Select
                labelId="time-range-label"
                value={timeRange}
                label="Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="7d">7 Days</MenuItem>
                <MenuItem value="30d">30 Days</MenuItem>
                <MenuItem value="90d">90 Days</MenuItem>
                <MenuItem value="1y">1 Year</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
      />
      <CardContent>
        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
          <Tab label="Overview" value="overview" />
          <Tab label="Returns" value="returns" />
          <Tab label="Risk Analysis" value="risk" />
        </Tabs>

        {/* Fixed height container */}
        <Box mt={3} minHeight={280}>
          {tab === "overview" && (
            <Box
              height={250}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#f0f4ff"
              borderRadius={2}
            >
              <Box textAlign="center">
                <BarChart sx={{ fontSize: 48, color: "#3b82f6" }} />
                <Typography variant="body2" color="textSecondary">
                  Performance chart visualization would go here
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Integration with charting library like Chart.js or Recharts
                </Typography>
              </Box>
            </Box>
          )}

          {tab === "returns" && (
            <Box
              height="100%"
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr 1fr" }}
              gap={2}
            >
              <Box p={2} bgcolor="#ecfdf5" borderRadius={2}>
                <Typography fontSize={14} color="green">
                  Total Return
                </Typography>
                <Typography variant="h5" color="green">
                  +24.5%
                </Typography>
              </Box>
              <Box p={2} bgcolor="#eff6ff" borderRadius={2}>
                <Typography fontSize={14} color="blue">
                  Monthly Avg
                </Typography>
                <Typography variant="h5" color="blue">
                  +8.2%
                </Typography>
              </Box>
              <Box p={2} bgcolor="#f5f3ff" borderRadius={2}>
                <Typography fontSize={14} color="purple">
                  Best Strategy
                </Typography>
                <Typography variant="h5" color="purple">
                  +45.8%
                </Typography>
              </Box>
            </Box>
          )}

          {tab === "risk" && (
            <Box
              height="100%"
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
              gap={2}
            >
              <Box p={2} bgcolor="#fff7ed" borderRadius={2}>
                <Typography fontSize={14} color="orange">
                  Max Drawdown
                </Typography>
                <Typography variant="h5" color="orange">
                  -8.4%
                </Typography>
              </Box>
              <Box p={2} bgcolor="#fee2e2" borderRadius={2}>
                <Typography fontSize={14} color="red">
                  Volatility
                </Typography>
                <Typography variant="h5" color="red">
                  12.3%
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
