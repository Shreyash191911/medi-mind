"use client"; 

import { Box, Typography, Button, Input } from "@mui/material";
import { useState } from "react";

export default function MedicalAnalysis() {
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4">Medical Image Analysis</Typography>
      <Input type="file" onChange={handleUpload} />
      <Button onClick={analyzeImage} variant="contained" sx={{ mt: 2 }}>
        Analyze
      </Button>
    </Box>
  );
}