import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#333", color: "white", textAlign: "center" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} MediMind. All rights reserved.
      </Typography>
      <Link href="/privacy-policy" color="inherit" sx={{ margin: "0 1rem" }}>
        Privacy Policy
      </Link>
      <Link href="/terms-of-service" color="inherit" sx={{ margin: "0 1rem" }}>
        Terms of Service
      </Link>
    </Box>
  );
}