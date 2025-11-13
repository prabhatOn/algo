import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  Divider,
  LinearProgress,
  useTheme,
  Alert,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Tooltip, Switch } from "@mui/material";
import { useState } from "react";

import { PieChart, Pie, Cell } from "recharts";
import { useWallet } from "../../../hooks/useWallet";
import Loader from "../../../components/common/Loader";

const UserPlanPage = () => {
  const theme = useTheme();
  const { balance, loading, error, refresh } = useWallet();
  
  // Dummy plan data - in real app, would come from backend
  const planData = {
    name: "Pro Plan",
    type: "Monthly",
    price: "₹199",
    totalDays: 30,
    usedDays: 10,
    remainingDays: 20,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  };

  const usagePercentage = (planData.usedDays / planData.totalDays) * 100;

  const chartData = [
    { name: "Used", value: planData.usedDays, color: "#1976d2" },
    { name: "Remaining", value: planData.remainingDays, color: "#e0e0e0" },
  ];
  const [isActive, setIsActive] = useState(true);
  const handleSwitchChange = () => {
    setIsActive((prev) => !prev);
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

  const walletBalance = balance?.balance || 0;
  const currency = balance?.currency || 'INR';
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container spacing={1} maxWidth="lg" margin="auto" direction="column">
        {/* First Row: Plan Overview + Usage Overview */}
        <Grid container spacing={3} >
          {/* Plan Overview */}
          <Grid size={{ xs: 12, md:7 }} >
            <Card elevation={2}  >
              <CardHeader
      title={
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          <EmojiEventsIcon sx={{ color: "gold" }} />
          {planData.name}
        </Typography>
      }
      subheader={`${planData.type} subscription • ${planData.price}/month`}
      action={
        <Tooltip title={isActive ? "Active" : "Inactive"}>
          <Switch
            checked={isActive}
            onChange={handleSwitchChange}
            color="success"
          />
        </Tooltip>
      }
    />
              <CardContent>
                <Grid container spacing={3} textAlign="center"  >
                  <Grid size={{ xs: 12, sm:4 }} 
                   
                 >
                    <Box bgcolor="secondary.light" p={4} borderRadius={2}>
                      <Typography variant="h3" color="primary">
                        {planData.totalDays}
                      </Typography>
                      <Typography variant="h5" color="text.primary">Total Days</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm:4 }}>
                    <Box bgcolor="secondary.light" p={4} borderRadius={2}>
                      <Typography variant="h3" color="orange">
                        {planData.usedDays}
                      </Typography>
                      <Typography variant="h5" color="text.primary">Used Days</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm:4 }}>
                    <Box bgcolor="secondary.light" p={4} borderRadius={2}>
                      <Typography variant="h3" color="green">
                        {planData.remainingDays}
                      </Typography>
                      <Typography variant="h5" color="text.primary">Remaining </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <Typography variant="body2" mb={1}>
                    Usage Progress
                  </Typography>
                  <LinearProgress variant="determinate" value={usagePercentage} />
                  <Box mt={1} display="flex" justifyContent="space-between">
                    <Typography variant="caption">Plan Period</Typography>
                    <Typography variant="caption">
                      {planData.startDate} - {planData.endDate}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Usage Overview */}
          <Grid size={{ xs: 12, md:5 }}>
            <Card elevation={2}>
              <CardHeader
                title={
                  <Typography variant="subtitle1" display="flex" alignItems="center">
                    <AccessTimeIcon />
                    Usage Overview
                  </Typography>
                }
              />
              <CardContent sx={{ textAlign: "center" }}>
                <PieChart width={280} height={180}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h6">{usagePercentage.toFixed(1)}%</Typography>
                <Typography variant="body2">Plan Used</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Second Row: Wallet + Plan Management */}
        <Grid container spacing={3}>
          {/* Wallet Balance Overview */}
          <Grid size={{ xs: 12, md:4 }}>
            <Card elevation={2}>
              <CardHeader
                title={
                  <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                    <AccountBalanceWalletIcon color="primary" />
                    Wallet Balance
                  </Typography>
                }
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <AccountBalanceWalletIcon sx={{ fontSize: 48, color: "primary.main" }} />
                  <Typography variant="h4" fontWeight="bold">
                    {currencySymbol}{walletBalance.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">Available Balance</Typography>
                  <Button variant="outlined" color="primary" sx={{ mt: 3}}>
                    View Transaction History
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Plan Management */}
<Grid size={{ xs: 12, md:4 }}>
  <Card >
    <CardHeader
      title={
        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
          <SecurityIcon color="primary" /> Plan Management
        </Typography>
      }
      subheader="Manage your Plan and billing"
      action={
        <Button
          variant="text"
          sx={{ color: "red" }}
          
        >
          Cancel
        </Button>
      }
    />
    <CardContent>
      <Button variant="contained" fullWidth startIcon={<ArrowUpwardIcon />} sx={{ mb: 1 }}>
        Upgrade Plan
      </Button>
      <Button variant="outlined" fullWidth startIcon={<AccountBalanceWalletIcon />}  sx={{ mb: 1 }} >
        View Billing
      </Button>
    <Divider/>
      <Button variant="text" fullWidth sx={{ justifyContent: "flex-start", mt: 1 }}>
        View Past History
      </Button>
      <Button variant="text" fullWidth sx={{ justifyContent: "flex-start",mt:1  }}>
        Update Payment Method
      </Button>
    </CardContent>
  </Card>
</Grid>
{/* Payment Methods */}
<Grid size={{ xs: 12, md:4 }}>
  <Card>
    <CardHeader
      title={
        <Typography variant="h6" display="flex" alignItems="center" >
          <FlashOnIcon color="warning" />
          Payment Methods
        </Typography>
      }
      subheader="Your preferred payment options"
    />
    <CardContent>
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          p={1.5}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
        >
          <PaymentIcon color="primary" />
          <Typography variant="body1">UPI</Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          p={1.5}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
        >
          <AccountBalanceIcon color="success" />
          <Typography variant="body1">Bank Transfer</Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          p={1.5}
          border={1}
          borderColor="grey.300"
          borderRadius={2}
        >
          <AccountBalanceWalletIcon color="info" />
          <Typography variant="body1">PayPal</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
</Grid>


        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPlanPage;
