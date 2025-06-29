"use client";
import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
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

  //const [gphoneNum] = useLazyQuery(PHONENUMBERFROMEMAIL)

  // 1. Mutation to update password in backend
  const [updatePassword] = useMutation(UPDATE_PASSWORD_BY_EMAIL);

// 2. Fetch phone number for email from backend
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


  // 3. Send OTP using Firebase
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

  // 4. Verify OTP
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

  // 5. Update password in backend
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
    
      console.log("updatedResult: ", updatedResult);

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
     <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      {step === 1 && (
       <>
    <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={emailid}
            onChange={e => setEmailid(e.target.value)}
            required
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleNext}
            disabled={loading || !emailid}
          >
            {loading ? "Checking..." : "Next"}
          </Button>
  </>
      )}
      <div id="recaptcha-container" />
      {step === 2 && (
        <>
          <Typography align="center" gutterBottom>
            OTP will be sent to: <b>{phone}</b>
          </Typography>          
          <Button
            variant="contained"
            fullWidth
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </>
      )}
      {step === 3 && (
        <>
          <TextField
            label="Enter OTP"
            fullWidth
            margin="normal"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
          <Button
            variant="contained"
            fullWidth
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </>
      )}
      {step === 4 && (
        <>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handlePasswordUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </>
      )}
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" align="center" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
    </Container>
  );
};

export default ForgotPasswordPage;