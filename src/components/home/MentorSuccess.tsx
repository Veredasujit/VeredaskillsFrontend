"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MentorSuccess() {
  const [isLoading, setIsLoading] = useState(true);

  const stats = [
    { 
      number: "7+", 
      label: "Years of Mobile App Development & Training Program",
      
    },
    { 
      number: "5000+", 
      label: "Learners Enrolled in Flutter Mastery Program",
      
    },
    { 
      number: "2000+", 
      label: "Total Placed",
     
    },
    { 
      number: "50+", 
      label: "Projects Built",
     
    },
  ];

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      aria-labelledby="mentor-success-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mentor Associates Section */}
        <div className="text-center mb-20">
          <div className="mb-4" data-aos="fade-up">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              OUR MENTOR ASSOCIATES
            </span>
            <h2 
              id="mentor-success-heading"
              className="text-3xl md:text-3xl font-bold text-gray-900 mt-4 mb-4 leading-tight"
            >
              Join Our Premier <span className="text-blue-600">Mentor Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from industry experts at leading companies worldwide
            </p>
          </div>

          {/* Mentor Logos Grid */}
          <div 
            className="flex justify-center items-center mt-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-3xl animate-pulse">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src="/images/mentor-community-companies.png"
                alt="Our partner companies including Dainik Bhaskar and other industry leaders"
                width={800}
                height={400}
                className={`relative object-contain transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleImageLoad}
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Section with CTA and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - CTA */}
          <div 
            className="text-center lg:text-left"
            data-aos="fade-right"
          >
            <div className="mb-8">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                START TO SUCCESS
              </span>
              <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Achieve Your <span className="text-gradient bg-gradient-to-r from-blue-400  to-secondary bg-clip-text text-transparent">Career Goals</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
               Achieve Your Career Ambitions
Join our dynamic community of learners and gain one-on-one guidance from top industry professionals worldwide. Take the first step toward shaping your future today.
              </p>
            </div>

            {/* Enhanced CTA Button */}
            <Link href="/contact">
            <button 
              className="group  cursor-pointer relative bg-gradient-to-r from-blue-400 to-secondary text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform focus:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
              aria-label="Request a call back to learn more about our programs"
              >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Request Call Back
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
                  </Link>   

            {/* Trust indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Flexible Scheduling</span>
              </div>
              
            </div>
          </div>

          {/* Right Side - Enhanced Stats */}
          <div 
            className="grid grid-cols-1 gap-6"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:translate-y-[-4px] transform"
                role="article"
                aria-label={`Statistic: ${stat.number} ${stat.label}`}
              >
                <div className="flex items-center gap-6">
                  {/* Enhanced number container */}
                  <div className="relative flex-shrink-0">
                    <div 
                      className="w-24 h-24 bg-gradient-to-br from-blue-300 via-blue-400 to-secondary rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl"
                      style={{
                        background: `linear-gradient(135deg,#1055C9, #6366f1, #108FC9)`
                      }}
                    >
                      <span className="text-2xl font-bold text-white drop-shadow-sm">
                        {stat.number}
                      </span>
                    </div>
                    
                    
                   
                  </div>
                  
                  {/* Enhanced label */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                      {stat.label}
                    </p>
                    <div className="mt-3 w-12 h-1 bg-gradient-to-r from-blue-300 to-secondary rounded-full group-hover:w-16 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}