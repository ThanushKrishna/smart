"use client"
import React from 'react'
import Footer from '@/app/components/footer';

const Pricing = () => {  
  return (
    <>
       <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
        <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h1>
        <p className="mb-4">SMART LEADS offers access to Services through the following methods:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Browsing information related to Services for free.</li>
          <li>Utilizing features related to Services for free after logging in.</li>
          <li>Subscribing to a paid plan to avail of Services.</li>
        </ul>
        <p className="mb-4">The pricing of the paid plans is as follows:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Monthly Plan: INR 999</li>
          <li>Quarterly Plan: INR 2999</li>
          <li>Half-yearly Plan: INR 4999</li>
          <li>Yearly Plan: INR 9999</li>
        </ul>
        <p className="mb-4">The above-mentioned prices are inclusive of all taxes.</p>
        <p className="mb-4">The paid plans can be subscribed to by making an online payment through the Website. The payment can be made through any of the following methods:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Debit Card</li>
          <li>Credit Card</li>
          <li>Net Banking</li>
          <li>UPI</li>
          <li>Wallets</li>
        </ul>
        <p className="mb-4">
          The paid plans are non-refundable. However, if you are not satisfied with the Services provided by SMART LEADS, you can contact us at <a className='font-bold' href="mailto:insurance@smartleads.co.in">insurance@smartleads.co.in</a>
        </p>
      </div>      
    </div>
    <Footer />
    </>
  )
}

export default Pricing