"use client"
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../graphql/queries'
import { setToken } from '../../utils/auth';
import { useRouter } from 'next/navigation'

const SignupPage: React.FC = () => {

  const router = useRouter();
  const [createUser] = useMutation(SIGNUP);
  const[isPasswordMatch, setPasswordMatch] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {   
    setPasswordMatch(false) ;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [firstname, lastname] = formData.fullName.split(' ');

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(true)
      console.error("Passwords don't match");
      return;
    }

    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstname,
            lastname,
            emailid: formData.email,
            password: formData.password,
            mobile: formData.mobile,
          },
        },
      });

      // Assuming your server returns the user and token upon successful registration
      const EmailId = data.signUp.emailid;
      const UserID = data.signUp.userid;
      const token = data.signUp.token;
      setToken(token); 

        console.log(EmailId, UserID);
        console.log("NewToken: " + token);
      
        router.push('/dashboard');
    } catch (error:any) {
      console.error('Error creating user:', error.message!);
    }
  };



  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] bg-gray-100">
      <img
      src="/images/SmartLeads01-Logo.png"
      alt="SMART LEADS Logo"
      className="absolute inset-0 m-auto opacity-20 w-4/5 rounded-full max-w-lg pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />      
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm gap-4">
        <input
          name="fullName"
          placeholder="Full Name"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        <input
          name="mobile"
          placeholder="Mobile"
          type="text"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          required
          className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4 text-purple-950 font-bold"
          onChange={handleChange}
        />
        {isPasswordMatch && <p className="text-red-600">Passwords do not match</p>}
        <button type="submit" 
        className="w-full rounded-3xl text-white h-11  bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600  
        hover:bg-purple-800 transition-colors font-bold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;