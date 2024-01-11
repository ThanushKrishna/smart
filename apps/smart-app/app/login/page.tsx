"use client"
import React, {useState} from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation'
import { LOGIN } from '../../graphql/queries'
import { useQuery  } from '@apollo/client';
import { setToken } from '../../utils/auth';

const LoginPage: React.FC = () => {

    const router = useRouter();        
    const [isSubmitted, setSubmitted] = useState<Boolean>(false);
    const [formData, setFormData] = useState({      
      email: '',
      password: '',      
    });

    const { loading: gLoginload, error:gLoginError, data:gLoginStatus } = useQuery(LOGIN, {
      variables: { input1: formData.email, input2: formData.password },
      skip: !formData, // Skip the query if vehicleno is not provided            
      });

    
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
      setSubmitted(false);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();       
    const token = gLoginStatus && gLoginStatus?.login?.token  || null;
    console.log(token);
    if(token) {     
      setToken(token); 
      router.push('/dashboard');
    }
    else{
      setSubmitted(true)
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
        Login
      </Typography>
      <div  style={formStyle} >
      <form onSubmit={handleSubmit} style={fieldStyle}>
        <TextField  name="email" label="Email" margin="normal" fullWidth type="email" required onChange={handleChange}/>
        <TextField  name="password" label="Password"  margin="normal" fullWidth type="password" required onChange={handleChange}/>
        {isSubmitted && <p>Credentails are not Valid</p>}
        <Button type="submit" variant="contained" fullWidth color="primary">
          Submit
        </Button>
      </form>
      </div>
    </Container>
  );
};

export default LoginPage;