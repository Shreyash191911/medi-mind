import { Box, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Box sx={{ padding: "4rem 2rem", backgroundColor: "#f5f5f5", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" color="black" gutterBottom> 
        About Us
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "600px", margin: "0 auto", color: "black" }}> 
        MediMind is dedicated to bringing cutting-edge AI technology to healthcare. Our goal is to improve the quality of care and provide accessible solutions for all.
      </Typography>
    </Box>
  );
}