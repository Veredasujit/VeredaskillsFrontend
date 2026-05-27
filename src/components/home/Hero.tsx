'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.2,
        ease: "easeOut"
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, x: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { duration: 0.9, ease: "easeOut" } 
    },
    animate: {
      y: [0, -15, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "backOut" }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const floatingElementVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundPulseVariants: Variants = {
    animate: {
      opacity: [0.2, 0.3, 0.2],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const gradientRotateVariants: Variants = {
    animate: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const staggerTextVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-100 to-background relative overflow-hidden">
      {/* Background Elements */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          variants={backgroundPulseVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          variants={backgroundPulseVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          variants={backgroundPulseVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
      </motion.div>

      {/* Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <motion.div
        ref={ref}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Left Content */}
        <motion.div 
          className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8 max-w-2xl lg:max-w-none w-full"
          variants={containerVariants}
        >
          {/* Main Heading */}
          <motion.div className="space-y-1" variants={textVariants}>
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900"
              variants={staggerTextVariants}
              custom={0}
            >
              
              Become an Industry Level App Developer with <span className='text-blue-400'>AI Integration</span> in Just 12 Weeks 
              
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.div variants={textVariants}>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl"
              variants={staggerTextVariants}
              custom={3}
            >
              Learn <span className='text-blue-500'>Flutter + Firebase + AI App Development</span> through hands on projects, real mentorship, and instant AI powered feedback.
            </motion.p>

            <motion.p 
              className="text-base sm:text-base font-bold text-gray-800 mt-1"
              variants={staggerTextVariants}
              custom={4}
            >
              Build real apps. Create your portfolio. Start earning through freelancing or a job even if you&apos;re a complete beginner.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start pt-2"
            variants={textVariants}
          >
            <div className='flex justify-center lg:justify-start gap-5'>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.05 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">5K+</div>
                <div className="text-sm sm:text-base text-gray-600 ml-2">Learners</div>
              </motion.div>

              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.08 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">2K+</div>
                <div className="text-sm sm:text-base text-gray-600 ml-2">Placed</div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start items-stretch sm:items-center"
            variants={textVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/view-courses" className="block">
                <motion.button
                  className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold 
                            py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
                            border-2 border-transparent hover:border-blue-300"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3 justify-center text-base sm:text-lg">
                    Enroll Today
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link href="/contact" className="block">
                <motion.button
                  className="group w-full sm:w-auto border-2 border-blue-500 hover:border-blue-500 text-gray-800 hover:text-blue-600 
                            font-semibold py-4 px-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 
                            flex items-center justify-center gap-3 text-base sm:text-lg"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </motion.svg>
                  Request Call Back
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Beginner Friendly Note */}
          <p className=" text-2xl text-center lg:text-left text-gray-600  mt-3 font-medium">
            Beginner-Friendly , No Prior Coding Experience Required
          </p>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-lg xl:max-w-xl"
          variants={imageVariants}
          initial="hidden"
          animate={inView ? ["visible", "animate"] : "hidden"}
        >
          <div className="relative">
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl rotate-12 shadow-lg flex items-center justify-center"
              variants={floatingElementVariants}
              animate="animate"
            >
              <motion.span 
                className="text-white font-bold text-sm"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.span>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center"
              variants={floatingElementVariants}
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              <motion.span 
                className="text-white font-bold text-sm"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⭐
              </motion.span>
            </motion.div>

            {/* Main Image Container */}
            <motion.div
              className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-xl opacity-20"
                variants={gradientRotateVariants}
                animate="animate"
              />
              
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/hero4.jpeg"
                    alt="Online Education Hero Illustration - Learn Tech Skills Online"
                    width={500}
                    height={600}
                    className="w-full h-auto drop-shadow-lg rounded-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Background Decoration */}
            <motion.div
              className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-3xl blur-2xl"
              variants={backgroundPulseVariants}
              animate="animate"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}