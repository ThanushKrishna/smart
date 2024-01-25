"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const TermsandConditions = () => {
  const router = useRouter();  
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
  
  
<div className="text-lg text-white leading-relaxed p-20">
  
  <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
  
  By accessing the Website (https://www.smartleads.co.in) and using any services provided on the Website, you acknowledge and agree to abide by the terms and conditions outlined herein. We reserve the right to modify or remove content from the Website without prior notice. Please review these terms of use regularly to stay informed of any updates.
  <br/>
  <br/>
  These terms and conditions apply to all users, including visitors and subscribers to any paid plans, who access the Website for any purpose.
  <br/>
  <br/>
  By using the Services provided by SMART LEADS, you agree to the following:
  <br/>
  <br/>
  You confirm that you are legally competent to enter into contracts under Indian law.
  SMART LEADS offers access to Services through the following methods:<br/>
  Browsing information related to Services for free.<br/>
  Utilizing features related to Services for free after logging in.<br/>
  Subscribing to a paid plan to avail of Services.<br/>
  <br/>
  For the second and third methods of accessing Services, users must fill out an online registration form. Upon completion, SMART LEADS will create an account for the user and send account details via email or another acceptable mode of communication provided in the registration form. Details of various paid plans and FAQs are available on the SMART LEADS website.<br/>

  <br/>
          <div>
    <h2>Account Responsibilities:</h2>
    <ul className="list-disc ml-8 mb-4">
      <li>Ensure the security and confidentiality of your password. Inform SMART LEADS immediately if you suspect unauthorized access or use of your password.</li>
      <li>Provide accurate and up-to-date information during registration. Inform SMART LEADS promptly of any changes to your information.</li>
      <li>Do not use the service for illegal purposes or violate any laws or regulations.</li>
      <li>Do not copy, reproduce, distribute, or exploit any part of the Service without authorization.</li>
      <li>Agree to receive periodic alerts and newsletters.</li>
    </ul>
    <br/>
    <h2>Account Suspension:</h2>
    <p>SMART LEADS reserves the right to deactivate, suspend, restrict, or terminate user accounts without prior notice in the following circumstances:</p>
    <ul className="list-disc ml-8 mb-4">
      <li>False, incorrect, or fake information provided during registration.</li>
      <li>Unauthorized use or access.</li>
      <li>Non-payment of fees or objectionable behavior.</li>
      <li>Violation of any terms and conditions outlined in this User Agreement.</li>
    </ul>
    <p>No refunds will be provided for paid plans in case of account deactivation, suspension, restriction, or termination.</p>
    <br/>
    <h2>Intellectual Property Rights:</h2>
    <ul className="list-disc ml-8 mb-4">
      <li>SMART LEADS retains all intellectual property rights related to the Website content.</li>
      <li>Users are prohibited from using Website content for commercial purposes without prior written permission from SMART LEADS.</li>
      <li>SMART LEADS trademarks and service marks are owned by the Company and cannot be used without permission.</li>
    </ul>
    <p>Users can terminate their accounts at any time without notice by discontinuing the use of Services. No refunds will be provided for paid plans in such cases.</p>
    <br/>
    <h2>Liability:</h2>
    <p>SMART LEADS (including its directors, employees, affiliates, or agents) is not liable for any losses resulting from technical or mechanical failures, weather conditions, acts of God, or other causes beyond its control.</p>
    <br/>
    <h2>Indemnity:</h2>
    <p>Users agree to indemnify and hold harmless SMART LEADS, its employees, directors, officers, agents, and successors from any claims, liabilities, damages, losses, costs, and expenses arising from user actions or inactions.</p>
    <br/>
    <h2>Jurisdiction:</h2>
    <p>This agreement is governed by Indian law, and disputes shall be resolved in the courts of Shivamogga, India.</p>
    </div>
    <br/>          
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

export default TermsandConditions