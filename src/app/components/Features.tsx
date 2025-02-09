import { Box, Typography, Grid } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InsightsIcon from "@mui/icons-material/Insights";

const features = [
  { icon: <MedicalServicesIcon />, title: "Medical Analysis", description: "AI-powered medical insights at your fingertips." },
  { icon: <ScheduleIcon />, title: "Appointments", description: "Schedule consultations with top healthcare professionals." },
  { icon: <InsightsIcon />, title: "AI Insights", description: "Advanced health predictions and insights." },
];

export default function Features() {
  return (
    <Box sx={{ padding: "4rem 2rem", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Our Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={{ textAlign: "center", padding: "1rem" }}>
              {feature.icon}
              <Typography variant="h6" fontWeight="bold" sx={{ marginTop: "1rem" }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}