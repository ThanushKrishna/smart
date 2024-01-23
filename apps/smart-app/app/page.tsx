"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    // <div className="bg-white min-h-screen min-w-full flex flex-col pt-2 px-8 bg-cover bg-center" style={{backgroundImage: "url('images/unsplash-01.jpg')", height: '100vh', width: '100vw'}}>
       <div className="min-h-screen min-w-full flex flex-col pt-2" style={{backgroundColor: '#000033'}}>
       <div className="flex justify-between items-center pb-8">
        <p  className='text-white  font-bold pl-5'  >SMART LEADS</p>
        <div className="space-x-4 pr-2">
        <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            Home
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            Pricing
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            About Us
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/')}}
          >
            
            Contact Us
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/login')}}
          >
            LogIn
          </button>
          <button className="bg-glossy-violet-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {router.push('/signup')}}
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
              onClick={() => {router.push('/signup')}}
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
        
            <p className="text-lg text-white leading-relaxed flex justify-end">Wave goodbye to the outdated approach of handling data 
            and documents across numerous files and devices. The SMART app empowers you to centralize the management 
            of thousands of client data and documents using cutting-edge technology, ensuring swift access to your 
            requirements in mere seconds. By alleviating concerns related to data management and deadlines, you can 
            channel your focus entirely on closing deals, generating more leads, and enhancing income for your business.
            </p>
                
        </div>
           
      </div>                 
               
    
      <div className="flex justify-between px-20">  
               
      
        <div className="w-3/5">
        
          <h2 className="text-xl font-bold text-white mb-4 leading-relaxed">Never Miss a Deadline</h2>
        
            <p className="text-lg text-white leading-relaxed flex justify-start">Wave goodbye to the outdated approach of handling data 
            and documents across numerous files and devices. The SMART app empowers you to centralize the management 
            of thousands of client data and documents using cutting-edge technology, ensuring swift access to your 
            requirements in mere seconds. By alleviating concerns related to data management and deadlines, you can 
            channel your focus entirely on closing deals, generating more leads, and enhancing income for your business.
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
        
            <p className="text-lg text-white leading-relaxed flex justify-end">Wave goodbye to the outdated approach of handling data 
            and documents across numerous files and devices. The SMART app empowers you to centralize the management 
            of thousands of client data and documents using cutting-edge technology, ensuring swift access to your 
            requirements in mere seconds. By alleviating concerns related to data management and deadlines, you can 
            channel your focus entirely on closing deals, generating more leads, and enhancing income for your business.
            </p>
                
        </div>
           
      </div>        


      <h2 className="text-2xl font-bold text-white leading-relaxed pl-20">FEATURES</h2>      

      
      <div className="flex justify-evenly px-20 pt-5 pb-10">  
  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5 text-center">Client Management</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="text-lg p-2">Handling clients poses the greatest challenge in the insurance industry. With the user-friendly client management capability of SMART LEADS, efficiently overseeing all client details in a centralized location becomes simple.</p>
  </div>

  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5  text-center">Dashboard</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="text-lg p-2">Access all functionalities conveniently through a user-friendly dashboard. SMART LEADS CRM software designed for insurance agents enables seamless management of vehicle insurance and various other aspects from a single location. It offers distinct dashboards tailored for specific purposes and usage scenarios.</p>
  </div>

  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5  text-center">Master Data Management</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="text-lg p-2">Undoubtedly, insurance agencies handle a substantial amount of organizational data, emphasizing the critical and sensitive nature of data management in the business. SMART LEADS software facilitates the categorization of data at an elevated level, simplifying the overall process of data management.</p>
  </div>

  <div className="flex-1 m-8 bg-white bg-opacity-10 shadow-lg text-white rounded-lg">
    <p className="text-xl font-bold leading-relaxed p-2 pb-5  text-center">Reporting</p>
    <img src="images/star-icon.png" alt="STAR ICON" className="mx-auto my-4" />
    <p className="text-lg p-2">Generate reports effortlessly and swiftly with SMART LEADS' reporting features. This capability allows you to create and oversee reports covering policy registers, vehicle policy renewals, emissions, tax details, permits, and more. This functionality is instrumental in closely evaluating and analyzing client requirements.</p>
  </div>
</div>



    </div>

  );
};


export default LandingPage;