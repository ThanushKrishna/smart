"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/footer';

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
    <>
       <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
        <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Consultation</h1>
        <p className="mb-4">
          SMART LEADS offers free consultation to all users. Users can schedule a consultation session with the company&apos;s representatives by filling out a form below.
        </p>
        <p className="mb-4">
          The company&apos;s representatives will contact the user at the earliest to schedule a consultation session. The company&apos;s representatives will provide the user with a detailed overview of the Services and the various features available to the user along with a demonstration of the Services and its features.
        </p>
        <p className="mb-4">
          The representatives will additionally furnish the user with a comprehensive explanation of the service pricing and the array of plans accessible to them. They will also offer a thorough rundown of the diverse payment methods at the user&apos;s disposal.
        </p>
        <div className="w-full max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block font-medium text-purple-900">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 p-2 w-full border text-purple-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block font-medium text-purple-900">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 p-2 w-full border text-purple-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-purple-900">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-purple-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded-3xl font-bold w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>      
    </div>
    <Footer />
  </>
  )
}

export default Consultation