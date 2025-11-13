import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import { useStrategies } from "../../../hooks/useStrategies";
import { useToast } from "../../../hooks/useToast";

const watchList = [
  { symbol: "NIFTY", price: 17450, change: "+1.23%" },
  { symbol: "BANKNIFTY", price: 40000, change: "-0.45%" },
  { symbol: "FINNIFTY", price: 17500, change: "+2.10%" },
  { symbol: "RELIANCE", price: 2300, change: "-0.12%" },
  { symbol: "TCS", price: 3800, change: "+0.65%" },
];

const OrderSidebar = ({ onCreate }) => {
  const [mode, setMode] = useState("direct");
  const { strategies } = useStrategies();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    symbol: '',
    quantity: '',
    price: '',
    tradeType: 'BUY',
    market: 'Indian',
    strategyId: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.symbol || !formData.quantity || !formData.price) {
        showError('Please fill all required fields');
        return;
      }

      const tradeData = {
        orderId: `ORD${Date.now()}`, // Generate unique order ID
        market: formData.market,
        symbol: formData.symbol,
        type: formData.tradeType,
        amount: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        broker: 'Default Broker', // Default broker, could be made configurable
        brokerType: formData.market,
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      };

      await onCreate(tradeData);
      showSuccess('Trade order placed successfully');
      
      // Reset form
      setFormData({
        symbol: '',
        quantity: '',
        price: '',
        tradeType: 'BUY',
        market: 'Indian',
        strategyId: '',
      });
    } catch (error) {
      showError(error.message || 'Failed to place order');
    }
  };

  return (
    <DashboardCard title="Place Order">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, val) => val && setMode(val)}
          fullWidth
          size="small"
        >
          <ToggleButton value="direct">Direct</ToggleButton>
          <ToggleButton value="strategy">By Strategy</ToggleButton>
        </ToggleButtonGroup>

        <FormControl fullWidth size="small">
          <InputLabel>Market</InputLabel>
          <Select
            value={formData.market}
            label="Market"
            onChange={(e) => handleInputChange('market', e.target.value)}
          >
            <MenuItem value="Indian">Indian</MenuItem>
            <MenuItem value="Crypto">Crypto</MenuItem>
            <MenuItem value="Forex">Forex</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Symbol"
          variant="outlined"
          size="small"
          value={formData.symbol}
          onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
          placeholder="e.g., NIFTY"
        />

        <TextField
          fullWidth
          label="Quantity"
          variant="outlined"
          size="small"
          type="number"
          value={formData.quantity}
          onChange={(e) => handleInputChange('quantity', e.target.value)}
        />

        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Trade Type</InputLabel>
          <Select
            value={formData.tradeType}
            label="Trade Type"
            onChange={(e) => handleInputChange('tradeType', e.target.value)}
          >
            <MenuItem value="BUY">Buy</MenuItem>
            <MenuItem value="SELL">Sell</MenuItem>
          </Select>
        </FormControl>

        {mode === 'strategy' && (
          <FormControl fullWidth size="small">
            <InputLabel>Strategy</InputLabel>
            <Select
              value={formData.strategyId}
              label="Strategy"
              onChange={(e) => handleInputChange('strategyId', e.target.value)}
            >
              {strategies.map((strategy) => (
                <MenuItem key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button 
          variant="contained" 
          fullWidth 
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 1 }}
        >
          Place Order
        </Button>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Watch History
          </Typography>
          <List dense>
            {watchList.map((item, i) => (
              <Box key={i}>
                <ListItem
                  secondaryAction={
                    <Typography color={item.change.includes("-") ? "red" : "green"}>
                      {item.change}
                    </Typography>
                  }
                >
                  <ListItemText primary={item.symbol} secondary={item.price} />
                </ListItem>
                {i !== watchList.length - 1 && <Divider component="li" />}
              </Box>
            ))}
          </List>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default OrderSidebar;
