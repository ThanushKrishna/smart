"use client"
import React, {useState} from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation'
import { LOGIN } from '../../graphql/queries'
import { useLazyQuery  } from '@apollo/client';
import { setToken } from '../../utils/auth';




const LoginPage: React.FC = () => {

    const router = useRouter();        
    const [isSubmitted, setSubmitted] = useState<Boolean>(false);
    const [formData, setFormData] = useState({      
      email: '',
      password: '',      
    });

    const [getLoginStatus] = useLazyQuery(LOGIN)

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
      setSubmitted(false);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();   
    setSubmitted(false);    

      getLoginStatus({
      variables: { input1: formData.email, input2: formData.password },
      onCompleted: (data) => {
        const token = data?.login?.token || null;
        if (token) {
          setToken(token);
          router.push('/dashboard');
        } else {
          setSubmitted(true);
        }
      },
      onError: () => {
        setSubmitted(true);
      }
    });
  };

  
  const handleForgotPassword = () => {
      router.push('/forgotPassword');
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
  <div className="flex flex-col justify-center items-center min-h-[93.2vh] bg-gray-100 relative overflow-hidden">
    {/* Logo background */}
    <img
      src="/images/SmartLeads01-Logo.png"
      alt="SMART LEADS Logo"
      className="absolute inset-0 m-auto opacity-20 w-4/5 rounded-full max-w-lg pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />
    <div className="relative z-10 w-full flex flex-col items-center">      
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm gap-4">
        <input
          name="email"
          type="email"
          placeholder="EmailID"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        {isSubmitted && <p className="text-red-600">Credentials are not valid</p>}
        <button type="submit" 
          className="w-full rounded-3xl text-white h-11
          bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600  hover:bg-purple-800 font-bold"
        >
          LogIn
        </button>
      </form>
      <button
        type="button"
        onClick={handleForgotPassword}
        className="w-full max-w-sm rounded-3xl text-cyan-900 h-11 mt-4 hover:bg-gray-200 font-bold"
      >
        Forgot Password?
      </button>
    </div>
  </div>
);
};

export default LoginPage;