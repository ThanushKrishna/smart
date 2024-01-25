"use client"
import React from 'react'
import { useRouter } from 'next/navigation';


const AboutUs = () => {
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

        <div  className="text-lg  text-white leading-relaxed p-20" style={{minHeight: '100vh'}}>       
          
          
          <h1 className="text-3xl font-bold mb-4">About SMART LEADS Software</h1>
        
        <p className="mb-4">SMART LEADS Software is a sophisticated solution tailored for efficient management of client data. 
        With founders boasting over a decade of experience in both the insurance and IT sectors, they possess deep insights into the 
        challenges and intricacies of the insurance industry, enabling them to engineer a robust application to cater to these demands.</p>

        <p className="mb-4">The company's mission and vision revolve around empowering individuals within insurance agencies, regardless 
        of their size, with the requisite technological tools to prioritize client engagement and foster business expansion. 
        Moreover, the company is dedicated to understanding and addressing the diverse needs of the modern world across various industries.</p>
          

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

export default AboutUs