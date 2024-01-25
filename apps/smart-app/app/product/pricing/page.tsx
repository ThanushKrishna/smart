"use client"
import React from 'react'
import { useRouter } from 'next/navigation';


const Pricing = () => {
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

                <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between">
                  <div className="flex flex-col justify-center items-center md:items-start md:justify-between md:w-1/2 md:pr-8">
                    <h1 className="text-3xl font-bold mb-4">Pricing</h1>
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
                    <p className="mb-4">The paid plans are non-refundable. However, if you are not satisfied with the Services provided by SMART LEADS, you can contact us at <a className='font-bold' href="mailto:insurance@smartleads.co.in">insurance@smartleads.co.in</a>  </p>                
                  </div>
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

export default Pricing