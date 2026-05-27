// app/verify-otp/page.tsx
"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Shield, Phone, ArrowLeft, CheckCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignupVerifyOtpMutation, useLoginVerifyOtpMutation } from "@/Redux/api/authApi";
import { useAppDispatch } from "@/Redux/store";
import { setCredentials } from "@/Redux/slices/authSlice";
import Image from "next/image";
import toast from "react-hot-toast";

type User = {
  id: string;
  name: string;
  phone: string;
  profileURL: string;
  email: string;
  createdAt: Date;
};

// Create a separate component that uses useSearchParams
const VerifyOtpContent = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authType, setAuthType] = useState<"signup" | "login">("signup");
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // API mutations
  const [signupVerifyOtp] = useSignupVerifyOtpMutation();
  const [loginVerifyOtp] = useLoginVerifyOtpMutation();

  // Get phone number and auth type from URL params
  const phoneNumber = searchParams.get("phone") || "";
  const type = searchParams.get("type") as "signup" | "login";
  const username = searchParams.get("name") || "Username";
  const email=searchParams.get("email")||"example@gmail.com"

  useEffect(() => {
    if (type) {
      setAuthType(type);
    }
  }, [type]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const focusNextInput = (index: number) => {
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: "" }));
    }

    if (value !== "" && index < 5) {
      focusNextInput(index);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      focusPrevInput(index);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusPrevInput(index);
    } else if (e.key === "ArrowRight" && index < 5) {
      focusNextInput(index);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, index) => {
        if (index < 6) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
      
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      // In a real app, you would call the resend OTP API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(30);
      setErrors({});
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.log(error);
      setErrors({ resend: "Failed to resend OTP. Please try again." });
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join("");
    
    // Validation
    if (otpString.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit OTP" });
      return;
    }

    if (!/^\d{6}$/.test(otpString)) {
      setErrors({ otp: "OTP must contain only numbers" });
      return;
    }

    setIsLoading(true);

    try {
      let response;
      
      if (authType === "signup") {
        response = await signupVerifyOtp({
          phone: phoneNumber.replace(/\D/g, ""),
          otp: otpString,
          name: username ,
          email:email,
        }).unwrap();
      } else {
        response = await loginVerifyOtp({
          phone: phoneNumber.replace(/\D/g, ""),
          otp: otpString
        }).unwrap();
      }

      // Dispatch to Redux store
      dispatch(setCredentials({
        user: response.user as User,
        token: response.token,
      }));
      toast.success("Verification Successful!.")
      setShowSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/");
      }, 2000);
      
    } catch (error: unknown) {
      toast.success("Verification failed. Please try again.")

      let message = "Verification failed. Please try again.";

      if (error && typeof error === "object" && "data" in error) {
        const errObj = error as { data?: { error?: string } };
        if (errObj.data?.error) {
          message = errObj.data.error;
        }
      }

      setErrors({ verify: message });
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Successful!</h2>
          <p className="text-gray-600 mb-4">
            {authType === "signup" ? "Your account has been created successfully!" : "You have been logged in successfully!"}
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting to Home...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative z-10 text-center max-w-lg">
          <Image
            src="/images/loginpage2.jpg"
            alt="OTP Verification Illustration"
            width={400}
            height={300}
            className="w-full max-w-md mx-auto mb-8 transform hover:scale-105 transition-transform duration-500"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Secure Verification
            </h3>
            <p className="text-gray-600 mb-4">
              Enter the 6-digit code sent to your phone to complete your {authType === "signup" ? "registration" : "login"}
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-600 mr-1" />
                Secure code
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-600 mr-1" />
                Phone verified
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-blue-200 rounded-full opacity-50 animate-float"></div>
        <div className="absolute bottom-32 right-24 w-12 h-12 bg-purple-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-green-200 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Right Side - OTP Verification Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/20">
          {/* Header with Back Button */}
          <div className="flex items-center mb-6">
            <Link
              href={authType === "signup" ? "/register" : "/login"}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Verify OTP
              </h1>
              <p className="text-gray-500 mt-1">Enter your verification code</p>
            </div>
          </div>

          {/* Phone Number Display */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">
              Code sent to
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-gray-800">
              <Phone className="w-5 h-5 text-green-600" />
              <span>{phoneNumber}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {authType === "signup" ? "Completing your registration..." : "Logging you in..."}
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 text-center">
                6-Digit Verification Code
              </label>
              
              <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    className={`w-12 h-12 text-center text-xl font-bold border-2 ${
                      errors.otp ? 'border-red-300' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white`}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="text-red-500 text-sm text-center mt-2">{errors.otp}</p>
              )}

              {/* Clear OTP Button */}
              {otp.some(digit => digit !== "") && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={clearOtp}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Clear code
                  </button>
                </div>
              )}
            </div>

            {/* Resend OTP Section */}
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Didn&apos;t receive the code?
              </p>
              
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || isResending}
                className={`inline-flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${
                  countdown > 0 || isResending
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700 hover:scale-105'
                }`}
              >
                {isResending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Resending...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>
                      Resend OTP {countdown > 0 && `(${countdown}s)`}
                    </span>
                  </>
                )}
              </button>

              {errors.resend && (
                <p className="text-red-500 text-sm">{errors.resend}</p>
              )}
            </div>

            {/* Verification Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 transform ${
                isLoading || otp.join("").length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              } text-white flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Verify & Continue</span>
                </>
              )}
            </button>

            {errors.verify && (
              <p className="text-red-500 text-sm text-center">{errors.verify}</p>
            )}
          </form>

          {/* Additional Information */}
          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Having trouble?</span>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Make sure you have good network connection
              </p>
              <Link
                href={authType === "signup" ? "/register" : "/login"}
                className="inline-block text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Use different phone number
              </Link>
            </div>
          </div>

          {/* Security Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center">
              <Shield className="w-3 h-3 text-green-600 mr-1" />
              This code expires in 10 minutes for security reasons
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
        
        /* Hide number input arrows */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

// Main component with Suspense boundary
const VerifyOtp = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Verification</h2>
          <p className="text-gray-600 mb-4">Please wait while we prepare your OTP verification...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
};

export default VerifyOtp;