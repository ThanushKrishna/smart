"use client"
import React from 'react';
import { Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen min-w-full flex flex-col px-8">
      <div className="self-end space-x-4 pb-8">
        <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {router.push('/login')}}
        >
          Login
        </button>
        <button className="bg-glossy-violet-blue hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {router.push('/signup')}}
        >
          Sign Up
        </button>
      </div>
      <div className="flex-grow flex flex-row items-start h-2/5 bg-white shadow rounded p-4">
      <div className="w-2/5">
        <img src="images/work-chaos.jpeg" alt="work-chaos" className='w-[40vw] h-[50vh] rounded' />
      </div>
      <div className="w-3/5 pl-8">
        <h2 className="text-4xl font-bold text-glossy-violet-blue mb-4 leading-relaxed">A SMART Lead management system</h2>
        <p className="text-lg text-gray-700 leading-relaxed">Wave goodbye to the outdated approach of handling data and documents across numerous files and devices. The SMART app empowers you to centralize the management of thousands of client data and documents using cutting-edge technology, ensuring swift access to your requirements in mere seconds. By alleviating concerns related to data management and deadlines, you can channel your focus entirely on closing deals, generating more leads, and enhancing income for your business.</p>
      </div>
      </div>
    </div>
  );
};


export default LandingPage;