"use client";
import React from "react";
import Image from "next/image";
import {
  BadgeCheck,
  LibraryBig,
  Users,
  FileCheck2,
  BriefcaseBusiness,
  Infinity,
} from "lucide-react";

export default function InstantDoubtSolve() {
  return (
    <section className="py-24 px-4 md:px-10 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h2 className="text-center text-4xl md:text-4xl lg:text-4xl font-extrabold mb-16 leading-tight">
          Quick <span className="text-blue-600">Mentor Support</span> Whenever You Need It
        </h2>

        {/* IMAGES WRAPPER */}
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-0 mb-4">

        {/* LEFT CONTENT */}
        <div className="space-y-10">

          {/* Block 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ?
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-2xl font-bold leading-snug">
               Get Instant Doubt Support in Just 5–10 Minutes
              </h2>
              <p className="mt-2 text-gray-600 max-w-md">
                Our mentors are always available get clear answers within 5–10 minutes whenever you need help.
              </p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                👤
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-2xl font-bold leading-snug">
                1-on-1 Personalized Mentorship
              </h2>
              <p className="mt-2 text-gray-600 max-w-md">
                Stay focused and grow faster with mentors who guide you, give feedback, and back you at every step.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/imgsvg.webp" 
            alt="Mentor Assistance"
            width={450}
            height={450}
            className="w-[90%] md:w-[420px] object-contain"
          />
        </div>

      </div>

        {/* ================== FEATURES SECTION ================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-9">

          {/* 1 — FREE Learning */}
          <div className="flex gap-5">
            <BadgeCheck className="w-14 h-14 text-blue-600" strokeWidth={1.7} />
            <div>
            <h3 className="text-2xl font-bold">1. Weekly Assessments & Practice Tests</h3>
<p className="text-gray-600 mt-2">
  Stay on track with regular weekly tests designed to strengthen your concepts,
  measure your progress, and help you revise effectively.
</p>

            </div>
          </div>

          {/* 2 — Structured Course */}
          <div className="flex gap-5">
            <LibraryBig className="w-14 h-14 text-blue-600" strokeWidth={1.7} />
            <div>
              <h3 className="text-2xl font-bold">2. Organized Learning Curriculum</h3>
              <p className="text-gray-600 mt-2">
                Learn through a step-by-step curriculum designed by industry
                professionals to match current market needs.
              </p>
            </div>
          </div>

          {/* 3 — Instant Mentor Support */}
          <div className="flex gap-5">
            <Users className="w-14 h-14 text-blue-600" strokeWidth={1.7} />
            <div>
              <h3 className="text-2xl font-bold">3. Real-Time Mentor Support</h3>
              <p className="text-gray-600 mt-2">
                Get immediate guidance from expert mentors via chat, calls, and
                screen-sharing sessions throughout your learning journey.
              </p>
            </div>
          </div>

          {/* 4 — Projects & Certifications */}
          <div className="flex gap-5">
            <FileCheck2 className="w-14 h-14 text-blue-600" strokeWidth={1.7} />
            <div>
              <h3 className="text-2xl font-bold">4. Hands-On Projects & Certificates</h3>
              <p className="text-gray-600 mt-2">
                Build industry-relevant projects and earn credible certificates that
                strengthen your portfolio and resume.
              </p>
            </div>
          </div>

          {/* 5 — Internship Opportunity */}
          <div className="flex gap-5">
            <BriefcaseBusiness
              className="w-14 h-14 text-blue-600"
              strokeWidth={1.7}
            />
            <div>
            <h3 className="text-2xl font-bold">5. Placement Preparation & Industry Training</h3>
<p className="text-gray-600 mt-2">
  Get fully prepared for real-world interviews with resume support,
  mock interviews, industry-level assignments, and expert-driven guidance.
</p>

            </div>
          </div>

          {/* 6 — Lifetime Access */}
          <div className="flex gap-5">
            <Infinity className="w-14 h-14 text-blue-600" strokeWidth={1.7} />
            <div>
            <h3 className="text-2xl font-bold">6. Lifetime Access to All Live Class Recordings</h3>
<p className="text-gray-600 mt-2">
  Access every live session recording for life, allowing you to revisit lessons
  anytime and learn at your own pace without missing anything.
</p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
