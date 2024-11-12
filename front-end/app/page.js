"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function Home() {
  const [formData, setFormData] = useState({
    alcohol: "",
    malic_acid: "",
    ash: "",
    alcalinity_of_ash: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      setResult(data); // assuming data is a string response
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Wine Prediction App
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Alcohol"
            name="alcohol"
            type="number"
            value={formData.alcohol}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Malic Acid"
            name="malic_acid"
            type="number"
            value={formData.malic_acid}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ash"
            name="ash"
            type="number"
            value={formData.ash}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Alcalinity of Ash"
            name="alcalinity_of_ash"
            type="number"
            value={formData.alcalinity_of_ash}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
        {result && (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 3 }}>
            Result: {result}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
