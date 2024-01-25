"use client"
import React from 'react'
import { useRouter } from 'next/navigation';


const PrivacyPolicy = () => {
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
  <h1 className="text-3xl font-bold mb-4">  Privacy Policy </h1>
  
        <p>Information Collected for Account Creation</p>
        <br />
        <p>
          We offer you the ability to browse our Website and access information about the Services without registering or providing personal information. However, to utilize specific features related to the Services, as outlined on the Website, you must create a free account. Additionally, users interested in accessing the Services (as detailed on the website) are required to subscribe to any available plans and create a user account, 
          providing the following personally identifiable information (&quot;User/Personal Information&quot;) to access the Services:
        </p>
        <br />
         <ul className="list-disc ml-8 mb-4">
          <li>Full Name</li>
          <li>Gender</li>
          <li>Age</li>
          <li>Country</li>
          <li>Address (including ZIP/postal code)</li>
          <li>User ID</li>
          <li>Email Address</li>
          <li>User-chosen Password</li>
          <li>Contact Details</li>
          <li>Other volunteered details</li>
        </ul>
        <br />
        <p>Information Provided During Service Usage:</p>
        <br />
        <p>
          When using our Services, we may collect location information (from your mobile device or associated with your IP address), usage data, viewing data, technical data (including device identifiers or IP addresses), and information provided when contacting us for support.
        </p>
        <br />
        <p>
          By submitting Personal Information through our Site or Services, you agree to the terms of this Privacy Policy and consent to the collection, use, and disclosure of Personal Information as described.
        </p>
        <br />
        <p>Use of Personal Information:</p>
        <br />
        <p>We use Personal Information to:</p>
         <ul className="list-disc ml-8 mb-4">
          <li>Identify you as a user in our system</li>
          <li>Administer our Site and Services</li>
          <li>Provide requested Services</li>
          <li>Enhance user experience</li>
          <li>Send email notifications and newsletters</li>
          <li>Protect our services and users</li>
          <li>Perform market and customer analysis</li>
          <li>Prevent fraud or unlawful activities</li>
          <li>Analyze user demographics and activities</li>
        </ul>    

            <br />
      <p>We may disclose Personal Information to government bodies, judicial bodies, or regulators as required by applicable laws.</p>
      <p>We may share information, including Personal Information, with third parties to facilitate service delivery (e.g., sending emails or newsletters).</p>
      <p>We may create Anonymous Information from Personal Information for analysis and improvement purposes and may disclose such Anonymous Information to third parties.</p>
      
      <br/>
      <p>Third Party Websites:</p>
      <p>We are not responsible for the privacy practices or content of third-party websites linked from our Site.</p>
      <br />
      <p>Cookies:</p>
      <p>We may use cookies for technical purposes, such as improving site navigation or storing user preferences.</p>

      <br />
      <p>Information Security:</p>
      <p>We implement security measures to protect Personal Information, but we cannot guarantee absolute security.</p>
      <br />
      <p>Data Retention:</p>
      <p>We retain data provided to us for the duration required by law and to provide efficient service to our users.</p>
      <br />
      <p>Privacy Policy Updates:</p>
      <p>This Privacy Policy may be updated periodically, and users are encouraged to review it regularly.</p>
      <br />
      <p>Contact Information:</p>      
      <p>For inquiries about this Privacy Policy, please contact us at insurance@smartleads.co.in or the address provided.</p>
      <br />
      <p>Definitions:</p>
       <ul className="list-disc ml-8 mb-4">
        <li>Anonymous Information: Information that cannot identify an individual</li>
        <li>Internet Protocol (IP): Protocol for exchanging messages between computers on a network.</li>
      </ul>

</div>

<footer className='bg-black text-white py-50'>
      <div className='flex flex-row justify-around p-10'>
        <div>
          <p className='pb-3 text-xl font-bold'>Links</p>
           <ul >
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

export default PrivacyPolicy