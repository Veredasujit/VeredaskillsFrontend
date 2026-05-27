'use client';

import { useParams, useRouter } from "next/navigation";
import { useGetLessonByIdQuery } from "../../../../Redux/api/lessonApi";
import {
  BookOpen,
  Loader2,
  ArrowLeft,
  Clock,
  Users,
  BarChart3,
  Star,
  Bookmark,
  Share2,
  FileText,
  PlayCircle,
  CheckCircle,
  Award,
  Zap,
  MessageCircle,
  X,
  Phone,
  Mail,
  Check
} from "lucide-react";

import { useState, useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading, error } = useGetLessonByIdQuery(id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("lessons");
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const lesson = data?.lessons;

  // Mentor data with contact information
  const mentors = [
    {
      id: 1,
      name: "Himanshu Kumar",
      role: "Founder, Vereda Technologies",
      image: "/images/Pictures-2.png",
      rating: 4.9,
      experience: "9+ Years Experience",
      achievements: "15+ Apps Published",
      students: "1000+ Students Trained",
      support: "1:1 Mentorship Available",
      phone: "+91-9958073192",
      email: "himanshu@vereda.co.in"
    },
    {
      id: 2,
      name: "Hemant Kumar",
      role: "Co-Founder, Vereda Technologies",
      image: "/images/Hermant-kumar.webp",
      rating: 4.9,
      experience: "9+ Years Experience",
      achievements: "15+ Projects Delivered",
      students: "1000+ Students Mentored",
      support: "1:1 Tech Support",
      phone: "+91-9801785547",
      email: "hemant@vereda.co.in"
    }
  ];

  // Custom reviews data
  const customReviews = [
    {
      name: "Aditi Sharma",
      role: "Mobile Developer @Google",
      review: "This course took me from beginner to job-ready. The projects are industry-level and Himanshu's teaching style is exceptional! The Matrimonial app project gave me real-world experience in building matrimonial platforms.",
      rating: 5,
      avatar: "AS",
    },
    {
      name: "Rohit Mehta",
      role: "Flutter Team Lead",
      review: "Best Flutter course out there! The  CRM project taught me how to integrate multiple third-party APIs and manage complex state. Built 3 production apps after completing.",
      rating: 5,
      avatar: "RM",
    },
    {
      name: "Priya Nair",
      role: "Freelance Developer",
      review: "The mentorship and community support made all the difference. The Materimonial app project helped me understand real client requirements and delivery timelines.",
      rating: 5,
      avatar: "PN",
    },
    {
      name: "Arjun Patel",
      role: "Full Stack Developer @Microsoft",
      review: "The  approach to third-party integrations was game-changing. Learned how to architect apps that can scale with multiple external services seamlessly.",
      rating: 5,
      avatar: "AP",
    },
    {
      name: "Neha Gupta",
      role: "Startup Founder",
      review: "As a non-tech founder, this course helped me understand app development flows. The US-based CRM project insights helped me communicate better with my development team.",
      rating: 5,
      avatar: "NG",
    },
    {
      name: "Vikram Singh",
      role: "Product Manager @Amazon",
      review: "The project-based learning approach is brilliant. Building actual apps for Matrimonial  and Crm gave me practical skills that I use daily in my job.",
      rating: 5,
      avatar: "VS",
    }
  ];

  // Projects data
  const projects = [
    {
      title: "Matrimonial App",
      description: "A complete matrimonial application with advanced matching algorithms, real-time chat, and secure profile management. Learn to build scalable dating/matrimony platforms.",
      features: [
        "Advanced user matching algorithms",
        "Real-time messaging system",
        "Secure profile verification",
        "Payment gateway integration",
        "Admin dashboard"
      ],
      tech: ["Flutter", "Firebase", "Node.js", "MongoDB"]
    },
    {
      title: "CRM App",
      description: "Enterprise-level CRM solution for US-based clients with third-party integrations, analytics, and automation workflows. Understand how to build B2B SaaS products.",
      features: [
        "Third-party API integrations",
        "Real-time analytics dashboard",
        "Automated workflow system",
        "Multi-tenant architecture",
        "Advanced reporting"
      ],
      tech: ["Flutter", "React", "Python", "PostgreSQL"]
    },
    {
      title: "3rd Party Integration Platform",
      description: "Master the art of integrating multiple third-party services with a unified dashboard. Learn authentication, API management, and data synchronization.",
      features: [
        "Unified third-party service management",
        "OAuth2 authentication flows",
        "Real-time data synchronization",
        "Error handling & retry mechanisms",
        "Performance monitoring"
      ],
      tech: ["Flutter", "Express.js", "Redis", "REST APIs"]
    }
  ];

  // Auto-rotate mentors in carousel
  useEffect(() => {
    if (showMentorModal) {
      const interval = setInterval(() => {
        setCurrentMentorIndex((prev) => (prev + 1) % mentors.length);
      }, 4000); // Change every 4 seconds
      return () => clearInterval(interval);
    }
  }, [showMentorModal, mentors.length]);

  const handleMessageMentor = () => {
    setShowMentorModal(true);
    setCurrentMentorIndex(0);
  };

  const handleNextMentor = () => {
    setCurrentMentorIndex((prev) => (prev + 1) % mentors.length);
  };

  const handleShare = async () => {
    const link = window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handlePrevMentor = () => {
    setCurrentMentorIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const modalVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-gray-600" />
            <div className="absolute inset-0 bg-gray-600/10 rounded-full animate-ping"></div>
          </motion.div>
          <motion.p 
            className="text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Course content...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    let errorMessage = "Failed to load lesson";
    if (error && "data" in (error as FetchBaseQueryError)) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string };
      };
      errorMessage = err.data?.message || errorMessage;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          className="text-center bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Lesson Unavailable
          </h2>
          <p className="text-gray-600 mb-6 text-lg">{errorMessage}</p>
          <motion.button
            onClick={() => router.back()}
            className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 inline-block mr-2" />
            Back to Safety
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          className="text-center bg-white p-10 rounded-3xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Lesson Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            The lesson you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <motion.button
            onClick={() => router.back()}
            className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 inline-block mr-2" />
            Explore Other Lessons
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Snackbar for share confirmation */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div 
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <Check className="w-5 h-5" />
            <span className="font-semibold">Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-3 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </motion.button>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                isBookmarked
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              />
            </motion.button>
            <motion.button
              onClick={handleShare}
              className="p-4 rounded-2xl bg-white text-gray-600 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={copied ? "Link copied!" : "Share this course"}
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </motion.button>
            <motion.button
              onClick={() => router.push("/view-courses")}
              className="px-6 py-3 bg-blue-400 text-white rounded-2xl font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Hero Section */}
        <motion.section 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-blue-400 text-white px-6 py-3 rounded-full font-bold text-sm mb-6 shadow-lg"
            variants={itemVariants}
          >
            <Zap className="w-5 h-5" />
            <span>LIVE COURSE • START ANYTIME</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
            variants={itemVariants}
          >
            App Development with <span className="text-blue-400">A.I Masterclass 2025 </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Build professional cross-platform mobile apps with 
            <span className="font-semibold text-blue-900 mx-1">
              Flutter &amp; Dart
            </span>
            . Master state management, APIs, animations, and publish to App Store &amp; Play Store. 
            We guide you through real-world projects like 
            <span className="font-semibold text-blue-900"> Matrimonial App</span>, 
            <span className="font-semibold text-blue-900"> Enterprises based CRM</span>, 
            and advanced third-party integrations.
          </motion.p>

          <motion.div 
            className="flex justify-center gap-8 flex-wrap text-gray-700 text-base mb-8"
            variants={containerVariants}
          >
            {[
              { icon: Clock, text: "Weekley Based", color: "text-gray-600" },
              { icon: Users, text: "5K+ Students", color: "text-gray-600" },
              { icon: BarChart3, text: "All Levels", color: "text-gray-600" },
              { icon: Star, text: "4.7/5 Rating", color: "text-yellow-500" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-200"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Course Overview Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Navigation Tabs */}
              <motion.div 
                className="flex space-x-1 bg-white rounded-2xl p-2 shadow-lg border border-gray-200 mb-8"
                variants={itemVariants}
              >
                {["overview", "lessons", "projects", "reviews"].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-blue-400 text-white shadow-lg"
                        : "text-gray-600 hover:text-blue-900 hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "lessons" && (
                  <motion.div
                    key="lessons"
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {data?.lessons?.map((lesson, index) => (
                      <motion.div
                        key={lesson.id}
                        className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 border border-gray-200"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover="hover"
                      >
                        <div className="flex items-start gap-6">
                          <motion.div 
                            className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            {index + 1}
                          </motion.div>

                          <div className="flex-grow">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-3">
                                  <BookOpen className="text-gray-600 w-6 h-6" />
                                  <h3 className="text-2xl font-bold text-gray-900">
                                    {lesson.title}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> 45 min
                                  </span>
                                </div>
                              </div>
                              <motion.button 
                                className="flex items-center gap-3 bg-blue-400 text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <PlayCircle className="w-5 h-5" />
                                See Modules
                              </motion.button>
                            </div>

                            <div className="text-gray-700 leading-relaxed text-base">
                              {Array.isArray(lesson.content) ? (
                                <div className="space-y-3">
                                  {lesson.content.map(
                                    (item: string, i: number) => (
                                      <motion.p
                                        key={i}
                                        className="pl-4 border-l-4 border-gray-300 bg-gray-50 py-2 px-4 rounded-r-xl"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                      >
                                        {item}
                                      </motion.p>
                                    )
                                  )}
                                </div>
                              ) : (
                                <p className="bg-gray-50 py-4 px-6 rounded-2xl border border-gray-200">
                                  {lesson.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6">Course Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        "Complete Flutter & Dart setup",
                        "Widgets mastery – Stateless & Stateful",
                        "API integration & HTTP requests",
                        "State management with Provider",
                        "Firebase backend integration",
                        "Animations & custom UI design",
                        "App Store & Play Store deployment",
                        "Real-world projects (Matrimonial App, Crm-App)",
                        "Third-party API integrations",
                        "3rd party architecture planning",
                        "AI-powered features and model integration",
                        "Intelligent recommendation systems",
                        "Building AI chat or claim agents",
                        "AI-powered calling agents with voice APIs",
                        "Generative AI APIs for content creation",
                        "Deploying ML models in apps"
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                          <span className="font-medium text-gray-800">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover="hover"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {project.title}
                          </h3>
                          <div className="flex gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full font-medium"
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          {project.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-800 font-medium">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {customReviews.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover="hover"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white font-bold shadow-md">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-600 text-sm font-medium">
                              {testimonial.role}
                            </p>
                            <div className="flex gap-1 mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 text-yellow-500 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          &quot;{testimonial.review}&quot;
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar - Mentor & Course Info */}
            <div className="space-y-8">
              {/* Mentor Cards */}
              {mentors.map((mentor, index) => (
                <motion.div 
                  key={mentor.id} 
                  className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-center mb-6">
                    <motion.div 
                      className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-gray-600 font-semibold">{mentor.role}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">
                        {mentor.rating} • {mentor.experience}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Award className="w-5 h-5 text-gray-600" />
                      <span>{mentor.achievements}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Users className="w-5 h-5 text-gray-600" />
                      <span>{mentor.students}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <span>{mentor.support}</span>
                    </div>
                  </div>

                  <motion.button 
                    onClick={handleMessageMentor}
                    className="w-full mt-6 bg-blue-400 text-white py-3 rounded-2xl font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Message Mentor
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentor Contact Modal */}
        <AnimatePresence>
          {showMentorModal && (
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Contact Mentor</h3>
                  <motion.button
                    onClick={() => setShowMentorModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </motion.button>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                  <motion.div 
                    className="flex transition-transform duration-500 ease-in-out"
                    animate={{ x: `-${currentMentorIndex * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {mentors.map((mentor) => (
                      <div key={mentor.id} className="w-full flex-shrink-0 p-6">
                        {/* Mentor Info */}
                        <div className="text-center mb-6">
                          <motion.div 
                            className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Image
                              src={mentor.image}
                              alt={mentor.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <h4 className="text-lg font-bold text-gray-900">{mentor.name}</h4>
                          <p className="text-gray-600 text-sm font-medium">{mentor.role}</p>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                            <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-600">Phone Number</p>
                              <p className="font-semibold text-gray-900">{mentor.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                            <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-600">Email Address</p>
                              <p className="font-semibold text-gray-900 break-all">{mentor.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                          <motion.a
                            href={`tel:${mentor.phone}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-2xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Phone className="w-4 h-4" />
                            Call Now
                          </motion.a>
                          <motion.a
                            href={`mailto:${mentor.email}`}
                            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-800 text-gray-800 py-3 rounded-2xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </motion.a>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-2 mb-4">
                    {mentors.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentMentorIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentMentorIndex 
                            ? "bg-gray-800 w-6" 
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={handlePrevMentor}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-700" />
                  </motion.button>
                  <motion.button
                    onClick={handleNextMentor}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-700 rotate-180" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Student Reviews */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-black mb-4 text-gray-900"
              variants={itemVariants}
            >
              Student Success Stories
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Join 2,847+ students who transformed their careers with this course
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customReviews.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200"
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm font-medium">
                      {testimonial.role}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  &quot;{testimonial.review}&quot;
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          className="bg-gray-800 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-4xl font-black mb-4"
              variants={itemVariants}
            >
              Ready to Launch Your App Development Career?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Join thousands of successful students and build professional
              mobile apps that get you hired. Learn from real-world projects and master third-party integrations.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => router.push("/view-courses")}
                className="w-full sm:w-auto bg-white text-gray-800 py-4 px-8 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now & Start Learning
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-8 flex justify-center gap-8 text-gray-300 text-sm"
              variants={itemVariants}
            >
              {[
                { icon: CheckCircle, text: "1:1 Mentorship" },
                { icon: Clock, text: "Lifetime Access" },
                { icon: Users, text: "Community Support" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}