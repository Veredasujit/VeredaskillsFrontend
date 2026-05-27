"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useGetEnrollmentByIdQuery } from "@/Redux/api/enrollmentApi";
import { useGetPaymentsByUserIdQuery } from "@/Redux/api/billingApi";
import DashboardStats from "@/components/dashboard/DashboardStats";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiBookOpen, FiSettings, FiTarget } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const DashboardPage: React.FC = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userData = useSelector((state: RootState) => state.auth.user);
  const userId = userData?.id;

  const { data: enrollmentsData } = useGetEnrollmentByIdQuery(userId);
  const { data: payments } = useGetPaymentsByUserIdQuery(userId);

  const enrollmentCount = enrollmentsData?.enrollments?.length ?? 0;
  const totalPayments = payments?.length || 0;

  const stats = {
    totalCourses: enrollmentCount,
    totalPayments,
  };

   const phoneNumber = "+919570994444"; // WhatsApp number
    const message =
        "Hi! I want to join the Flutter + AI Community and get updates about Live Classes.";
        
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white mt-[80px]">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-3xl p-6"
          >
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 mt-2">
                  Welcome back,&nbsp;
                  <span className="relative font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-lg shadow-sm">
                    {userData?.name || "User"}
                  </span>
                  ! Here’s your learning summary.
                </p>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                  <FiCalendar className="w-4 h-4" />
                  {currentDate}
                </div>
              </div>

              {/* WhatsApp Community Box */}
              <div className="mt-9 bg-green-50 border border-green-200 rounded-2xl p-4 shadow-sm">
                <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                  Join Our WhatsApp Community 🚀
                </h2>

                <p className="text-gray-700 mt-1 text-sm leading-relaxed">
                  Get instant updates for Live Classes, important announcements, and daily
                  Flutter + AI learning resources.
                </p>

                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  <FaWhatsapp size={22} />
                  <span className="font-medium">Join on WhatsApp</span>
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 sm:mt-0 bg-gradient-to-r from-blue-50 to-indigo-100 border border-indigo-100 shadow-sm rounded-2xl px-5 py-3 text-right"
            >
              <p className="text-sm text-gray-500">Member since</p>
              <p className="text-gray-900 font-semibold">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </motion.div>
          </motion.header>


        {/* Stats Section */}
        <DashboardStats stats={stats} />

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl border border-gray-100 shadow-[0_6px_25px_rgba(0,0,0,0.05)] p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Browse Courses */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/view-courses"
                className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 hover:bg-blue-50/60 hover:border-blue-200 p-6 transition-all duration-300 shadow-sm"
              >
                <FiBookOpen className="w-7 h-7 text-gray-700 mb-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm font-medium text-gray-800">
                  Browse Courses
                </span>
              </Link>
            </motion.div>

            {/* Set Goals */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              
              <Link href="/dashboard/usergoal" className="group cursor-pointer flex flex-col cur items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 hover:bg-green-50/60 hover:border-green-200 p-6 transition-all duration-300 shadow-sm w-full">
                <FiTarget className="w-7 h-7 text-gray-700 mb-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm font-medium text-gray-800">
               Set Goals
                </span>
              
             </Link>     
            </motion.div>

            {/* Settings */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/dashboard/settings"
                className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 hover:bg-gray-100/80 hover:border-gray-300 p-6 transition-all duration-300 shadow-sm"
              >
                <FiSettings className="w-7 h-7 text-gray-700 mb-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm font-medium text-gray-800">
                  Settings
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
