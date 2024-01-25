"use client"
import React from 'react'
import { useRouter } from 'next/navigation';


const Disclaimer = () => {
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

          
          <h1 className="text-3xl font-bold mb-4">Legal Disclaimers</h1>

          
          <p className="mb-4">You hereby agree that by accessing SMART LEADS Website you have read, understood and agreed to be legally bound by the following disclaimers given below hereunder.</p>

          <p className="mb-4">We and our licensors, suppliers, vendors, affiliates, officers, agents and employees make no warranty that:</p>

          
          <ul className="list-disc ml-8 mb-4">
              <li>The Service will meet your requirements;</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free;</li>
              <li>The Service will be accessible at any time or at all times via the channel selected or used by you;</li>
              <li>The information, content or advertisements contained on, distributed through, or linked, downloaded or accessed from or through the Service, or the results that may be obtained from the use of the Service, will be accurate or reliable.</li>
          </ul>

          
          <p className="mb-4">This disclaimer does not apply to any product warranty offered by the manufacturer of the product as specified in the product specifications. This disclaimer constitutes as an essential part of this User Agreement.</p>

          
          <p className="mb-4">Limitation of Liability – To the fullest extent permitted under applicable law, we, our associates or suppliers shall not be liable for any indirect, incidental, special, incidental, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses arising out of or in connection with the Website, its Services or this User Agreement.</p>

          
          <p className="mb-4">Without prejudice to the generality of the section above, our total liability to you for all liabilities arising out of this User Agreement be it in tort or contract is limited to the value of the product/Service ordered by you.</p>
        
        
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

export default Disclaimer