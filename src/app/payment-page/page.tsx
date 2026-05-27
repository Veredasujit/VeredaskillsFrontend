// pages/payment.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "@/Redux/api/paymentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Image from "next/image";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CourseData {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  instructor: string;
  duration: string;
  image: string;
  category: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface EnrollmentData {
  course: CourseData;
  user: UserData;
}

// Create a separate component that uses useSearchParams
const PaymentContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(null);
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setEnrollmentData(decodedData);
      } catch (error) {
        setMessage("Invalid course data");
        setMessageType("error");
        console.error("Error parsing enrollment data:", error);
      }
    } else {
      setMessage("No course selected");
      setMessageType("error");
    }

    if (!user) {
      router.push('/login?redirect=/payment');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams, user, router]);

  const showMessage = (msg: string, type: "success" | "error" | "info" = "info") => {
    setMessage(msg);
    setMessageType(type);
  };

  const handlePayment = async () => {
    if (!enrollmentData) {
      showMessage("No course selected", "error");
      return;
    }

    setLoading(true);
    showMessage("");

    try {
      const orderResponse = await createOrder({ 
        amount: enrollmentData.course.price,
        enrollmentId: enrollmentData.course.id,
        userId: enrollmentData.user.id
      }).unwrap();
      
      const { order, payment } = orderResponse;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Vereda Education",
        description: `Enrollment for ${enrollmentData.course.title}`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              enrollmentId: payment.enrollmentId,
              userId: enrollmentData.user.id,
              amount: enrollmentData.course.price
            }).unwrap();
              
            if (verifyResponse.success) {
              showMessage("Payment successful! Redirecting to course...", "success");
              setTimeout(() => {
                router.push(`/dashboard`);
              }, 2000);
            } else {
              showMessage("Payment verification failed.", "error");
            }
          } catch (err) {
            showMessage("Error verifying payment.", "error");
            console.error("Payment verification error:", err);
          }
        },
        prefill: {
          name: enrollmentData.user.name,
          email: enrollmentData.user.email,
          contact: user?.phone || ""
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: function() {
            showMessage("Payment cancelled", "info");
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      let message = "Error creating order.";

      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string } };
        if (e.data?.message) message = e.data.message;
      }

      showMessage(message, "error");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (!enrollmentData && !message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Course Details</h1>
          <p className="text-gray-600">Please wait while we prepare your enrollment...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (message && !enrollmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={() => router.push('/courses')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  if (!enrollmentData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Complete Your <span className="text-blue-700">Enrollment</span></h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You&apos;re one step away from starting your learning journey with{" "}
              <span className="font-semibold text-blue-600">{enrollmentData.course.title}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Course Summary */}
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Course Summary</h2>
                </div>
                
                <div className="flex gap-6">
                  <Image
                    src={enrollmentData.course.image} 
                    alt={enrollmentData.course.title}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-xl shadow-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{enrollmentData.course.title}</h3>
                    <p className="text-gray-600 mb-3">by {enrollmentData.course.instructor}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <span>📚</span> {enrollmentData.course.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⏱️</span> {enrollmentData.course.duration}
                      </span>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Original Price:</span>
                          <span className="line-through text-gray-500 text-lg">
                            ₹{enrollmentData.course.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Discount:</span>
                          <span className="text-green-600 font-semibold text-lg">
                            -{enrollmentData.course.discountPercentage}%
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-800 font-semibold text-lg">You Pay:</span>
                            <span className="text-blue-600 font-bold text-2xl">
                              ₹{enrollmentData.course.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-green-600 text-sm mt-1">
                            You save ₹{(enrollmentData.course.originalPrice - enrollmentData.course.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-semibold text-lg">{enrollmentData.user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-gray-900 font-semibold text-lg">{enrollmentData.user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                </div>

                {/* Security Badge */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">🔒</span>
                    </div>
                    <span className="font-semibold text-green-800">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your payment information is encrypted and secure. We use Razorpay for safe transactions.
                  </p>
                </div>

                {/* Total Amount */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-blue-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-blue-700">
                      ₹{enrollmentData.course.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 ${
                    loading 
                      ? "bg-gray-400 cursor-not-allowed transform scale-95" 
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${enrollmentData.course.price.toLocaleString()}`
                  )}
                </button>

                {/* Message Display */}
                {message && (
                  <div className={`mt-4 p-4 rounded-xl border ${
                    messageType === "success" 
                      ? "bg-green-50 border-green-200 text-green-700" 
                      : messageType === "error"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {messageType === "success" ? "✅" : messageType === "error" ? "❌" : "ℹ️"}
                      </span>
                      <span className="font-medium">{message}</span>
                    </div>
                  </div>
                )}

                {/* Trust Indicators */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <span>🔒</span> SSL Secure
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💳</span> Safe Payment
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By completing your purchase, you agree to our{" "}
                    <a href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms of Service</a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>

                {/* Support Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Need help with your payment?</p>
                    <a href="mailto:support@vereda.co.in" className="text-blue-600 font-medium hover:underline">
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const PaymentPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Payment Page</h1>
          <p className="text-gray-600">Please wait while we prepare your payment...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
};

export default PaymentPage;