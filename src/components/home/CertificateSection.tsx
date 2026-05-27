"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Award,
  ShieldCheck,
  Briefcase,
  Globe2,
  Star,
  Target,
  BookOpen,
  FileText,
  Printer,
  QrCode,
  GraduationCap,
} from "lucide-react";

export default function CertificateSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
      {/* Soft background orbs */}
      <div className="pointer-events-none absolute top-16 left-20 h-32 w-32 animate-pulse rounded-full bg-blue-200/20 blur-2xl" />
      <div className="pointer-events-none absolute bottom-20 right-24 h-40 w-40 animate-pulse rounded-full bg-purple-200/20 blur-2xl delay-700" />
      <div className="pointer-events-none absolute top-1/2 right-1/3 h-24 w-24 animate-pulse rounded-full bg-indigo-200/20 blur-xl delay-500" />

      {/* Floating micro particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-32 h-1 w-1 animate-float rounded-full bg-blue-400/60" />
        <div className="absolute right-16 top-24 h-1.5 w-1.5 animate-float-slow rounded-full bg-purple-400/60" />
        <div className="absolute left-1/3 bottom-10 h-1 w-1 animate-float rounded-full bg-indigo-400/60" />
        <div className="absolute right-1/4 bottom-32 h-1.5 w-1.5 animate-float-slow rounded-full bg-emerald-400/60" />
      </div>

     
     
      

      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Heading */}
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent drop-shadow-sm md:text-4xl">
          <span className="text-gray-700">Earn Your</span>   Certificate
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>

        {/* Description */}
        <div
          className={`mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-gray-700 transition-all duration-700 delay-200 md:text-xl ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          Complete the course, finish assessments, and unlock a{" "}
          <span className="font-semibold text-blue-600">
            professionally designed certificate
          </span>{" "}
          showcasing your mastery in mobile app development, projects, and
          real-world case studies.
        </div>

        {/* Stats / social proof strip */}
        <div
          className={`mx-auto mt-10 max-w-4xl rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-blue-100/60 backdrop-blur-sm transition-all duration-700 delay-300 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-3">
            <div className="flex items-center justify-center gap-3 border-b border-blue-50 pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <div className="text-left">
                <div className="text-base font-semibold">
                  4.9/5 Average Rating
                </div>
                <p className="text-xs text-gray-500">
                  Based on learner feedback
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 border-b border-blue-50 py-3 md:border-b-0 md:border-r md:py-0 md:px-4">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="text-base font-semibold">5,000+ Certified</div>
                <p className="text-xs text-gray-500">
                  Learners trained across batches
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-3 md:pt-0 md:pl-4">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="text-base font-semibold">
                  2,105+ Got Opportunities
                </div>
                <p className="text-xs text-gray-500">
                  Using their course certificate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main certificate + right info */}
        <div
          className={`mx-auto mt-14 max-w-6xl transition-all duration-700 delay-400 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            {/* Certificate Card with spotlight & tilt */}
            <div className="relative mt-6">
              {/* Spotlight behind card */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/25 blur-3xl" />
                <div className="absolute left-1/3 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/25 blur-3xl" />
              </div>

              <div className="group relative mx-auto max-w-3xl transform-gpu transition-transform duration-500 hover:-translate-y-3 hover:scale-[1.01] hover:-rotate-0.5">
                {/* Animated gradient border */}
                <div className="absolute -inset-[2px] rounded-[28px] bg-[length:200%_200%] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-60 blur-[2px] animate-border-glow" />

                <div className="relative rounded-[24px] bg-white/70 p-4 shadow-xl ring-1 ring-blue-100/70 backdrop-blur-md">
                  {/* Ribbons & badges */}
                 
                  <div className="pointer-events-none absolute -top-4 right-4 rotate-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  </div>

                  

                  {/* Certificate Image */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-2xl">
                    <Image
                      src="/images/certificate002.png"
                      alt="Course Certificate"
                      width={1400}
                      height={1000}
                      className="h-auto w-full transform object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      priority
                    />

                    {/* On-hover tint */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* QR code mockup */}
                    <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-[11px] font-medium text-gray-700 shadow-md ring-1 ring-gray-200/70">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <QrCode className="h-6 w-6 text-gray-800" />
                      </div>
                      <div className="text-left">
                        <div>Scan to Verify</div>
                        <p className="text-[10px] text-gray-500">
                          Unique Certificate ID
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Validation info */}
                  <div className="mt-6 flex flex-col gap-3 text-left text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
                   
                    <div className="flex items-center gap-2">
                      <Printer className="h-4 w-4 text-blue-600" />
                      <p>High-resolution A4 PDF for digital &amp; print use.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side info: highlights, benefits, instructor */}
            <div className="text-left">
              {/* Certificate highlights */}
              <h3 className="flex items-center gap-2 text-2xl font-semibold uppercase tracking-wide text-blue-600">
                <Award className="h-4 w-4" />
                Certificate Highlights
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Your certificate is crafted to look professional when shared
                with hiring managers, clients, and on your public profiles.
              </p>

              <div className="mt-4 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Industry-relevant</p>
                    <p className="text-xs text-gray-500">
                      Covers in-demand Flutter &amp; mobile app skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Verified completion</p>
                    <p className="text-xs text-gray-500">
                      Issued only after assessments &amp; projects.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Shareable anywhere</p>
                    <p className="text-xs text-gray-500">
                      Add to LinkedIn, resumes, portfolios &amp; freelancing
                      profiles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Global format</p>
                    <p className="text-xs text-gray-500">
                      Clean, minimal design accepted across industries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <h4 className="mt-6 flex items-center gap-2 text-xl font-semibold uppercase tracking-wide text-purple-600">
                <FileText className="h-4 w-4" />
                Benefits of this Certificate
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                <li>• Strengthens your resume for tech &amp; product roles.</li>
                <li>
                  • Acts as proof of practical experience with real projects.
                </li>
                <li>
                  • Helps you stand out in shortlisting &amp; screening stages.
                </li>
                <li>
                  • Builds credibility when pitching to clients or startups.
                </li>
              </ul>

              {/* Instructor & credibility */}
              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white/60 p-4 text-sm shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Digitally signed by
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      Himanshu Kumar– CEO and Founder.
                    </p>
                    <p className="text-xs text-gray-500">
                      9+ years experience | Built multiple production apps
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                    {/* <LinkedinIcon className="h-3.5 w-3.5" /> */}
                    Add directly to LinkedIn
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                    <Briefcase className="h-3.5 w-3.5" />
                    Great for interview portfolios
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-700">
                    <Globe2 className="h-3.5 w-3.5" />
                    Globally recognized format
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Where you can use it */}
        <div className="mx-auto mt-10 max-w-5xl">
          <h3 className="flex items-center justify-center gap-2 text-2xl font-semibold uppercase tracking-wide text-gray-700">
            <Target className="h-4 w-4 text-blue-600" />
            Where this certificate makes an impact
          </h3>
          <div className="mt-6 grid gap-6 text-left md:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-blue-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="mt-3 text-lg font-semibold text-gray-900">
                Job Applications
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Attach your certificate with your resume &amp; portfolio during
                hiring processes to prove skills instantly.
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-purple-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                {/* <LinkedinIcon className="h-5 w-5 text-purple-600" /> */}
              </div>
              <h4 className="mt-3 text-lg font-semibold text-gray-900">
                LinkedIn &amp; Social Profiles
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Add as a certification, feature it in your About section and
                posts to attract recruiters &amp; clients.
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-emerald-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Globe2 className="h-5 w-5 text-emerald-600" />
              </div>
              <h4 className="mt-3 text-lg font-semibold text-gray-900">
                Freelancing &amp; Client Pitching
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Showcase your certificate as credibility proof when pitching app
                development work to clients worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Learning path / how to earn */}
        <div className="mx-auto mt-12 max-w-5xl text-left">
          <h3 className="flex items-center gap-2 text-xl font-semibold uppercase tracking-wide text-gray-700">
            <BookOpen className="h-4 w-4 text-blue-600" />
            How you earn this certificate
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {[
              {
                step: "01",
                title: "Complete modules",
                desc: "Learn Flutter, Dart, UI/UX, API integration & more.",
              },
              {
                step: "02",
                title: "Pass assessments",
                desc: "MCQs, coding challenges & concept checks.",
              },
              {
                step: "03",
                title: "Build projects",
                desc: "Hands-on mobile apps & real-world case studies.",
              },
              {
                step: "04",
                title: "Final evaluation",
                desc: "Instructor or automated review of your work.",
              },
              {
                step: "05",
                title: "Unlock certificate",
                desc: "Get your verified, shareable certificate.",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative flex flex-col rounded-2xl bg-white/80 p-4 text-xs shadow-sm ring-1 ring-gray-100"
              >
                {idx < 4 && (
                  <div className="pointer-events-none absolute right-[-10px] top-1/2 hidden h-[2px] w-6 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-purple-400 md:block" />
                )}
                <div className="mb-2 inline-flex w-9 items-center justify-center rounded-full bg-blue-50 text-[25px] font-semibold text-blue-700">
                  {item.step}
                </div>
                <p className="text-[19px] font-semibold text-gray-900">
                  {item.title}
                </p>
                <p className="mt-1 text-[15px] text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      

       

        {/* Credibility logos */}
        <div className="mx-auto mt-5 max-w-4xl text-xs text-gray-500">
          <p className="text-center text-lg">Trusted by learners from</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-6 opacity-80">
            <div className="rounded-lg bg-white/70 px-3 py-1 shadow-sm">
              <span className="text-[15px] font-semibold tracking-wide text-gray-700">
                Tech Startups
              </span>
            </div>
            <div className="rounded-lg bg-white/70 px-3 py-1 shadow-sm">
              <span className="text-[15px] font-semibold tracking-wide text-gray-700">
                SaaS Companies
              </span>
            </div>
            <div className="rounded-lg bg-white/70 px-3 py-1 shadow-sm">
              <span className="text-[15px] font-semibold tracking-wide text-gray-700">
                FinTech &amp; Product Teams
              </span>
            </div>
            <div className="rounded-lg bg-white/70 px-3 py-1 shadow-sm">
              <span className="text-[15px] font-semibold tracking-wide text-gray-700">
                Freelance Clients
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes sweep {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes border-glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-sweep {
          animation: sweep 3.5s infinite;
        }

        .animate-border-glow {
          animation: border-glow 7s ease infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
