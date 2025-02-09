// app/symptoms-checker/results/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Paper } from '@mui/material';

export default function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const response = searchParams.get('response') || 'No response available';

  const handleCheckAnother = () => {
    router.push('/medical-analysis/features/feature_implement');
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#0A1929',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          maxWidth: 800,
          width: '100%',
          p: 4,
          backgroundColor: 'rgba(30, 41, 59, 0.95)',
          borderRadius: 2,
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#fff',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Disease Prediction Results
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            p: 3,
            borderRadius: 1,
            whiteSpace: 'pre-line',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            mb: 4
          }}
        >
          {response}
        </Typography>

        <Button
          variant="contained"
          onClick={handleCheckAnother}
          sx={{
            mt: 2,
            backgroundColor: '#2196F3',
            '&:hover': {
              backgroundColor: '#1565C0',
            },
            width: '100%',
            py: 1.5
          }}
        >
          Check Another Case
        </Button>
      </Paper>
    </Box>
  );
}