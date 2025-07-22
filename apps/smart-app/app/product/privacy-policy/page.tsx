"use client"
import React from 'react'
import Footer from '@/app/components/footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen min-w-full flex flex-col pt-2 bg-gray-100">
      <div className="flex-1 text-lg text-purple-900 leading-relaxed px-4 py-10 md:px-20 md:py-20 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4 font-semibold">Information Collected for Account Creation</p>
        <p className="mb-4">
          We offer you the ability to browse our Website and access information about the Services without registering or providing personal information. However, to utilize specific features related to the Services, as outlined on the Website, you must create a free account. Additionally, users interested in accessing the Services (as detailed on the website) are required to subscribe to any available plans and create a user account, 
          providing the following personally identifiable information (&quot;User/Personal Information&quot;) to access the Services:
        </p>
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
        <p className="mb-4 font-semibold">Information Provided During Service Usage:</p>
        <p className="mb-4">
          When using our Services, we may collect location information (from your mobile device or associated with your IP address), usage data, viewing data, technical data (including device identifiers or IP addresses), and information provided when contacting us for support.
        </p>
        <p className="mb-4">
          By submitting Personal Information through our Site or Services, you agree to the terms of this Privacy Policy and consent to the collection, use, and disclosure of Personal Information as described.
        </p>
        <p className="mb-4 font-semibold">Use of Personal Information:</p>
        <p className="mb-4">We use Personal Information to:</p>
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
        <p className="mb-4">
          We may disclose Personal Information to government bodies, judicial bodies, or regulators as required by applicable laws.
        </p>
        <p className="mb-4">
          We may share information, including Personal Information, with third parties to facilitate service delivery (e.g., sending emails or newsletters).
        </p>
        <p className="mb-4">
          We may create Anonymous Information from Personal Information for analysis and improvement purposes and may disclose such Anonymous Information to third parties.
        </p>
        <p className="mb-4 font-semibold">Third Party Websites:</p>
        <p className="mb-4">
          We are not responsible for the privacy practices or content of third-party websites linked from our Site.
        </p>
        <p className="mb-4 font-semibold">Cookies:</p>
        <p className="mb-4">
          We may use cookies for technical purposes, such as improving site navigation or storing user preferences.
        </p>
        <p className="mb-4 font-semibold">Information Security:</p>
        <p className="mb-4">
          We implement security measures to protect Personal Information, but we cannot guarantee absolute security.
        </p>
        <p className="mb-4 font-semibold">Data Retention:</p>
        <p className="mb-4">
          We retain data provided to us for the duration required by law and to provide efficient service to our users.
        </p>
        <p className="mb-4 font-semibold">Privacy Policy Updates:</p>
        <p className="mb-4">
          This Privacy Policy may be updated periodically, and users are encouraged to review it regularly.
        </p>
        <p className="mb-4 font-semibold">Contact Information:</p>
        <p className="mb-4">
          For inquiries about this Privacy Policy, please contact us at <a className="font-bold" href="mailto:insurance@smartleads.co.in">insurance@smartleads.co.in</a> or the address provided.
        </p>
        <p className="mb-4 font-semibold">Definitions:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Anonymous Information: Information that cannot identify an individual</li>
          <li>Internet Protocol (IP): Protocol for exchanging messages between computers on a network.</li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy