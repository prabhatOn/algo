"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
  Search,
  FilterList,
  Visibility,
  Edit,
  Reply,
  Close,
  CheckCircle,
  Schedule,
  Warning,
  Person,
  Email,
  Phone,
  Business,
  Assignment,
  Support,
} from "@mui/icons-material"
import Breadcrumb from "../../../components/layout/full/shared/breadcrumb/Breadcrumb"
import TicketStatsCards from "../components/TicketStatsCards"




const AdminContactSupport = () => {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
const [selectedTicket, setSelectedTicket] = useState(null);

  const [openDialog, setOpenDialog] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

// Ticket data
const supportTickets = [
  {
    id: "TK-001",
    subject: "Login Issues",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    status: "open",
    priority: "high",
    category: "Technical",
    assignedTo: "Sarah Wilson",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-15T14:20:00Z",
    description:
      "Unable to login to my account. Getting error message 'Invalid credentials' even with correct password.",
  },
  {
    id: "TK-002",
    subject: "Billing Question",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    company: "Business Inc",
    status: "in-progress",
    priority: "medium",
    category: "Billing",
    assignedTo: "Mike Johnson",
    createdAt: "2024-01-14T09:15:00Z",
    lastUpdated: "2024-01-15T11:45:00Z",
    description:
      "I was charged twice for my subscription this month. Need clarification on billing.",
  },
  {
    id: "TK-003",
    subject: "Feature Request",
    customer: "Bob Wilson",
    email: "bob@example.com",
    phone: "+1 (555) 456-7890",
    company: "StartupXYZ",
    status: "resolved",
    priority: "low",
    category: "Feature Request",
    assignedTo: "Lisa Chen",
    createdAt: "2024-01-13T16:20:00Z",
    lastUpdated: "2024-01-14T10:30:00Z",
    description:
      "Would like to request a dark mode feature for the application.",
  },
  {
    id: "TK-004",
    subject: "Account Suspension",
    customer: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 (555) 321-0987",
    company: "Enterprise Ltd",
    status: "open",
    priority: "urgent",
    category: "Account",
    assignedTo: "David Lee",
    createdAt: "2024-01-15T08:45:00Z",
    lastUpdated: "2024-01-15T13:10:00Z",
    description:
      "My account has been suspended without notice. Need immediate assistance to resolve this issue.",
  },
];

const getStatusChip = (status) => {
  const statusConfig = {
    open: { color: "error", icon: <Warning fontSize="small" /> },
    "in-progress": { color: "warning", icon: <Schedule fontSize="small" /> },
    resolved: { color: "success", icon: <CheckCircle fontSize="small" /> },
    closed: { color: "default", icon: <Close fontSize="small" /> },
  };

  const config = statusConfig[status];
  return (
    <Chip
      label={status.replace("-", " ").toUpperCase()}
      color={config.color}
      icon={config.icon}
      size="small"
    />
  );
};

 const getPriorityChip = (priority) => {
  const priorityColors = {
    urgent: "error",
    high: "warning",
    medium: "info",
    low: "success",
  };

  return (
    <Chip
      label={priority.toUpperCase()}
      color={priorityColors[priority]}
      size="small"
      variant="outlined"
    />
  );
};

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: supportTickets.length,
    open: supportTickets.filter((t) => t.status === "open").length,
    inProgress: supportTickets.filter((t) => t.status === "in-progress").length,
    resolved: supportTickets.filter((t) => t.status === "resolved").length,
  }

 const handleViewTicket = (ticket) => {
  setSelectedTicket(ticket);
  setOpenDialog(true);
};

  const handleSendReply = () => {
    // Handle reply logic here
    console.log("Sending reply:", replyMessage)
    setReplyMessage("")
    setOpenDialog(false)
  }

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
     <Breadcrumb title=" Contact Support " />

        {/* Stats Cards */}
<TicketStatsCards stats={{ total: 40, open: 10, inProgress: 15, resolved: 15 }} />


        {/* Main Content */}
        <Card>
          <CardHeader
            title="Support Tickets"
            subheader="View and manage all customer support requests"
            action={
              <Button variant="contained" startIcon={<Support />}>
                New Ticket
              </Button>
            }
          />
          <CardContent>
            {/* Filters */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select value={priorityFilter} label="Priority" onChange={(e) => setPriorityFilter(e.target.value)}>
                    <MenuItem value="all">All Priority</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
               {(searchTerm || statusFilter !== "all" || priorityFilter !== "all") && (
                <Grid item xs={12} md={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setPriorityFilter("all")
                    }}
                    sx={{
                      "&:hover": {
                        bgcolor: "secondary.light",
                        color: "secondary.contrastText",
                      },
                    }}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              )}
            </Grid>
            

            {/* Tickets Table */}
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {ticket.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{ticket.subject}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {ticket.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ticket.company}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{getStatusChip(ticket.status)}</TableCell>
                      <TableCell>{getPriorityChip(ticket.priority)}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{ticket.assignedTo}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{new Date(ticket.createdAt).toLocaleDateString()}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleViewTicket(ticket)}>
                          <Visibility />
                        </IconButton>
                        {/* <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small">
                          <Reply />
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Ticket Detail Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Ticket Details - {selectedTicket?.id}</Typography>
              <IconButton onClick={() => setOpenDialog(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedTicket && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Subject
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedTicket.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Category
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedTicket.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Status
                  </Typography>
                  <Box sx={{ mb: 2 }}>{getStatusChip(selectedTicket.status)}</Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Priority
                  </Typography>
                  <Box sx={{ mb: 2 }}>{getPriorityChip(selectedTicket.priority)}</Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Customer Information
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Person sx={{ mr: 1, fontSize: 18 }} />
                          <Typography variant="body2">{selectedTicket.customer}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Email sx={{ mr: 1, fontSize: 18 }} />
                          <Typography variant="body2">{selectedTicket.email}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Phone sx={{ mr: 1, fontSize: 18 }} />
                          <Typography variant="body2">{selectedTicket.phone}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Business sx={{ mr: 1, fontSize: 18 }} />
                          <Typography variant="body2">{selectedTicket.company}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                    <Typography variant="body2">{selectedTicket.description}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Admin Response
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Type your response to the customer..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSendReply} startIcon={<Reply />}>
              Send Reply
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default AdminContactSupport
