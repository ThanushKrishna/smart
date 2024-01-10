"use client"
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Typography, Container } from '@mui/material';
import { SIGNUP } from '../../graphql/queries'
import { setToken } from '../../utils/auth';

const SignupPage: React.FC = () => {
  const [createUser] = useMutation(SIGNUP);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [firstname, lastname] = formData.fullName.split(' ');

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstname,
            lastname,
            emailid: formData.email,
            password: formData.password,
            mobile: formData.mobile,
          },
        },
      });

      // Assuming your server returns the user and token upon successful registration
      const EmailId = data.signUp.emailid;
      const UserID = data.signUp.userid;
      const token = data.signUp.token;

//      Set the authentication token in cookies
//      document.cookie = `authToken=${token}; path=/`;
        setToken(token); 

        console.log(EmailId, UserID);
        console.log("NewToken: " + token);
      
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
          name="mobile"
          label="Mobile Number"
          fullWidth
          margin="normal"
          type="text"
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