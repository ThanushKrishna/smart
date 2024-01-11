"use client"
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Typography, Container } from '@mui/material';
import { SIGNUP } from '../../graphql/queries'
import { setToken } from '../../utils/auth';
import { useRouter } from 'next/navigation'

const SignupPage: React.FC = () => {

  const router = useRouter();
  const [createUser] = useMutation(SIGNUP);
  const[isPasswordMatch, setPasswordMatch] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {   
    setPasswordMatch(false) ;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [firstname, lastname] = formData.fullName.split(' ');

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(true)
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
      setToken(token); 

        console.log(EmailId, UserID);
        console.log("NewToken: " + token);
      
        router.push('/dashboard');
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
        {isPasswordMatch && <p>Password doesn't match</p>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default SignupPage;