"use client"

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  TablePagination,
} from "@mui/material"
import { Schedule, CheckCircle, Warning, Error } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useState } from "react"
import Scrollbar from "../../../components/custom-scroll/Scrollbar"

const StyledCard = styled(Card)(({ theme }) => ({
  border: "none",
  boxShadow: theme.shadows[3],
  height: "100%",
  margin: theme.spacing(1),
}))

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.background.default,
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

const MobileActivityCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  boxShadow: theme.shadows[1],
}))

const recentActivity = [
  { id: 1, type: "User", action: "Created", name: "john.doe@example.com", time: "2 min ago", status: "success" },
  { id: 2, type: "API", action: "Added", name: "Binance Integration", time: "5 min ago", status: "success" },
  { id: 3, type: "Strategy", action: "Created", name: "RSI Momentum", time: "12 min ago", status: "success" },
  { id: 4, type: "User", action: "Limit Reached", name: "Premium Plan", time: "1 hour ago", status: "warning" },
  { id: 5, type: "API", action: "Failed", name: "Coinbase Pro", time: "2 hours ago", status: "error" },
  { id: 6, type: "Strategy", action: "Updated", name: "MACD Signal", time: "3 hours ago", status: "success" },
  { id: 7, type: "User", action: "Created", name: "new.user@example.com", time: "3 hours ago", status: "success" },
  { id: 8, type: "API", action: "Removed", name: "Old API", time: "4 hours ago", status: "error" },
  { id: 9, type: "Strategy", action: "Archived", name: "Bollinger Bands", time: "6 hours ago", status: "warning" },
  { id: 10, type: "User", action: "Updated", name: "alice@example.com", time: "7 hours ago", status: "success" },
  { id: 11, type: "Strategy", action: "Deleted", name: "Test Strategy", time: "10 hours ago", status: "error" },
  { id: 12, type: "API", action: "Throttled", name: "Kraken API", time: "12 hours ago", status: "warning" },
  { id: 13, type: "API", action: "Refreshed", name: "CoinMarketCap", time: "13 hours ago", status: "success" },
  { id: 14, type: "Strategy", action: "Paused", name: "EMA Crossover", time: "14 hours ago", status: "warning" },
]

export default function ActivityTable() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const getStatusIcon = (status) => {
    const iconProps = { fontSize: "small" }
    switch (status) {
      case "success":
        return <CheckCircle {...iconProps} color="success" />
      case "warning":
        return <Warning {...iconProps} color="warning" />
      case "error":
        return <Error {...iconProps} color="error" />
      default:
        return <Schedule {...iconProps} color="disabled" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "User":
        return "primary"
      case "API":
        return "success"
      case "Strategy":
        return "secondary"
      default:
        return "default"
    }
  }

  const paginatedActivities = recentActivity.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (isMobile) {
    return (
      <StyledCard>
        <StyledCardHeader
          avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}><Schedule /></Avatar>}
          title={<Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem" }}>Recent Activity</Typography>}
          subheader={<Typography variant="caption">Latest usage events</Typography>}
        />
        <CardContent sx={{ p: 1 }}>
          {paginatedActivities.map((activity) => (
            <MobileActivityCard key={activity.id}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip label={activity.type} color={getTypeColor(activity.type)} size="small" />
                    <Typography variant="body2" fontWeight={500}>{activity.action}</Typography>
                  </Box>
                  {getStatusIcon(activity.status)}
                </Box>
                <Typography variant="caption" color="text.secondary" noWrap>{activity.name}</Typography>
                <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
              </CardContent>
            </MobileActivityCard>
          ))}
        </CardContent>
        <Box px={2} pb={2}>
          <TablePagination
            component="div"
            count={recentActivity.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </Box>
      </StyledCard>
    )
  }

  return (
    <StyledCard>
      <StyledCardHeader
        avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}><Schedule /></Avatar>}
        title={<Typography variant="h6" fontWeight="bold">Recent Activity</Typography>}
        subheader="Latest usage events and limit changes"
      />
      <CardContent sx={{ p: 0 }}>
        <Scrollbar style={{ maxHeight: 480 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">Type</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Details</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Time</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedActivities.map((activity) => (
                <StyledTableRow key={activity.id}>
                  <TableCell>
                    <Chip label={activity.type} color={getTypeColor(activity.type)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={500}>{activity.action}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>{activity.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{activity.time}</Typography>
                  </TableCell>
                  <TableCell>{getStatusIcon(activity.status)}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </CardContent>
      <Box px={2} pb={2}>
        <TablePagination
          component="div"
          count={recentActivity.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Box>
    </StyledCard>
  )
}
