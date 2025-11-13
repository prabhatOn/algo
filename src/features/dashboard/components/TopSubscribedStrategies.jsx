"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { Users, Eye, Star } from "lucide-react";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
const topSubscribedStrategies = [
  {
    id: 1,
    name: "Alpha Momentum Pro",
    subscribers: 1247,
    rating: 4.8,
    return: "+28.5%",
    risk: "Medium",
    category: "Intraday",
    creator: "TradeMaster",
  },
  {
    id: 2,
    name: "Beta Swing Elite",
    subscribers: 892,
    rating: 4.6,
    return: "+22.3%",
    risk: "Low",
    category: "Swing",
    creator: "SwingKing",
  },
  {
    id: 3,
    name: "Gamma Scalper Pro",
    subscribers: 756,
    rating: 4.7,
    return: "+19.8%",
    risk: "High",
    category: "Scalping",
    creator: "ScalpMaster",
  },
  {
    id: 4,
    name: "Delta Options Master",
    subscribers: 634,
    rating: 4.5,
    return: "+31.2%",
    risk: "High",
    category: "Options",
    creator: "OptionsPro",
  },
  {
    id: 5,
    name: "Epsilon Hedge Fund",
    subscribers: 523,
    rating: 4.9,
    return: "+15.6%",
    risk: "Low",
    category: "Hedging",
    creator: "HedgeMaster",
  },
  {
    id: 6,
    name: "Zeta Breakout King",
    subscribers: 445,
    rating: 4.4,
    return: "+25.7%",
    risk: "Medium",
    category: "Breakout",
    creator: "BreakoutPro",
  },
  {
    id: 7,
    name: "Theta Momentum Wave",
    subscribers: 387,
    rating: 4.6,
    return: "+18.9%",
    risk: "Medium",
    category: "Momentum",
    creator: "WaveTrader",
  },
  {
    id: 8,
    name: "Iota Trend Follower",
    subscribers: 298,
    rating: 4.3,
    return: "+21.4%",
    risk: "Low",
    category: "Trend",
    creator: "TrendMaster",
  },
];

const getRiskChipColor = (risk) => {
  switch (risk) {
    case "Low":
      return "success";
    case "Medium":
      return "warning";
    case "High":
      return "error";
    default:
      return "default";
  }
};

export default function TopSubscribedStrategies() {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Users size={20} color="#3b82f6" />
            <Typography variant="h6">Top Subscribed Strategies</Typography>
          </Stack>
        }
      />
      <CardContent>
        <Scrollbar sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
          <Stack spacing={2}>
            {topSubscribedStrategies.map((strategy) => (
              <Box
                key={strategy.id}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      {strategy.name}
                    </Typography>
                    <Star size={14} fill="#facc15" color="#facc15" />
                    <Typography variant="caption" color="text.secondary">
                      {strategy.rating}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} mb={1}>
                    <Chip label={strategy.category} size="small" />
                    <Chip label={strategy.risk} size="small" color={getRiskChipColor(strategy.risk)} variant="outlined" />
                  </Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      by {strategy.creator}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Users size={14} />
                      <Typography variant="caption">{strategy.subscribers.toLocaleString()}</Typography>
                    </Stack>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right", minWidth: 60 }}>
                  <Chip
                    label={strategy.return}
                    size="small"
                    sx={{ bgcolor: "success.light", color: "success.dark", mb: 1 }}
                  />
                  <IconButton size="small">
                    <Eye size={14} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
