"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';



const Consultation = () => {
 
 
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { fullName, phoneNumber, email });
    router.push('/');
  };


  return (

    <div className="min-h-screen min-w-full flex flex-col pt-2" style={{backgroundColor: '#000033'}}>
    <div className="flex justify-between items-center pb-8">
     <h3  className='text-white  font-bold pl-5'  >SMART LEADS</h3>
     <div className="space-x-4 pr-2">
     <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         onClick={() => router.push('/')}
       >
         Home
       </button>
       <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         onClick={() => router.push('/product/pricing')}
       >
         Pricing
       </button>
       <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         onClick={() => router.push('/product/about-us')}            
       >
         About Us
       </button>
      
       <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         onClick={() => router.push('/login')}
       >
         LogIn
       </button>
       <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         onClick={() => router.push('/signup')}
       >
         Sign Up
       </button>
     </div>
   </div>

    
      <div className="text-lg text-white leading-relaxed p-20" style={{minHeight: '100vh'}}>
        <h1 className="text-3xl font-bold mb-4">Consultation</h1>
        <p className="mb-4">SMART LEADS offers free consultation to all users. Users can schedule a consultation session with the company&apos;s representatives by filling out a form below.</p>
        <p className="mb-4"> The company&apos;s representatives will contact the user at the earliest to schedule a consultation session. The company&apos;s representatives will provide the user with a detailed overview of the Services and the various features available to the user along with  a demonstration of the Services and its features.</p>
        <p className="mb-4">The representatives will additionally furnish the user with a comprehensive explanation of the service pricing and the array of plans accessible to them. They will also offer a thorough rundown of the diverse payment methods at the user&apos;s disposal. </p>        
      
      
        {/* <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg"> */}
        <div className="text-lg text-white w-2/5 pt-20" >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block  font-medium">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 p-2 w-full border text-black rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-medium">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 w-full border  text-black rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md  text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>

      </div>
      

      <footer className='bg-black text-white py-50'>
      <div className='flex flex-row justify-around p-10'>
        <div>
          <p className='pb-3 text-xl font-bold'>Links</p>
          <ul>
            <li className='pb-1' onClick={() => router.push('/product/about-us')} style={{cursor: 'pointer'}}>About Us</li>
            <li className='pb-1' onClick={() => router.push('/product/pricing')} style={{cursor: 'pointer'}}>Pricing</li>
            <li className='pb-1' onClick={() => router.push('/product/t&c')} style={{cursor: 'pointer'}}>Terms and Conditions</li>
            <li className='pb-1' onClick={() => router.push('/product/privacy-policy')} style={{cursor: 'pointer'}}>Privacy Policy</li>
            <li className='pb-1' onClick={() => router.push('/product/disclaimer')} style={{cursor: 'pointer'}}>Disclaimer</li>
          </ul>
        </div>
        <div>
        <p className='pb-3 text-xl font-bold'>Support</p>
        <ul>
            <li className='pb-1' onClick={() => router.push('/product/support-form')} style={{cursor: 'pointer'}}>Support Form</li>            
          </ul>
        </div>
        <div>
        <p className='pb-3 text-xl font-bold'>Contact Us</p>
        <ul>
            <li> <span> &#9993; </span> <span className='pb-1'> insurance@smartleads.co.in </span> </li>             
            <li> <span> 	&#128222; </span> <span className='pb-1'>   9035060060 </span> </li>                  
          </ul>
        </div>
      </div>
      <p className='text-center py-2'>© 2024 SMART LEADS. All rights reserved.</p>
    </footer>
    

   
    </div>
  )
}

export default Consultation