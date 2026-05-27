// app/login/page.tsx (Next.js 13+ with App Router)
"use client";

import { useState } from "react";
import {  Phone, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginRequestOtpMutation } from "@/Redux/api/authApi";
import { AxiosError } from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({ phone: "" });
  const router=useRouter();
   const [loginRequestOtp] = useLoginRequestOtpMutation();

  const validatePhone = (number: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(number.replace(/\s/g, ""));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({ phone: "" });

  const fullPhone = countryCode + phone.replace(/\D/g, "");
  
  if (!validatePhone(fullPhone)) {
    setErrors({ phone: "Please enter a valid phone number" });
    return;
  }

  setIsLoading(true);
  
  try {
    const response = await loginRequestOtp({ phone: fullPhone }).unwrap();
    if(response){
       
      toast.success(response.message || "OTP sent successfully!");
      
    }
    
    // Navigate to OTP verification with phone and type
    router.push(`/verify-otp?phone=${encodeURIComponent(fullPhone)}&type=login`);
    
  } catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    toast.error("Failed to send OTP. Please try again or create an account if you don’t have one.")
  setErrors({
    phone:
      err.response?.data?.error ||
      "Failed to send OTP. Please try again or create an account if you don’t have one.",
  });
    
  } finally {
    setIsLoading(false);
  }
};

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value;
    
    
    setPhone(formattedValue);
    if (errors.phone) setErrors({ phone: "" });
  };

  const countryCodes = [
      { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "AU" },
    { code: "+49", country: "DE" },
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Sent Successfully!</h2>
          <p className="text-gray-600 mb-4">
            We&apos;ve sent a verification code to {countryCode} {phone}
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
          >
            Continue to Verification
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left Side - Enhanced Image Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 text-center max-w-lg">
          <Image
            src="/images/loginpage2.jpg"
            alt="Secure Login Illustration"
            width={300}
            height={300}
            className="w-full max-w-md shadow-2xl rounded-2xl mx-auto mb-8 transform hover:scale-105 transition-transform duration-500"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Secure & Simple Authentication
            </h3>
            <p className="text-gray-600 mb-4">
              Experience seamless login with our advanced security features and intuitive design
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-600 mr-1" />
                End-to-end encrypted
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-600 mr-1" />
                Instant OTP delivery
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-blue-200 rounded-full opacity-50 animate-float"></div>
        <div className="absolute bottom-32 right-24 w-12 h-12 bg-purple-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-green-200 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Right Side - Enhanced Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/20">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Input with Country Code */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              
              <div className="flex space-x-3">
                {/* Country Code Selector */}
                <div className="relative flex-1 max-w-24">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  >
                    {countryCodes.map(({ code }) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      placeholder="1234567890"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 border ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      required
                      maxLength={14}
                    />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                 
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              } text-white flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Continue with OTP</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Additional Information */}
          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don&apos;t have an account?</span>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/register" 
                className="inline-block w-full py-3 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] text-center"
              >
                Create New Account
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600 mr-1" />
                Your data is protected with end-to-end encryption
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}