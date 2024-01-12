import React from 'react';
import Link from 'next/link';
import { Button, Typography, Container } from '@mui/material';

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        Welcome to Smart Leads
      </Typography>    
    </Container>
  );
};

export default LandingPage;