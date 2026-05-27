// app/register/page.tsx (Next.js 13+ with App Router)
"use client";

import { useState } from "react";
import { Phone, Shield, User, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSignupRequestOtpMutation } from "@/Redux/api/authApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [showSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [signupRequestOtp] = useSignupRequestOtpMutation();
  const router = useRouter();

  const countryCodes = [
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "AU" },
    { code: "+49", country: "DE" },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
  if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
  }
}


    if (step === 2) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      const fullPhone = countryCode + formData.phone.replace(/\D/g, "");
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!phoneRegex.test(fullPhone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value;
    
    
    
    setFormData(prev => ({ ...prev, phone: formattedValue }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateStep(2)) return;

  setIsLoading(true);
  
  try {
    const fullPhone = countryCode + formData.phone.replace(/\D/g, "");
    
    const response = await signupRequestOtp({
      phone: fullPhone,name: formData.firstName+formData.lastName,email:formData.email
    }).unwrap();
    if(response.message){
       toast.success(response.message || "OTP sent successfully!");
      
    }
    
    // Store user data temporarily for the OTP verification
    localStorage.setItem("tempUserData", JSON.stringify({
      
      name: formData.firstName+formData.lastName,
      phone: fullPhone,
      email: formData.email
    }));
    
    // Navigate to OTP verification with phone and type
    // router.push(`/verify-otp?phone=${encodeURIComponent(fullPhone)}&type=signup`);
    router.push(
  `/verify-otp?phone=${encodeURIComponent(fullPhone)}&type=signup&name=${encodeURIComponent(
    formData.firstName + " " + formData.lastName
  )}&email=${encodeURIComponent(formData.email)}`
);


    
  } catch (error: unknown) {
    toast.error("Registration failed. Please try again.")
    
  let message = "Registration failed. Please try again.";

  // Type guard to safely access error.data.error
  if (error && typeof error === "object" && "data" in error) {
    const errObj = error as { data?: { error?: string } };
    if (errObj.data?.error) {
      message = errObj.data.error;
    }
  }

  setErrors({ submit: message });
} finally {
    setIsLoading(false);
  }
};

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">
            We&quot;ve sent a verification code to {countryCode} {formData.phone}
          </p>
          <div className="space-y-3">
            <Link
              href="/verify-otp"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] text-center"
            >
              Continue to Verification
            </Link>
            <Link
              href="/"
              className="block w-full py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-medium transition-all duration-200 text-center"
            >
              Back to Home
            </Link>
          </div>
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
            alt="Create Account Illustration"
            width={300}
            height={300}
            className="w-full max-w-md shadow-2xl rounded-2xl mx-auto mb-8 transform hover:scale-105 transition-transform duration-500"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Join Our Community
            </h3>
            <p className="text-gray-600 mb-4">
              Create your account with just your name and phone number for secure authentication
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-600 mr-1" />
                Secure verification
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 text-blue-600 mr-1" />
                Instant access
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-blue-200 rounded-full opacity-50 animate-float"></div>
        <div className="absolute bottom-32 right-24 w-12 h-12 bg-purple-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-green-200 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/20">
          {/* Header with Back Button */}
          <div className="flex items-center mb-6">
            <Link
              href="/login"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-500 mt-1">Join us in just 2 steps</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of 2</span>
              <span>{Math.round((currentStep / 2) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Name Information */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`w-full px-4 py-3 pl-10 border ${
                          errors.firstName ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`w-full px-4 py-3 border ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                {/* Email Field */}
    <div>
      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
        Email Address
      </label>
      <div className="relative">
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full px-4 py-3 pl-10 border ${
            errors.email ? "border-red-300" : "border-gray-300"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        />
        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>

              </div>
            )}

            {/* Step 2: Phone Verification */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
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
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={`w-full px-4 py-3 pr-10 border ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                          required
                          maxLength={14}
                        />
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    We&apos;ll send a verification code to this number
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-3 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="flex-1 py-3 px-4 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                  } text-white flex items-center justify-center space-x-2`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Additional Information */}
          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>
            
            <Link
              href="/login"
              className="block w-full text-center py-3 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-700 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In Instead
            </Link>
          </div>

          {/* Security Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center">
              <Shield className="w-3 h-3 text-green-600 mr-1" />
              Your data is protected with end-to-end encryption
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}