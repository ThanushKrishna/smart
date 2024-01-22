"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen min-w-full flex flex-col pt-2 px-8 bg-cover bg-center" style={{backgroundImage: "url('images/unsplash-01.jpg')", height: '100vh', width: '100vw'}}>
       <div className="flex justify-between items-center pb-8">
        <p  className='text-white  font-bold'  >SMART LEADS</p>
        <div className="space-x-4">
        <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            Home
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            About Us
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            
            Contact Us
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/login')}}
          >
            LogIn
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/signup')}}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-row items-start rounded p-4">
      {/* <div className="w-2/5">
        <img src="images/work-chaos.jpeg" alt="work-chaos" className='w-[80%] h-[85%] rounded' />
      </div> */}
      <div className="w-3/5 pl-8">
        <h2 className="text-4xl font-bold text-white mb-4 leading-relaxed">A SMART Lead management system</h2>
        <p className="text-lg text-white leading-relaxed">Wave goodbye to the outdated approach of handling data and documents across numerous files and devices. The SMART app empowers you to centralize the management of thousands of client data and documents using cutting-edge technology, ensuring swift access to your requirements in mere seconds. By alleviating concerns related to data management and deadlines, you can channel your focus entirely on closing deals, generating more leads, and enhancing income for your business.</p>
      </div>
    </div>
    </div>
  );
};


export default LandingPage;