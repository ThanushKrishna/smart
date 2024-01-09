"use client"
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Typography, Container } from '@mui/material';
import { SIGNUP } from '../../graphql/queries'

const SignupPage: React.FC = () => {
  const [createUser] = useMutation(SIGNUP);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [firstName, lastName] = formData.fullName.split(' ');

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstName,
            lastName,
            email: formData.email,
            password: formData.password,
          },
        },
      });

      // Assuming your server returns the user and token upon successful registration
      const user = data.createUser.user;
      const token = data.createUser.token;

      // Set the authentication token in cookies
      document.cookie = `authToken=${token}; path=/`;

      // Redirect to the dashboard page
      window.location.href = '/dashboard';
    } catch (error:any) {
      console.error('Error creating user:', error.message!);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="fullName"
          label="Full Name"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          required
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          required
          onChange={handleChange}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
          required
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default SignupPage;