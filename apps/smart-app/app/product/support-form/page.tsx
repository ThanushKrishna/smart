"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/footer';

const SupportForm = () => {
  const router = useRouter();
  return (
    <>
    <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
      <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Form</h1>
        <p className="mb-4">
          If you need assistance or have any questions regarding SMART LEADS, please fill out the form below and our support team will get back to you as soon as possible.
        </p>
        {/* You can add your actual support form here */}
      </div>      
    </div>
    <Footer />
    </>
  )
}

export default SupportForm