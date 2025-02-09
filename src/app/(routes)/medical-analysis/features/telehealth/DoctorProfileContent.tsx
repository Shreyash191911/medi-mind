"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import { useUser } from "@clerk/nextjs";
import {
  loginCometChat,
  initializeVideoCall,
  CometChatFunctions,
} from "@/services/cometChat";

// Move doctors data to a separate file later
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15+ years",
    image: "/doctor1.jpg",
    availability: "Mon-Fri, 9AM-5PM",
    rating: 4.8,
    description:
      "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management.",
    education: [
      "MD from Johns Hopkins University",
      "Cardiology Fellowship at Mayo Clinic",
      "Board Certified in Cardiovascular Disease",
    ],
    languages: ["English", "Spanish"],
    specializations: [
      "Preventive Cardiology",
      "Heart Disease Management",
      "Cardiac Rehabilitation",
      "Echocardiography",
    ],
    consultationFee: "$150",
    nextAvailable: "Today, 3:00 PM",
  },
  // ... add other doctors as needed
];

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  availability: string;
  rating: number;
  description: string;
  education: string[];
  languages: string[];
  specializations: string[];
  consultationFee: string;
  nextAvailable: string;
}

interface DoctorProfileContentProps {
  doctorId: string;
}

export default function DoctorProfileContent({
  doctorId,
}: DoctorProfileContentProps) {
  const router = useRouter();
  const { user } = useUser();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [callListener, setCallListener] = useState<any>(null);

  useEffect(() => {
    if (doctorId) {
      const foundDoctor =
        doctors.find((d) => d.id === Number(doctorId)) || doctors[0];
      setDoctor(foundDoctor);
    }

    // Cleanup function to remove call listener when component unmounts
    return () => {
      if (callListener) {
        CometChatFunctions.removeCallListener(callListener);
      }
    };
  }, [doctorId, callListener]);

  const handleBack = () => {
    router.back();
  };

  const initiateVideoCall = async () => {
    if (!user || !doctor) return;

    try {
      // Ensure user is logged in to CometChat
      const loggedInUser = await loginCometChat(user.id);
      if (!loggedInUser) throw new Error("Failed to login to CometChat");

      // Initiate video call
      const outgoingCall = await initializeVideoCall(
        user.id,
        doctor.id.toString()
      );
      if (!outgoingCall) throw new Error("Failed to initiate call");

      // Create and store call listener
      const listenerID = "VIDEO_CALL_LISTENER_" + Date.now();
      const listener = {
        onOutgoingCallAccepted: (acceptedCall: any) => {
          const videoElement = document.getElementById("video-call-container");
          if (videoElement) {
            CometChatFunctions.startCall(acceptedCall, videoElement);
          }
        },
        onOutgoingCallRejected: (rejectedCall: any) => {
          console.log("Call rejected:", rejectedCall);
        },
        onCallEnded: (endedCall: any) => {
          console.log("Call ended:", endedCall);
        },
      };

      await CometChatFunctions.addCallListener(listenerID, listener);
      setCallListener(listenerID);
    } catch (error: any) {
      console.error("Error initiating video call:", error.message || error);
      // Optionally show an error message to the user
    }
  };

  if (!doctor) {
    return (
      <Box sx={{ p: 4, color: "#fff", backgroundColor: "#0A1929" }}>
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#0A1929", minHeight: "100vh", py: 10, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Top Section */}
        <Paper sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", p: 4, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Avatar
                src={doctor.image}
                alt={doctor.name}
                sx={{ width: { xs: 200, md: 250 }, height: { xs: 200, md: 250 }, mx: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h3" sx={{ color: "#2196F3", mb: 2 }}>
                {doctor.name}
              </Typography>
              <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
                {doctor.specialty}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <StarIcon sx={{ color: "#FFD700", mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  {doctor.rating}/5.0
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "#9EA3AE", mb: 4 }}>
                {doctor.description}
              </Typography>
              
              {/* Consultation Options */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  startIcon={<VideocamIcon />}
                  onClick={initiateVideoCall}
                  disabled={!user}
                  sx={{ backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1565C0" }, py: 1.5, px: 4 }}
                >
                  Video Call
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ChatIcon />}
                  sx={{ backgroundColor: "#4CAF50", "&:hover": { backgroundColor: "#388E3C" }, py: 1.5, px: 4 }}
                >
                  Chat Now
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CallIcon />}
                  sx={{ backgroundColor: "#FF9800", "&:hover": { backgroundColor: "#F57C00" }, py: 1.5, px: 4 }}
                >
                  Voice Call
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CalendarMonthIcon />}
                  sx={{ backgroundColor: "#9C27B0", "&:hover": { backgroundColor: "#7B1FA2" }, py: 1.5, px: 4 }}
                >
                  Schedule
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Details Sections */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Education & Experience */}
            <Paper sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", p: 4, mb: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ color: "#2196F3", mb: 3 }}>
                Education & Experience
              </Typography>
              <Box sx={{ color: "#fff" }}>
                {doctor.education.map((edu, index) => (
                  <Typography key={index} sx={{ mb: 1 }}>
                    • {edu}
                  </Typography>
                ))}
              </Box>
            </Paper>

            {/* Specializations */}
            <Paper sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", p: 4, mb: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ color: "#2196F3", mb: 3 }}>
                Specializations
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {doctor.specializations.map((spec, index) => (
                  <Paper key={index} sx={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#fff", px: 2, py: 1, borderRadius: 2 }}>
                    {spec}
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Availability & Booking */}
            <Paper sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", p: 4, mb: 4, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ color: "#2196F3", mb: 3 }}>
                Consultation Details
              </Typography>
              <Box sx={{ color: "#fff" }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: "#9EA3AE" }}>
                    Consultation Fee
                  </Typography>
                  <Typography variant="h6">{doctor.consultationFee}</Typography>
                </Box>
                <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.1)" }} />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: "#9EA3AE" }}>
                    Next Available
                  </Typography>
                  <Typography variant="h6">{doctor.nextAvailable}</Typography>
                </Box>
                <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.1)" }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: "#9EA3AE" }}>
                    Languages
                  </Typography>
                  <Typography variant="h6">{doctor.languages.join(", ")}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {/* Video Call Container */}
      <div
        id="video-call-container"
        style={{
          width: "100%",
          height: "400px",
          marginTop: "20px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
}
