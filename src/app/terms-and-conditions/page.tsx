"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function TermsOfUsePage(){
  const [accepted, setAccepted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  // Handle scroll for sticky header and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Sticky Mobile Header */}
      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
        scrolled ? "py-3 shadow-sm" : "py-4"
      } lg:hidden`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Terms of Use</h1>
              <p className="text-xs text-gray-500 mt-0.5">Effective Nov 11, 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Print terms"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Desktop Header */}
          <header className="hidden lg:block px-8 py-10 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Terms of Use
                </h1>
                <p className="mt-2 text-gray-600">Effective date: <span className="font-semibold">November 11, 2025</span></p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                  aria-label="Print terms"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Terms
                </button>

                <Link href="/contact" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </header>

          <div className="lg:flex">
            {/* Sticky Sidebar / TOC */}
            <aside className="lg:w-80 xl:w-96 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50">
              <nav className="sticky top-24">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Contents</h3>
                  <div className="mt-2 w-12 h-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full"></div>
                </div>
                
                <ul className="space-y-3">
                  {[
                    { id: "use-of-site", label: "Use of Site" },
                    { id: "geographic-location", label: "Geographic location" },
                    { id: "user-warranty", label: "User Warranty" },
                    { id: "trademark", label: "Trademark & Copyright" },
                    { id: "hyperlinks", label: "Hyperlinks" },
                    { id: "no-warranty", label: "No Warranty" },
                    { id: "liability", label: "Limitation of Liability" },
                    { id: "termination", label: "Account Termination" },
                    { id: "law", label: "Applicable Law" },
                    { id: "updates", label: "Updates" }
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                          activeSection === item.id
                            ? "bg-white text-gray-900 shadow-md border border-gray-200 font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Progress indicator */}
                <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Reading progress</span>
                    <span className="font-medium text-gray-900">{accepted ? "Completed" : "In progress"}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-gray-700 to-gray-900 h-2 rounded-full transition-all duration-500"
                      style={{ width: accepted ? "100%" : "60%" }}
                    ></div>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0">
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Introduction */}
                <section id="intro" className="mb-12">
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 mb-6">
                      <p className="text-blue-800 font-medium">Usage of this site is bounded by these Terms.</p>
                    </div>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      Vereda.co.in maintains this website, any courses and other linked and related sites (the &quot;Site&quot;) for the use of its customers, vendors, students, and other site users (&quot;Users&quot;) upon agreement to the following terms. Please read the terms carefully before using the Site.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-red-800 text-sm font-medium">
                          Minors or people below 14 years old are not allowed to use this website.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600">
                        In addition to these terms, all purchases made on this site are governed by our refund policy and all activity is governed by our privacy policy.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Terms Sections */}
                <div className="space-y-12">
                  {[
                    {
                      id: "use-of-site",
                      title: "1. Use of Site",
                      content: "Vereda.co.in provides various materials, information, quizzes, tests, questions, articles, news and other information on this and related sites and in courses offered through this site (the 'Materials'). Vereda.co.in authorizes each User to view and download one copy of the Materials. Materials may be downloaded and a maximum of one copy of the Materials may be printed provided that Users make no modifications to the Materials and you retain all copyright and other proprietary notices contained in the original Materials on any copies of the Materials. Users may not modify the Materials at this Site in any way or reproduce, share or distribute them. Users will keep all Materials confidential, and will not sell, auction, loan, rent, give away, describe, summarize, or otherwise reveal the Materials or their contents, to any other person or entity. Any breach of these Terms of Use automatically terminates your authorized use of the Site."
                    },
                    {
                      id: "geographic-location",
                      title: "2. Geographic location",
                      content: "If you, as a User, purchase Materials from this Site or Vereda.co.in while outside of India, you may not use or access the materials while inside India."
                    },
                    {
                      id: "user-warranty",
                      title: "3. User Warranty",
                      content: "As a User, you warrant that you are not an agent or employee of any other test preparation company and the Site and Materials solely for your own personal career advancement or personal use."
                    },
                    {
                      id: "trademark",
                      title: "4. Trademark and Copyright",
                      content: "Vereda.co.in, and certain other brands, trademarks, and service marks are marks of Vereda.co.in and its affiliates. The Materials on this Site are copyrighted, and any unauthorized use of any Materials on this Site may violate copyright, trademark, and other laws."
                    },
                    {
                      id: "hyperlinks",
                      title: "5. Hyperlinks",
                      content: "Links to external websites are provided solely as a convenience to you. Vereda.co.in has not reviewed all of these external websites, does not control and is not responsible for any of these sites or their content. If you decide to access any of the external websites linked to this Site, you do so entirely at your own risk."
                    },
                    {
                      id: "no-warranty",
                      title: "6. No Warranty",
                      content: "The Materials provided at this site are provided 'as is' without any warranties of any kind including warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. Vereda.co.in further does not warrant the accuracy and completeness of the Materials at this Site. Vereda.co.in may make changes to the Materials at this Site, or to the services and prices described in them, at any time without notice. The Materials at this Site may be out of date and Vereda.co.in makes no commitment to update the Materials at this Site."
                    },
                    {
                      id: "liability",
                      title: "7. Limitation of Liability",
                      content: "In no event will Vereda.co.in, its suppliers or other third parties mentioned at this Site be liable for any damages whatsoever (including, without limitation, those resulting from lower test scores, interruption of services or inaccurate information) arising out of the use, inability to use, or the results of the use of this Site, any websites linked to this Site, or the Materials or information contained at any or all such sites, whether based on warranty, contract, tort or any other legal theory and whether or not advised of the possibility of such damages. If your use of the Materials or information from this Site results in the need for servicing, repair or correction of equipment or data, you assume all costs thereof."
                    },
                    {
                      id: "termination",
                      title: "8. Account Termination",
                      content: "Any and all accounts may be terminated for any reason(s), at any time, at the sole discretion of the administrators of this website."
                    },
                    {
                      id: "law",
                      title: "9. Applicable Law",
                      content: "The Terms of Use are governed by the laws of India. Failure to enforce strict performance of the Terms of Use shall not be construed as a waiver of any provision or right. Vereda.co.in may assign its rights and duties under the Terms of Use without notice to any party at any time."
                    },
                    {
                      id: "updates",
                      title: "10. Effective Date and Updates",
                      content: "The Terms are effective as of November 11th, 2022 and are subject to change without notice by Vereda.co.in at any time. Please check for changes regularly. Your use of this Site after such changes constitutes your agreement to such changes."
                    }
                  ].map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24"
                    >
                      <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                          {section.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </section>
                  ))}
                </div>

                {/* Acceptance Section */}
                <section className="mt-16 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          accepted 
                            ? "bg-gradient-to-r from-gray-900 to-gray-700 border-transparent" 
                            : "border-gray-300 bg-white group-hover:border-gray-400"
                        }`}>
                          {accepted && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-lg font-semibold text-gray-900">
                          I have read and agree to the Terms of Use for Vereda.co.in
                        </span>
                        <p className="mt-2 text-sm text-gray-600">
                          By accepting, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions outlined above.
                        </p>
                      </div>
                    </label>
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="sr-only"
                    />

                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        disabled={!accepted}
                        onClick={() => {
                          if (accepted) window.location.href = "/";
                        }}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${
                          accepted 
                            ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:shadow-xl hover:scale-105 focus:ring-gray-500" 
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Continue to Site
                      </button>

                      <Link href="/contact" target="_blank" rel="noopener noreferrer">
                        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Contact Support
                        </button>
                      </Link>
                    </div>

                    <p className="mt-6 text-xs text-gray-500 text-center">
                      By clicking &quot;Continue to Site&quot; you agree to the Terms above. You can print or save these terms for your records.
                    </p>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}