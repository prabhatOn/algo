
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material"
import { Warning, TrendingUp, FlashOn, ExpandMore, ExpandLess } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { useState } from "react"



const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}))

const RecommendationBox = styled(Box)(({ theme, priority }) => {
  const colors = {
    high: { bg: "#ffebee", border: "#ffcdd2" },
    medium: { bg: "#fff8e1", border: "#ffecb3" },
    low: { bg: "#e3f2fd", border: "#bbdefb" },
  }

  return {
   
    backgroundColor: colors[priority].bg,
    borderRadius: 16,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
      borderRadius: 12,
    },
  }
})

const suggestions = [
  {
    title: "Upgrade User Limit",
    description: "You're at 84.7% capacity. Consider upgrading to prevent service disruption.",
    priority: "high",
    action: "Upgrade Plan",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg,rgb(240, 149, 142),rgb(245, 200, 215))",
  },
  {
    title: "API Rate Optimization",
    description: "Some APIs are underutilized. Review and optimize your API allocation.",
    priority: "medium",
    action: "Review APIs",
    icon: FlashOn,
    gradient: "linear-gradient(135deg,rgb(235, 215, 186),rgb(223, 208, 193))",
  },
  {
    title: "Strategy Performance",
    description: "15 strategies haven't been used in 30 days. Consider archiving inactive ones.",
    priority: "low",
    action: "Clean Up",
    icon: Warning,
    gradient: "linear-gradient(135deg,rgb(161, 198, 228),rgb(175, 185, 241))",
  },
]

export default function Recommendations() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [expanded, setExpanded] = useState(false)
  const [visibleItems, setVisibleItems] = useState(isMobile ? 2 : 3)

  const getPriorityChipColor = (priority) => {
    switch (priority) {
      case "high":
        return { backgroundColor: "#ffcdd2", color: "#c62828" }
      case "medium":
        return { backgroundColor: "#ffecb3", color: "#f57c00" }
      default:
        return { backgroundColor: "#bbdefb", color: "#1976d2" }
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
    setVisibleItems(expanded ? (isMobile ? 2 : 3) : suggestions.length)
  }

  return (
    <Card>
       <StyledCardHeader
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                   <Warning />
                </Avatar>
              }
              title={
                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                    Smart Recommendations
                </Typography>
              }
              // subheader={<Typography variant="caption">   AI-powered suggestions to optimize your platform</Typography>}
            />
       
          
     
   
      <CardContent sx={{ p: { xs: 2, sm: 1 } }}>
        <Box display="flex" flexDirection="column">
          {suggestions.slice(0, visibleItems).map((suggestion, index) => {
            const IconComponent = suggestion.icon
            return (
              <RecommendationBox key={index} priority={suggestion.priority}>
                <Box display="flex" gap={{ xs: 1.5, sm: 2 }} alignItems="flex-start">
                  <Avatar
                    sx={{
                      background: suggestion.gradient,
                      width: { xs: 40, sm: 56 },
                      height: { xs: 40, sm: 56 },
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </Avatar>
                  <Box flex={1} minWidth={0}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={1}
                      flexDirection={{ xs: "column", sm: "row" }}
                      gap={{ xs: 1, sm: 0 }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color='text.primary'
                        sx={{
                          fontSize: { xs: "0.9rem", sm: "1.1rem" },
                          lineHeight: 1.2,
                          
                        }}
                      >
                        {suggestion.title}
                      </Typography>
                      <Chip
                        label={suggestion.priority.toUpperCase()}
                        size="small"
                        sx={{
                          ...getPriorityChipColor(suggestion.priority),
                          fontSize: { xs: "0.6rem", sm: "0.7rem" },
                          height: { xs: 20, sm: 24 },
                          alignSelf: { xs: "flex-start", sm: "center" },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        lineHeight: 1.4,
                      }}
                    >
                      {suggestion.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        background: suggestion.gradient,
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                        "&:hover": {
                          opacity: 0.9,
                        },
                      }}
                    >
                      {suggestion.action}
                    </Button>
                  </Box>
                </Box>
              </RecommendationBox>
            )
          })}

          {suggestions.length > (isMobile ? 2 : 3) && (
            <Box textAlign="center">
              <IconButton onClick={handleExpandClick} size="small">
                {expanded ? <ExpandLess /> : <ExpandMore />}
                <Typography variant="caption" sx={{ ml: 1 }}>
                  {expanded ? "Show Less" : `Show ${suggestions.length - visibleItems} More`}
                </Typography>
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
