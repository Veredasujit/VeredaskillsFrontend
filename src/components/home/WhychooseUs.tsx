"use client";
import React from "react";
import { motion, Variants } from "framer-motion";


// Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function WhychooseUs() {
  // Features
const items = [
  "Live Interactive Flutter Classes",
  "AI Powered Learning & Hands On Practice",
  "1-on-1 Personalized Mentorship",
  "Industry Level Flutter + AI Projects",
  "Placement Focused Training & Support",
  "Weekly Tests, Quizzes & Skill Assessments",
];
 
  // Video
  // const videoURL = "https://www.w3schools.com/html/mov_bbb.mp4";

  // const students = [
  //   { name: "Salman", role: "Student" },
  //   { name: "Apeksha", role: "Student" },
  //   { name: "Naveen", role: "Student" },
  //   { name: "Shadab Ahmed", role: "Student" },
  //   { name: "Rohit", role: "Student" },
  //   { name: "Kavya", role: "Student" },
  // ];

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rounded-full blur-sm"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-400/20 rounded-full blur-sm"></div>

        {/* ================= WHY CHOOSE US ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="relative"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-3"
          >
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              Why We&apos;re Different
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Why Choose <span className=" bg-clip-text text-blue-600">Vereda?</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Get instant mentorship, Placement opportunities and  
            a supportive learning community that cares about your success.
          </motion.p>
        </motion.div>

        {/* ================= FEATURES LIST ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="border border-gray-200 rounded-3xl shadow-lg p-8 md:p-12 w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 relative z-10">
              {items.map((text, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ 
                    x: 8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <motion.span 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:shadow-xl"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.span>
                  <p className="text-gray-800 text-lg md:text-xl font-medium group-hover:text-gray-900 transition-colors">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        

        {/* ================= VIDEO REVIEWS SECTION ================= */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mt-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-3"
          >
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
              Student Stories
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Hear From <span className="text-blue-600 bg-clip-text ">Our Students</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
          >
            Real experiences from students who transformed their careers with Vereda
          </motion.p>
        </motion.div> */}

        {/* ================= SWIPER SLIDER ================= */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="px-4"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-300 !opacity-50',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-gradient-to-r !from-blue-500 !to-purple-500 !opacity-100',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-16 !overflow-visible"
          >
            {students.map((student, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full max-w-sm mx-auto group cursor-pointer"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                  
                    <div className="relative aspect-video overflow-hidden">
                      <video
                        src={videoURL}
                        controls
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                   
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-gray-600 font-medium">{student.role}</p>
                      
                      
                      <div className="flex justify-center mt-3 space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.svg
                            key={star}
                            whileHover={{ scale: 1.2 }}
                            className="w-5 h-5 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div> */}
      </div>
    </section>
  );
}