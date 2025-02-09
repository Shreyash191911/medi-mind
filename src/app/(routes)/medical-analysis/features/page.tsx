"use client";
import { useRouter } from 'next/navigation'; 
import { Box, Card, CardContent, CardActions, Button, Typography, Grid2} from "@mui/material"; 

export default function Features() {
  const router = useRouter();

  const features = [
    { 
      id: 1, 
      title: "AI-Powered Diagnostics", 
      bgImage: "/ai_powered_dignostics.jpg",
      red_path: "/medical-analysis/features/feature_implement/"     
    },
    {
      id: 2,
      title: "Telehealth Services",
      bgImage: "/telehealth.jpg",
      red_path: "/medical-analysis/features/telehealth"
    },
    { 
      id: 3, 
      title: "Health Monitoring",
      bgImage: "/dig_health_monitoring.jpg",
      red_path: "/health-monitoring"
    },
    { 
      id: 4, 
      title: "Appointment Scheduling",
      bgImage: "/online_app_booking.jpg",
      red_path: "/appointment-scheduling"
    },
    { 
      id: 5, 
      title: "Personalized Plans",
      bgImage: "/health-insurance.jpg",
      red_path: "/personalized-plans"
    },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: "#0A1929", minHeight: "100vh" }}>
      <Grid2 
        container 
        spacing={3} 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          mt : 10
        }}
      >
        {features.map((feature) => (
          <Grid2  
            xs={12}  
            sm={6} 
            md={4} 
            key={feature.id}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Card
              sx={{
                height: "500px",
                width: "350px", // Fixed width for all cards
                position: "relative",
                background: "linear-gradient(145deg, #1A2027 0%, #111827 100%)",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "12px",
                transition: "transform 0.2s ease-in-out",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${feature.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.6,
                  zIndex: 1
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(145deg, rgba(26,32,39,0.1) 0%, rgba(17,24,39,0.3) 100%)",
                  zIndex: 2
                }
              }}
            >
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  position: "relative",
                  zIndex: 3
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: "#2196F3",
                    fontWeight: "600",
                    mb: 2
                  }}
                >
                  {feature.title}
                </Typography>
              </CardContent>
              <CardActions 
                sx={{ 
                  p: 2,
                  position: "relative",
                  zIndex: 3
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={() => router.push(feature.red_path || '/default-path')}
                  sx={{
                    backgroundColor: "#2196F3",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#1565C0",
                    },
                    textTransform: "none",
                    py: 1
                  }}
                >
                  Explore
                </Button> 
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2> 
    </Box>
  );
}