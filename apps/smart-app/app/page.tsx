import React from 'react';
import Link from 'next/link';
import { Button, Typography, Container } from '@mui/material';

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        Welcome to Smart Leads
      </Typography>

      <Link href="/signup" passHref>
        <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} >
          Sign Up
        </Button>
      </Link>
      <Link href="/login" passHref>
        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
          Login
        </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;