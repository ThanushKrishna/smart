"use client"
import React from 'react'
import Footer from '@/app/components/footer';

const AboutUs = () => {  
  return (
    <>
      <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
        <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About SMART LEADS Software</h1>
          <p className="mb-4">
            SMART LEADS Software is a sophisticated solution tailored for efficient management of client data. 
            With founders boasting over a decade of experience in both the insurance and IT sectors, they possess deep insights into the 
            challenges and intricacies of the insurance industry, enabling them to engineer a robust application to cater to these demands.
          </p>
          <p className="mb-4">
            The company&apos;s mission and vision revolve around empowering individuals within insurance agencies, regardless 
            of their size, with the requisite technological tools to prioritize client engagement and foster business expansion. 
            Moreover, the company is dedicated to understanding and addressing the diverse needs of the modern world across various industries.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs