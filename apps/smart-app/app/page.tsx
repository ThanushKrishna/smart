"use client"
import React from 'react';
import { Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen min-w-full flex flex-col">
    <div className="self-end m-4 space-x-4">
      <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {router.push('/login')}}
        >Login
        </button>
        <button className="bg-glossy-violet-blue hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {router.push('/signup')}}
        >
          Sign Up
          </button>
      </div>
      <div className="flex-grow flex items-center justify-center text-center">
        <Typography variant="h1" align="center" gutterBottom className="text-6xl text-black font-bold">
          Welcome to Smart Leads
        </Typography>    
      </div>
    </div>
  );
};


export default LandingPage;