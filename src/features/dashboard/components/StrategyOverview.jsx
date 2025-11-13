import React from "react";
import PropTypes from "prop-types";
import {
 
  CardContent,
  Typography,
  Chip,
  Box,
  Tooltip,
  Switch,
  Avatar,

} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import iconInactive from "../../../assets/images/svgs/icons8-strategy-30.png";
import DashboardCard from '../../../components/common/DashboardCard';
const getSwitchColor = (status, theme) => {
  switch (status.toLowerCase()) {
    case "active": return theme.palette.success.main;
    case "inactive": return theme.palette.error.main;
    default: return theme.palette.grey[500];
  }
};

const StrategyOverview = ({ strategy, onToggleStatus }) => {
  const theme = useTheme();


  return (
    <DashboardCard sx={{ backgroundColor: 'primary.light'}} >
      <CardContent  >

        {/* First Row: Name & Switch */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={iconInactive} sx={{ width: 32, height: 32 }} />
            <Typography variant="h6" fontWeight={600}>{strategy.name}</Typography>
          </Box>

          <Tooltip title={strategy.status === "Active" ? "Click to deactivate" : "Click to activate"}>
            <Switch
              checked={strategy.status.toLowerCase() === "active"}
              onChange={() => onToggleStatus(strategy.id)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: getSwitchColor(strategy.status, theme),
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: getSwitchColor(strategy.status, theme),
                },
              }}
            />
          </Tooltip>
        </Box>

        {/* Info Chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 ,mt:1}}>
          <Chip label={`By: ${strategy.createdBy}`} size="small" color="primary" sx={{p:1}} />
          <Chip label={`On: ${new Date(strategy.createdOn).toLocaleDateString()}`} size="small" color="info" sx={{p:1}} />
          <Chip label={`Type: ${strategy.type}`} size="small" color="secondary" sx={{p:1}} />
          <Chip label={`Category: ${strategy.category}`} size="small" color="default" sx={{p:1}} />
        </Box>

        {/* Status Label */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Chip
            label={strategy.status}
            color={strategy.status.toLowerCase() === "active" ? "success" : "error"}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>

      </CardContent>
    </DashboardCard>
  );
};

StrategyOverview.propTypes = {
  strategy: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Active", "Inactive"]).isRequired,
  }).isRequired,
  onToggleStatus: PropTypes.func.isRequired,
};

export default StrategyOverview;
