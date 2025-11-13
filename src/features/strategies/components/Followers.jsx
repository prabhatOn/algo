import React, { useState } from 'react';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import {
  useTheme,
  CardContent,
  Typography,
  Stack,
  Tabs,
  Tab,
  Box,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import Scrollbar from '../../../components/custom-scroll/Scrollbar';
const generateCumulativeData = (length, volatility = 2, start = 100) => {
  const data = [start];
  for (let i = 1; i < length; i++) {
    const change = (Math.random() * volatility * 2 - volatility); // random -2% to +2%
    const prev = data[i - 1];
    const next = +(prev * (1 + change / 100)).toFixed(2);
    data.push(next);
  }
  return data;
};

const chartDataByRange = {
  '1W': {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: generateCumulativeData(7),
  },
  '1M': {
    categories: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    data: generateCumulativeData(30),
  },
  '3M': {
    categories: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
    data: generateCumulativeData(12, 3),
  },
  '6M': {
    categories: Array.from({ length: 6 }, (_, i) => `Month ${i + 1}`),
    data: generateCumulativeData(6, 5),
  },
  '1Y': {
    categories: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    data: generateCumulativeData(12, 6),
  },
  '5Y': {
    categories: ['2019', '2020', '2021', '2022', '2023'],
    data: generateCumulativeData(5, 10),
  },
  'Inception': {
    categories: Array.from({ length: 60 }, (_, i) => `T${i + 1}`),
    data: generateCumulativeData(60, 4),
  },
};



const Followers = () => {
  const theme = useTheme();


  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('1W');

  const selectedChartData = chartDataByRange[timeRange];
const yValues = selectedChartData.data;
const yMin = Math.min(...yValues);
const yMax = Math.max(...yValues);
const yAbsMax = Math.max(Math.abs(yMin), Math.abs(yMax));

const options = useMemo(() => {
  const isDarkMode = theme.palette.mode === 'dark';
  const labelColor = isDarkMode ? '#FFFFFF' : '#2E2E2E'; // force white or dark gray

  return {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#00C853'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shade: 'light',
        gradientToColors: ['#00C853'],
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 0,
      hover: { size: 5 },
    },
    grid: {
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: (value) =>
          `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`,
      },
    },
    xaxis: {
      categories: selectedChartData.categories,
      labels: {
        style: {
          colors: Array(selectedChartData.categories.length).fill(labelColor),
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: -yAbsMax,
      max: yAbsMax,
      labels: {
        formatter: (val) => `${val >= 0 ? '+' : ''}${val}%`,
        style: {
          colors: [labelColor],
          fontSize: '12px',
        },
      },
    },
  };
}, [theme.palette.mode, selectedChartData, yAbsMax]);


const series = [
  {
    name: 'Net Value',
    data: selectedChartData.data,
  },
];


  return (
    <BlankCard sx={{ p: 0 }}>
      <CardContent sx={{ px: 2, pt: 2, pb: 1 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: '40px' }}
        >
          <Tab label="Chart" />
          <Tab label="Information" />
          <Tab label="Performance" />
          <Tab label="Trade Analysis" />
        </Tabs>

        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="h6" color="textSecondary">
            {activeTab === 0
              ? 'Growth History'
              : activeTab === 1
              ? 'Strategy Info'
              : activeTab === 2
              ? 'Performance'
              : 'Summary'}
          </Typography>

          {activeTab === 0 && (
            <Stack direction="row" spacing={2} alignItems="center">
          

              <FormControl size="small">
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <MenuItem value="1W">1 Week</MenuItem>
                  <MenuItem value="1M">1 Month</MenuItem>
                  <MenuItem value="3M">3 Months</MenuItem>
                  <MenuItem value="6M">6 Months</MenuItem>
                  <MenuItem value="1Y">1 Year</MenuItem>
                  <MenuItem value="5Y">5 Years</MenuItem>
                  <MenuItem value="5Y">Inception</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>
      </CardContent>

      <Box sx={{ px: 3, pb: 3 }}>
        {activeTab === 0 && (
      <Chart options={options} series={series} type="area" height={350} width="100%" />

        )}

{activeTab === 1 && (
  <Box sx={{ overflowX: 'auto' }}>
    <Scrollbar sx={{ maxHeight: 380 }}>
      <Table size="small" sx={{ minWidth: 500 }}>
        <TableBody>
          {[
            ['Strategy Name', 'Momentum Surge A'],
            ['Created By', 'John Doe'],
            ['Created On', '12 March 2024'],
            ['Last Updated', '5 June 2025'],
            ['Type', 'Momentum-based'],
            ['Risk Level', 'Moderate'],
            ['Market Focus', 'Equities, Commodities'],
            ['Timeframe', '15min – 1hr'],
            ['Backtest Period', 'Jan 2020 – Dec 2023'],
            ['Execution Style', 'Automated via API (limit/market orders)'],
            [
              'Description',
              `Momentum Surge A is designed to exploit rapid price movements during high-volume periods. 
It uses real-time volatility indicators to enter trades and tight stop losses to minimize risk. 
The system avoids trading in sideways or choppy markets, focusing only on clear breakouts.`,
            ],
          ].map(([label, value], idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ fontWeight: 600, width: 220, verticalAlign: 'top' }}>
                {label}
              </TableCell>
              <TableCell>
                <Typography variant="body2" whiteSpace="pre-line">
                  {value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  </Box>
)}


{activeTab === 2 && (
  <Box sx={{ overflowX: 'auto' }}>
    <Scrollbar sx={{ maxHeight: 380 }}>
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>All</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Long</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Short</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            ['Open P&L', ['-', '-0.43%'], ['-', '-'], ['-', '-']],
            ['Net profit', ['-58,546.30 USD', '-5.85%'], ['+446,550.93 USD', '+44.66%'], ['-505,097.23 USD', '-50.51%']],
            ['Gross profit', ['3,690,315.80 USD', '369.03%'], ['2,299,983.88 USD', '230.00%'], ['1,390,331.92 USD', '139.03%']],
            ['Gross loss', ['3,748,862.10 USD', '374.89%'], ['1,853,432.95 USD', '185.34%'], ['1,895,429.15 USD', '189.54%']],
            ['Commission paid', ['0 USD'], ['0 USD'], ['0 USD']],
            ['Buy & hold return', ['+1,955,400,000.00 USD', '+195,540.00%'], ['-', '-'], ['-', '-']],
            ['Max equity run-up', ['193,432.22 USD', '18.20%'], ['-', '-'], ['-', '-']],
            ['Max equity drawdown', ['199,346.80 USD', '18.86%'], ['-', '-'], ['-', '-']],
            ['Max contracts held', ['1,420,958'], ['1,420,958'], ['1,150,131']],
          ].map(([metric, all, long, short], idx) => (
            <TableRow key={idx}>
              <TableCell>{metric}</TableCell>
              {[all, long, short].map((val, i) => (
                <TableCell key={i}>
                  <Stack spacing={0.5}>
                    {val.map((item, j) => (
                      <Typography
                        key={j}
                        variant="body2"
                        color={
                          item.includes('+') ? 'success.main'
                          : item.includes('-') ? 'error.main'
                          : 'text.primary'
                        }
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  </Box>
)}

{activeTab === 3 && (
  <Box sx={{ overflowX: 'auto' }}>
    <Scrollbar sx={{ maxHeight: 380 }}>
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>All</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Long</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Short</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            ['Total trades', ['2,054'], ['1,030'], ['1,024']],
            ['Total open trades', ['1'], ['1'], ['0']],
            ['Winning trades', ['758'], ['415'], ['343']],
            ['Losing trades', ['1,100'], ['522'], ['578']],
            ['Percent profitable', ['36.90%'], ['40.29%'], ['33.50%']],
            ['Avg P&L', ['-28.50 USD', '-0.01%'], ['433.54 USD', '0.48%'], ['-493.26 USD', '-0.51%']],
            ['Avg winning trade', ['4,868.49 USD', '5.09%'], ['5,542.13 USD', '5.80%'], ['4,053.45 USD', '4.23%']],
            ['Avg losing trade', ['3,408.06 USD', '3.53%'], ['3,550.64 USD', '3.66%'], ['3,279.29 USD', '3.41%']],
            ['Ratio avg win / avg loss', ['1.429'], ['1.561'], ['1.236']],
            ['Largest winning trade', ['49,950.64 USD'], ['49,950.64 USD'], ['45,772.02 USD']],
            ['Largest winning trade %', ['53.33%'], ['53.33%'], ['45.65%']],
            ['Largest losing trade', ['23,939.10 USD'], ['22,313.97 USD'], ['23,939.10 USD']],
            ['Largest losing trade %', ['24.39%'], ['22.63%'], ['24.39%']],
            ['Avg # bars in trades', ['6'], ['7'], ['5']],
            ['Avg # bars in winning trades', ['8'], ['9'], ['7']],
          ].map(([metric, all, long, short], idx) => (
            <TableRow key={idx}>
              <TableCell>{metric}</TableCell>
              {[all, long, short].map((val, i) => (
                <TableCell key={i}>
                  <Stack spacing={0.5}>
                    {val.map((item, j) => (
                      <Typography
                        key={j}
                        variant="body2"
                        color={
                          item.includes('+') ? 'success.main'
                            : item.includes('-') ? 'error.main'
                            : 'text.primary'
                        }
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  </Box>
)}


      </Box>
    </BlankCard>
  );
};

export default Followers;
