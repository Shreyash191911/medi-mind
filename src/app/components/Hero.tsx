"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/medical-analysis/features');
  };

  const handleExplore = () => {
    router.push('/about-us');
  };

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative", // Needed for the overlay
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "2rem",
        overflow: "hidden",
        backgroundImage: "url('https://cdn.pixabay.com/photo/2024/10/09/06/08/ai-generated-9106907_1280.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center", 
        "&::before": {
          content: '""', // Overlay element
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
          zIndex: 1,
        },
      }}
    >
      {/* Content */}
      <Typography variant="h3" fontWeight="bold"  sx={{ zIndex: 2 }}>
        Welcome to MediMind
      </Typography>
      <Typography variant="h5" sx={{ marginTop: "1rem", zIndex: 2 }}>
        Revolutionizing Healthcare with AI
      </Typography>
      <Box sx={{ marginTop: "2rem", zIndex: 2 }}> 
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetStarted}
          sx={{ margin: "0 1rem" }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleExplore}
          sx={{ margin: "0 1rem" }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
}