"use client"
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
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

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const fieldStyle: React.CSSProperties = {
    width: '50%',
    marginBottom: '1rem',
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Sign Up
      </Typography>
      <div style={formStyle}>
        <form onSubmit={handleSubmit} style={fieldStyle}>
          <TextField
            name="fullName"
            label="Full Name"
            margin="normal"
            required
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            margin="normal"
            type="email"
            required
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="mobile"
            label="Mobile Number"
            margin="normal"
            type="text"
            required
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
            fullWidth
          />
          {isPasswordMatch && <p>Passwords does not match</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignupPage;