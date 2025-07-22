import React from 'react'
import { useRouter } from 'next/navigation';

function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-amber-900 text-white min-h-[40vh] flex flex-col justify-between">
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-around gap-8 p-10 flex-1">
        <div className="w-full md:w-auto flex flex-col items-center md:items-start">
          <p className="text-xl font-bold mb-3">Links</p>
          <ul className="text-center md:text-left">
            <li className="pb-1 cursor-pointer hover:underline" onClick={() => router.push('/product/about-us')}>About Us</li>
            <li className="pb-1 cursor-pointer hover:underline" onClick={() => router.push('/product/pricing')}>Pricing</li>
            <li className="pb-1 cursor-pointer hover:underline" onClick={() => router.push('/product/t&c')}>Terms and Conditions</li>
            <li className="pb-1 cursor-pointer hover:underline" onClick={() => router.push('/product/privacy-policy')}>Privacy Policy</li>
            <li className="pb-1 cursor-pointer hover:underline" onClick={() => router.push('/product/disclaimer')}>Disclaimer</li>
          </ul>
        </div>
        <div className="w-full md:w-auto flex flex-col items-center md:items-start">
          <p className="text-xl font-bold mb-3">Support</p>
          <ul className="text-center md:text-left">
            <li className="pb-1 cursor-pointer hover:underline" onClick={() => router.push('/product/support-form')}>Support Form</li>
          </ul>
        </div>
        <div className="w-full md:w-auto flex flex-col items-center md:items-start">
          <p className="text-xl font-bold mb-3">Contact Us</p>
          <ul className="text-center md:text-left">
            <li className="pb-1 flex items-center justify-center md:justify-start">
              <span className="mr-2">&#9993;</span>
              <span>insurance@smartleads.co.in</span>
            </li>
            <li className="pb-1 flex items-center justify-center md:justify-start">
              <span className="mr-2">&#128222;</span>
              <span>9035060060</span>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center py-2">© 2024 SMART LEADS. All rights reserved.</p>
    </footer>
  )
}

export default Footer;