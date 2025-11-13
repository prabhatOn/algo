import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  useTheme,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Target,
  Clock,
  BarChart3,
} from "lucide-react";

const stats = [
  {
    title: "Total Strategies",
    value: "24",
  
    changeType: "positive",
    icon: Target,
    color: "#3b82f6", 
  },
  {
    title: "Active Strategies",
    value: "18",

    changeType: "positive",
    icon: Activity,
    color: "#10b981", 
  },
  {
    title: "Total P&L",
    value: "₹2,45,680",

    changeType: "positive",
    icon: DollarSign,
    color: "#059669", 
  },
  {
    title: "Win Rate",
    value: "68.4%",
  
    changeType: "positive",
    icon: TrendingUp,
    color: "#8b5cf6", 
  },
  {
    title: "Avg Return",
    value: "15.2%",
  
    changeType: "negative",
    icon: BarChart3,
    color: "#f97316", 
  },
  {
    title: "Active Positions",
    value: "42",

    changeType: "positive",
    icon: Clock,
    color: "#06b6d4", 
  },
];

const StatsOverview = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
  
        const gradientBg = `linear-gradient(135deg, ${stat.color}22, ${stat.color}08)`;

        return (
          <Grid size={{xs:12,sm:4,md:4,lg:2}} key={index}>
            <Card
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 4,
                height: "100%",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                background: gradientBg,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${stat.color}44`,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: stat.color,
                  color: theme.palette.common.white,
                  width: 48,
                  height: 48,
                  mr: 2,
                  boxShadow: `0 2px 6px ${stat.color}88`,
                }}
              >
                <Icon size={24} />
              </Avatar>

              <div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                >
                  {stat.value}
                </Typography>
                
              </div>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatsOverview;
