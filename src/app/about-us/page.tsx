"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Award, Users2, Sparkle, Stars } from "lucide-react";

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const teamMembers = [
    {
      name: "Himanshu Kumar",
      role: "Founder",
      qualification: "9+ Years Experience",
      image: "/images/Pictures-2.png",
      description:
        "With over 9 years of hands-on experience in product development, training, team leadership, and entrepreneurship, Himanshu leads with a clear vision—making high-quality tech education accessible and outcome-driven. His expertise spans mobile development, UI/UX, system architecture, and guiding students to real career breakthroughs.",
    },
    {
      name: "Hermant Kumar",
      role: "Co-Founder",
      qualification: "9+ Years Experience",
      image: "/images/Hermant-kumar.webp",
      description:
        "Hermant brings 9+ years of professional experience in operations, management, and technology scaling. He specializes in structured learning systems, team mentoring, and shaping the curriculum delivery model. His leadership ensures every learner receives world-class support and real industry readiness.",
    },
  ];

  const values = [
    {
      title: "Quality",
      description:
        "We deliver high quality, industry standard training that reflects real development workflows used in top companies.",
    },
    {
      title: "Accessibility",
      description:
        "We make modern tech education especially Flutter accessible to learners from every background through flexible, affordable programs.",
    },
    {
      title: "Impact",
      description:
        "We focus on real outcomes: building app portfolios, gaining confidence, and unlocking meaningful career opportunities in mobile development.",
    },
    {
      title: "Innovation",
      description:
        "We continuously evolve our curriculum with the latest Flutter tools, frameworks, and industry practices to stay ahead of the market.",
    },
    {
      title: "Student-Centricity",
      description:
        "We put learners first with mentorship, guidance, and support tailored to individual goals and career paths.",
    },
  ];

  // Framer Motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
        </div>

        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200/60 shadow-sm shadow-blue-100/50 mb-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                About Vereda Digital Learning
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <motion.div className="space-y-8" variants={fadeInUp}>
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Build your Career in App Development & AI with 
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x">
                    
                  Vereda 
                  </p>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
                  Vereda Digital Learning is on a mission to transform ambitious learners into confident, career ready mobile app developers. We bridge the gap between learning and real employment by offering hands on training, industry aligned curriculum, practical projects, live mentorship, and dedicated placement support.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div
                  className="flex-1 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/60 px-6 py-5 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                      7+
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">Years Experience</p>
                      <p className="text-sm text-gray-600 mt-1">Training & mentoring</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex-1 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/60 px-6 py-5 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                      5K+
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">Learners Mentored</p>
                      <p className="text-sm text-gray-600 mt-1">Successful Flutter developers</p>
                    </div>
                  </div>
                </motion.div>
              </div>

            </motion.div>

            {/* Right - Visual Content */}
            <motion.div className="relative" variants={fadeInUp} transition={{ delay: 0.1 }}>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-300/20 rounded-3xl blur-xl animate-float" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-300/20 rounded-3xl blur-xl animate-float" style={{ animationDelay: '2s' }} />

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-6 relative">
                {/* Main Image */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white/60 backdrop-blur"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  <Image src="/images/aboutus2.jpeg" alt="Vereda learners in action" width={600} height={600} className="h-80 w-full object-cover" priority />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-white font-semibold text-sm">Hands-on Learning</p>
                  </div>
                </motion.div>

                {/* Secondary Image */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white/60 backdrop-blur mt-12"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  <Image src="/images/aboutus3.jpeg" alt="Vereda learning environment" width={600} height={600} className="h-80 w-full object-cover" priority />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-white font-semibold text-sm">Expert Mentorship</p>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MISSION + VALUES SECTION */}
      <section className="relative px-2 sm:px-2 lg:px-4 py-6 lg:py-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-emerald-50/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div className="text-center mb-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/60 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">Our Foundation</span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Mission Section */}
            <motion.div className="space-y-12" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={containerVariants}>
              {/* Mission Content */}
              <motion.div variants={fadeInUp} className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative space-y-6 p-2">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                      <div className="mt-2 w-16 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed font-medium">
                      To make world class Flutter education accessible, practical, and outcome focused so every learner can move from <strong>interest to employability</strong>, and from <strong>learner to professional developer</strong>.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      We don’t just teach Flutter we prepare you to build real mobile apps from scratch, apply concepts in real world scenarios, work like an industry developer, and crack interviews with confidence.
                    </p>
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                      <p className="text-gray-700 leading-relaxed font-medium">
                        From structured Flutter curricula to live mentoring, app building projects, and interview support, every part of our ecosystem is designed to help you move from <span className="font-bold text-blue-600">&quot;I&apos;m interested&quot;</span> to <span className="font-bold text-blue-600">&quot;I&apos;m industry ready.&quot;</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mission Image */}
              <motion.div className="relative group" variants={fadeInUp} transition={{ delay: 0.2 }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-700" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                  <Image src="/images/aboutus4.jpeg" alt="Team working at Vereda" width={800} height={600} className="w-full h-80 lg:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <motion.p className="text-white font-bold text-xl mb-2" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                      Building future-ready tech talent
                    </motion.p>
                    <motion.div className="flex items-center gap-4" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <p className="text-blue-200 font-medium">Guiding learners since 2018</p>
                      </div>
                      <div className="w-1 h-1 bg-blue-300 rounded-full" />
                      <p className="text-blue-200">5000+ Success Stories</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Values Section */}
            <motion.div className="space-y-12" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={containerVariants}>
              {/* Values Header */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
                    <div className="mt-2 w-16 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  These principles shape how we build our Flutter programs, support learners throughout their journey, and work with partners to create real industry opportunities.
                </p>
              </motion.div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 gap-6">
                {values.map((value, index) => (
                  <motion.div key={value.title} className="group relative" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover="hover" transition={{ delay: index * 0.1 }}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-gray-50 to-white rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-white rounded-2xl border border-gray-200/80 shadow-sm group-hover:shadow-2xl p-2 transition-all duration-500 group-hover:border-transparent">
                      <div className="flex items-start gap-5">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${[
                          "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25",
                          "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/25",
                          "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25",
                          "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/25",
                          "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25",
                          "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25",
                        ][index % 6]}`}>
                          <span className="text-lg font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800">{value.title}</h3>
                            <div className="w-0 group-hover:w-6 h-0.5 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full transition-all duration-500" />
                          </div>
                          <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full transition-all duration-500 delay-100" />
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* MANAGEMENT TEAM */}
      <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-gray-50 overflow-hidden">

        {/* Decorative Shapes */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-200/30 blur-3xl rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">

          {/* ==== SECTION HEADER ==== */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/60 rounded-full shadow-sm backdrop-blur-md">
              <Stars className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 uppercase">Featured</span>
            </span>

            <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mt-6">Our Leadership <span className="text-blue-600">Team</span></h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-3">Experienced. Visionary. Student-Driven.  Meet the people shaping the future of tech learning.</p>
          </div>

          {/* ==== TEAM CARDS ==== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-[0px_20px_50px_rgba(0,110,255,0.20)] hover:border-blue-300 transition-all duration-700 ease-out">
                {/* Background Hover Image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-700">
                  <Image src={member.image} alt={member.name} fill className="object-cover scale-125 group-hover:scale-110 blur-sm transition-all duration-700" />
                </div>

                {/* Blue Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-blue-600/15 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl"></div>

                {/* Profile Image */}
                <div className="flex justify-center mb-8 relative">
                  <div className="relative w-40 h-40 group-hover:scale-110 transition-all duration-700">
                    <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-600">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-125 transition-all duration-700" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-all duration-500 text-center">{member.name}</h4>

                {/* Role */}
                <div className="flex justify-center items-center gap-2 mt-3 text-gray-700 text-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>{member.role}</span>
                  <span className="text-gray-500">• {member.qualification}</span>
                </div>

                {/* Extra Description */}
                <p className="text-gray-600 mt-5 text-center leading-relaxed group-hover:text-gray-800 transition-all duration-700">{member.description}</p>

                {/* Bottom Animated Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            ))}
          </div>

          {/* ==== EXTRA BENEFITS ==== */}
          <div className="mt-24 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
              <Sparkle className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-semibold uppercase">Why Our Leadership Stands Out</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg mt-4">
              <li className="flex items-center gap-3"><Users2 className="w-6 h-6 text-blue-600" />Over a decade of strong industry presence</li>
              <li className="flex items-center gap-3"><Stars className="w-6 h-6 text-blue-600" />Innovation-driven learning methodology</li>
              <li className="flex items-center gap-3"><Award className="w-6 h-6 text-blue-600" />Recognized by major media outlets</li>
              <li className="flex items-center gap-3"><Sparkle className="w-6 h-6 text-blue-600" />Student-first, outcome-focused approach</li>
            </ul>
          </div>

        </div>
      </section>

      {/* MENTOR / PARTNER COMPANIES */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 tracking-[0.18em] uppercase">Our Mentor Associates</span>
          <h2 className="mt-4 text-3xl md:text-3xl font-bold text-gray-900">Learn from mentors at <span className="text-blue-600">leading companies</span></h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Our mentor network includes professionals from top organizations, bringing real-world experience directly into our classrooms and live sessions.</p>
        </div>

        <div className="flex justify-center">
          <motion.div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 max-w-4xl w-full" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-3xl">
                <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <Image src="/images/mentor-community-companies.png" alt="Our mentor and partner companies" width={900} height={450} className={`mx-auto object-contain transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`} onLoad={handleImageLoad} priority />

            <p className="mt-4 text-xs text-gray-500 text-center">Logos are for representation only — mentors come from diverse product and service companies.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
