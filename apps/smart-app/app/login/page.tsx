"use client"
import React from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';

const LoginPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" type="email" required />
        <TextField label="Password" fullWidth margin="normal" type="password" required />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;