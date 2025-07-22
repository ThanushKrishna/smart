"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/footer';

const TermsandConditions = () => {
  const router = useRouter();  
  return (    
    <>
    <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
      <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">
          By accessing the Website (<span className="underline">https://www.smartleads.co.in</span>) and using any services provided on the Website, you acknowledge and agree to abide by the terms and conditions outlined herein. We reserve the right to modify or remove content from the Website without prior notice. Please review these terms of use regularly to stay informed of any updates.
        </p>
        <p className="mb-4">
          These terms and conditions apply to all users, including visitors and subscribers to any paid plans, who access the Website for any purpose.
        </p>
        <p className="mb-4">
          By using the Services provided by SMART LEADS, you agree to the following:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>You confirm that you are legally competent to enter into contracts under Indian law.</li>
          <li>SMART LEADS offers access to Services through the following methods:
            <ul className="list-disc ml-8">
              <li>Browsing information related to Services for free.</li>
              <li>Utilizing features related to Services for free after logging in.</li>
              <li>Subscribing to a paid plan to avail of Services.</li>
            </ul>
          </li>
        </ul>
        <p className="mb-4">
          For the second and third methods of accessing Services, users must fill out an online registration form. Upon completion, SMART LEADS will create an account for the user and send account details via email or another acceptable mode of communication provided in the registration form. Details of various paid plans and FAQs are available on the SMART LEADS website.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Account Responsibilities:</h2>
        <ul className="list-disc ml-8 mb-4">
          <li>Ensure the security and confidentiality of your password. Inform SMART LEADS immediately if you suspect unauthorized access or use of your password.</li>
          <li>Provide accurate and up-to-date information during registration. Inform SMART LEADS promptly of any changes to your information.</li>
          <li>Do not use the service for illegal purposes or violate any laws or regulations.</li>
          <li>Do not copy, reproduce, distribute, or exploit any part of the Service without authorization.</li>
          <li>Agree to receive periodic alerts and newsletters.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Account Suspension:</h2>
        <p className="mb-4">
          SMART LEADS reserves the right to deactivate, suspend, restrict, or terminate user accounts without prior notice in the following circumstances:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>False, incorrect, or fake information provided during registration.</li>
          <li>Unauthorized use or access.</li>
          <li>Non-payment of fees or objectionable behavior.</li>
          <li>Violation of any terms and conditions outlined in this User Agreement.</li>
        </ul>
        <p className="mb-4">
          No refunds will be provided for paid plans in case of account deactivation, suspension, restriction, or termination.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Intellectual Property Rights:</h2>
        <ul className="list-disc ml-8 mb-4">
          <li>SMART LEADS retains all intellectual property rights related to the Website content.</li>
          <li>Users are prohibited from using Website content for commercial purposes without prior written permission from SMART LEADS.</li>
          <li>SMART LEADS trademarks and service marks are owned by the Company and cannot be used without permission.</li>
        </ul>
        <p className="mb-4">
          Users can terminate their accounts at any time without notice by discontinuing the use of Services. No refunds will be provided for paid plans in such cases.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Liability:</h2>
        <p className="mb-4">
          SMART LEADS (including its directors, employees, affiliates, or agents) is not liable for any losses resulting from technical or mechanical failures, weather conditions, acts of God, or other causes beyond its control.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Indemnity:</h2>
        <p className="mb-4">
          Users agree to indemnify and hold harmless SMART LEADS, its employees, directors, officers, agents, and successors from any claims, liabilities, damages, losses, costs, and expenses arising from user actions or inactions.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Jurisdiction:</h2>
        <p className="mb-4">
          This agreement is governed by Indian law, and disputes shall be resolved in the courts of Shivamogga, India.
        </p>
      </div>        
    </div>
    <Footer />    
    </>
  )
}

export default TermsandConditions