"use client";
import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// --- Component that displays the doctor's profile ---
interface Doctor {
    id: number;
    name: string;
    specialty: string;
    experience: string;
    image: string;
    availability: string;
    rating: number;
    description: string;
  }

export default function TelehealthServices() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  // Redirect if not signed in
  if (!isSignedIn) {
    return (
      <Box sx={{ 
        backgroundColor: "#0A1929",
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h5" sx={{ color: '#fff' }}>
          Please sign in to access Telehealth Services
        </Typography>
      </Box>
    );
  }

  const doctors: Doctor[] = [
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
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12+ years",
      image: "/doctor2.jpg",
      availability: "Tue-Sat, 10AM-6PM",
      rating: 4.9,
      description:
        "Dr. Chen is an expert in treating neurological disorders with a focus on stroke prevention and headache management.",
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      specialty: "Pediatrician",
      experience: "10+ years",
      image: "/doctor3.jpg",
      availability: "Mon-Thu, 8AM-4PM",
      rating: 4.7,
      description:
        "Dr. Williams specializes in pediatric care and has extensive experience in childhood development and preventive care.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Dermatologist",
      experience: "8+ years",
      image: "/doctor4.jpg",
      availability: "Wed-Sun, 11AM-7PM",
      rating: 4.6,
      description:
        "Dr. Wilson is known for his expertise in treating skin conditions and performing minimally invasive cosmetic procedures.",
    },
  ];

  function DoctorProfileContent({ doctorId }: { doctorId: string }) {
    const router = useRouter();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
  
    useEffect(() => {
      // Convert doctorId to a number and find the corresponding doctor
      const foundDoctor =
        doctors.find((d) => d.id === parseInt(doctorId)) || doctors[0];
      setDoctor(foundDoctor);
    }, [doctorId]);
  
    if (!doctor) {
      return (
        <Box sx={{ p: 4, color: "#fff", backgroundColor: "#0A1929" }}>
          Loading...
        </Box>
      );
    }
}

  return (
    <Box sx={{ 
      backgroundColor: "#0A1929",
      minHeight: '100vh',
    }}>
      <Box sx={{ 
        pt: 10, 
        pb: 4,
        position: 'sticky',
        top: 0,
        backgroundColor: "#0A1929",
        zIndex: 10
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#fff',
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold'
          }}
        >
          Telehealth Services
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2196F3',
            textAlign: 'center',
          }}
        >
          Connect with Top Healthcare Professionals
        </Typography>
      </Box>

      {doctors.map((doctor) => (
        <Box 
          key={doctor.id}
          sx={{
            width: '100%',
            px: 4,
            mb: 4,
          }}
        >
          <Card 
            sx={{
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              borderRadius: 2,
              maxWidth: '1200px',
              mx: 'auto',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <CardMedia
                component="img"
                sx={{ 
                  width: { xs: '100%', md: '400px' },
                  height: { xs: '300px', md: 'auto' },
                  objectFit: 'cover'
                }}
                image={doctor.image}
                alt={doctor.name}
              />
              <Box sx={{ flex: 1 }}>
                <CardContent sx={{ color: '#fff', p: 4 }}>
                  <Typography variant="h4" sx={{ color: '#2196F3', mb: 2 }}>
                    {doctor.name}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {doctor.specialty}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#9EA3AE', mb: 3, fontSize: '1.1rem' }}>
                    {doctor.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 3 }}>
                    <Typography variant="body1" sx={{ color: '#9EA3AE' }}>
                      Experience: {doctor.experience}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#9EA3AE' }}>
                      Available: {doctor.availability}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#2196F3' }}>
                      Rating: {doctor.rating}/5.0
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button 
                    variant="contained"
                    fullWidth
                    onClick={() => router.push(`/medical-analysis/features/telehealth/${doctor.id}`)}
                    sx={{
                      backgroundColor: '#2196F3',
                      '&:hover': {
                        backgroundColor: '#1565C0',
                      },
                      py: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    Schedule Consultation
                  </Button>
                </CardActions>
              </Box>
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  );
} 