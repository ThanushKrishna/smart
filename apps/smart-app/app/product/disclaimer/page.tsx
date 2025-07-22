"use client"
import React from 'react'
import Footer from '@/app/components/footer';

const Disclaimer = () => {
  return (
    <>
       <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
        <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Legal Disclaimers</h1>
        <p className="mb-4">
          You hereby agree that by accessing SMART LEADS Website you have read, understood and agreed to be legally bound by the following disclaimers given below hereunder.
        </p>
        <p className="mb-4">
          We and our licensors, suppliers, vendors, affiliates, officers, agents and employees make no warranty that:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>The Service will meet your requirements;</li>
          <li>The Service will be uninterrupted, timely, secure, or error-free;</li>
          <li>The Service will be accessible at any time or at all times via the channel selected or used by you;</li>
          <li>
            The information, content or advertisements contained on, distributed through, or linked, downloaded or accessed from or through the Service, or the results that may be obtained from the use of the Service, will be accurate or reliable.
          </li>
        </ul>
        <p className="mb-4">
          This disclaimer does not apply to any product warranty offered by the manufacturer of the product as specified in the product specifications. This disclaimer constitutes as an essential part of this User Agreement.
        </p>
        <p className="mb-4">
          Limitation of Liability – To the fullest extent permitted under applicable law, we, our associates or suppliers shall not be liable for any indirect, incidental, special, incidental, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses arising out of or in connection with the Website, its Services or this User Agreement.
        </p>
        <p className="mb-4">
          Without prejudice to the generality of the section above, our total liability to you for all liabilities arising out of this User Agreement be it in tort or contract is limited to the value of the product/Service ordered by you.
        </p>
      </div>      
      </div>
      <Footer />
    </>
    
  )
}

export default Disclaimer