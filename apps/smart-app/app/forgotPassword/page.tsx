"use client";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PASSWORD_BY_EMAIL, PHONENUMBERFROMEMAIL } from "../../graphql/queries";
import { useRouter } from 'next/navigation'
import { setToken } from "../../utils/auth";

declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAZbbnI_5Y6zqqmU4Ij0K51xpywkwwdkls",
  authDomain: "otp-verifier-53df9.firebaseapp.com",
  projectId: "otp-verifier-53df9",
  storageBucket: "otp-verifier-53df9.appspot.com",
  messagingSenderId: "614901885994",
  appId: "1:614901885994:web:d8ef2500976d5ce2c56753",
  measurementId: "G-5YWRVR2RRC"
};

const firebassapp = initializeApp(firebaseConfig);
const auth = getAuth(firebassapp);

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();   
  const [step, setStep] = useState(1);
  const [emailid, setEmailid] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: gphoneNum, loading: phoneLoading, error: phoneError, refetch } = useQuery(PHONENUMBERFROMEMAIL, {
    variables: { emailid: emailid },
    skip: !emailid || step !== 1,
    fetchPolicy: "network-only"
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD_BY_EMAIL);

  // Handler for "Next" button
  const handleNext = () => {
    setError("");
    setLoading(true);
    refetch({ emailid: emailid })
      .then((res) => {
        const phoneNumber = res.data?.phoneNumberFromEmail || null;
        if (phoneNumber) {
          setPhone(phoneNumber);
          setStep(2);
        } else {
          setError("No phone number found for this email.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch phone number.");
        setLoading(false);
      });
  };

  // Send OTP using Firebase
  const sendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }
      const confirmation = await signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setStep(3);
    } catch (err: any) {
      setError("Failed to send OTP. " + (err.message || ""));
    }
    setLoading(false);
  };

  // Verify OTP
  const verifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setStep(4);
    } catch {
      setError("Invalid OTP.");
    }
    setLoading(false);
  };

  // Update password in backend
  const handlePasswordUpdate = async () => {
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const updatedResult = await updatePassword({ variables: { emailid, password } });
      if(updatedResult){
        setSuccess("Password updated successfully!");        
        const token = updatedResult?.data?.updatePasswordByEmail?.token || null;
        setToken(token);
        router.push('/dashboard');
      }
    } catch {
      setError("Failed to update password.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] bg-gray-100">
      <p className="text-3xl mb-8">Forgot Password</p>
      <form
        className="flex flex-col items-center w-full max-w-sm gap-4"
        onSubmit={e => e.preventDefault()}
      >
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={emailid}
              onChange={e => setEmailid(e.target.value)}
              required
              className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4"
            />
            <button
              type="button"
              className="w-full bg-purple-900 rounded-3xl text-white h-11"
              onClick={handleNext}
              disabled={loading || !emailid}
            >
              {loading ? "Checking..." : "Next"}
            </button>
          </>
        )}
        <div id="recaptcha-container" />
        {step === 2 && (
          <>
            <p className="text-center">
              OTP will be sent to: <b>{phone}</b>
            </p>
            <button
              type="button"
              className="w-full bg-purple-900 rounded-3xl text-white h-11"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
              className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4"
            />
            <button
              type="button"
              className="w-full bg-purple-900 rounded-3xl text-white h-11"
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
        {step === 4 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="border-2 border-purple-950 rounded-3xl h-11 w-full px-4"
            />
            <button
              type="button"
              className="w-full bg-purple-900 rounded-3xl text-white h-11"
              onClick={handlePasswordUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}
        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center">{success}</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;