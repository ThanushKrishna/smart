"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    // <div className="bg-white min-h-screen min-w-full flex flex-col pt-2 px-8 bg-cover bg-center" style={{backgroundImage: "url('images/unsplash-01.jpg')", height: '100vh', width: '100vw'}}>
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
      


    <div className="flex justify-between py-40 px-20">      
      
      <div className="w-3/5">
      
        <h2 className="text-4xl font-bold text-white mb-4 leading-relaxed">A SMART Lead management system</h2>
      
        <p className="text-lg text-white leading-relaxed">Wave goodbye to the outdated approach of handling data 
        and documents across numerous files and devices. The SMART app empowers you to centralize the management 
        of thousands of client data and documents using cutting-edge technology, ensuring swift access to your 
        requirements in mere seconds. By alleviating concerns related to data management and deadlines, you can 
        channel your focus entirely on closing deals, generating more leads, and enhancing income for your business.
        </p>
      
        <div className='pt-20 flex justify-start'>
          <div className='flex'>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {router.push('/signup')}}
            >
              Sign Up Now
            </button>

            </div>

            <div className='pl-20'>
            <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {router.push('/product/consultation')}}
            >
              Book a Consultation
            </button>
          </div>
        </div>

      </div>
      
        <div className="w-2/5 flex justify-end">
          <img src="images/work-smart-02.jpg" alt="work-chaos" className='w-[100%] h-[100%] rounded-full' />
        </div>   

    </div>     
                  

      <h2 className="text-2xl font-bold text-white mb-4 leading-relaxed pl-20">BENEFITS</h2>
               
    
      <div className="flex justify-between pt-20 px-20">  
        
        <div className="w-2/5 flex justify-start">
          <img src="images/all-in-one-01.jpg" alt="work-chaos" className='w-[80%] h-[70%] rounded-full' />
        </div>             
      
        <div className="w-3/5">
        
          <h2 className="text-xl font-bold text-white mb-4 leading-relaxed">All you need is in Single place</h2>
        
            <p className="text-lg text-white leading-relaxed flex justify-end">You only require a single platform where all your needs are met. 
            With over 50 fields and 8 document upload fields within the application, you have everything necessary to finalize a deal with a client. 
            There's no need to worry about accessing user data through various channels.
            </p>
                
        </div>
           
      </div>                 
               
    
      <div className="flex justify-between px-20">  
               
      
        <div className="w-3/5">
        
          <h2 className="text-xl font-bold text-white mb-4 leading-relaxed">Never Miss a Deadline</h2>
        
            <p className="text-lg text-white leading-relaxed flex justify-start">With SMART LEADS app consolidating all your data, the dashboard 
            is structured to display all clients due in six distinct categories, 
            covering various timeframes such as today, tomorrow, next week, and next month.
            </p>
                
        </div>

        <div className="w-2/5 flex justify-end">
          <img src="images/deadline-02.jpg" alt="deadline" className='w-[80%] h-[90%] rounded-full' />
        </div>             
           
      </div>     
      


      <div className="flex justify-between px-20 pb-40">  
        
        <div className="w-2/5">
          <img src="images/productivity-04.jpg" alt="productivity" className='w-[80%] h-[70%] rounded-full' />
        </div>             
      
      
        <div className="w-3/5">
        
          <h2 className="text-xl font-bold text-white mb-4 leading-relaxed">Increased Productivity</h2>
        
            <p className="text-lg text-white leading-relaxed flex justify-end">With all client data, due dates, relevant documents, and 
            information consolidated in a single location, your primary concern is closing as many deals as possible each day. 
            This allows you to unleash your full potential and concentrate on what truly matters for expanding your business.
            </p>
                
        </div>
           
      </div>        


      <h2 className="text-2xl font-bold text-white leading-relaxed pl-20">FEATURES</h2>      

      
      <div className="flex justify-evenly px-20 pt-5 pb-10">  
  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5 text-center">Client Management</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="p-2">Handling clients poses the greatest challenge in the insurance industry. With the user-friendly client management capability of SMART LEADS, efficiently overseeing all client details in a centralized location becomes simple.</p>
  </div>

  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5  text-center">Dashboard</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="p-2">Access all functionalities conveniently through a user-friendly dashboard. SMART LEADS CRM software designed for insurance agents enables seamless management of vehicle insurance and various other aspects from a single location. It offers distinct dashboards tailored for specific purposes and usage scenarios.</p>
  </div>

  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5  text-center">Master Data Management</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="p-2">Undoubtedly, insurance agencies handle a substantial amount of organizational data, emphasizing the critical and sensitive nature of data management in the business. SMART LEADS software facilitates the categorization of data at an elevated level, simplifying the overall process of data management.</p>
  </div>

  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5  text-center">Reporting</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className=" p-2">Generate reports effortlessly and swiftly with SMART LEADS reporting features. This capability allows you to create and oversee reports covering policy registers, vehicle policy renewals, emissions, tax details, permits, and more. This functionality is instrumental in closely evaluating and analyzing client requirements.</p>
  </div>
</div>


    <div className="flex flex-col items-center justify-center px-20 py-10  text-center">
      <h2 className="text-2xl font-bold text-white mb-20">Frequently Asked Questions</h2>
      
      <details className="mb-10 text-white">
        <summary className="font-bold mb-2">What is SMART LEADS Software?</summary>
        <p>SMART LEADS operates as a Software as a Service (SAAS) platform for vehicle insurance & other management, designed to enhance the efficiency of 
          agencies. This system contributes to improved business operations, 
          ultimately leading to increased revenue through the enhancement of client relationships.</p>
      </details>
      

      <details className="mb-10 text-white flex flex-col items-start">
        <summary className="font-bold mb-2">Who can use SMART LEADS?</summary>
        <p>This software is suitable for use by individual insurance agents, as well as small or large agencies and insurance brokers.</p>
      </details>

      <details className="mb-10 text-white flex flex-col items-start">
        <summary className="font-bold mb-2">Do we need to install any software to use SMART LEADS?</summary>
        <p>The beauty of SAAS-based software lies in the fact that there&apos;s no need to install any software on your devices. 
          This system can be accessed from any device—be it a desktop, 
          laptop, or mobile—from any corner of the world, provided you have a reliable internet connection.</p>
      </details>

      <details className="mb-10 text-white flex flex-col justify-center">
        <summary className="font-bold mb-2">Can I use it on mobile like an APP?</summary>
        <p>Absolutely! You have the flexibility to install it as a Progressive Web Application (PWA) without the need to download 
          it from the Google Play Store. Once installed as a PWA, you can access and use it on your mobile device as if it were a standalone app.
          However, it&apos;s important to note that due to its extensive data management capabilities, 
          the optimal viewing experience is achieved on a desktop.</p>
      </details>

      <details className="mb-10 text-white flex flex-col items-start">
        <summary className="font-bold mb-2">How secure is your data?</summary>
        <p>Your data is securely stored in MongoDB hosted on AWS, and the application itself is hosted on Vercel. 
          Both AWS and Vercel are industry leaders known for their reliability and security measures. 
          It&apos;s worth noting that they adhere to GDPR compliance standards, ensuring that your data is handled in accordance with 
          data protection regulations. This provides an added layer of assurance regarding the privacy and security of the information 
          stored and processed by the application.</p>
      </details>
    </div>

    <div className="mt-10 py-5 bg-white bg-opacity-10 text-center">
    <h2 className="text-2xl font-bold text-white py-5 mb-2">Ready to get started?</h2>
    <p className='text-white pb-5'> Contact us today to elevate your insurance business in the competitive landscape.</p>
    <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full"
              onClick={() => {router.push('/signup')}}
            >
              Get 15 days Free Trial
            </button>
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

  );
};


export default LandingPage;