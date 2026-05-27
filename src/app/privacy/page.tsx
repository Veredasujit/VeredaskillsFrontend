"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("collect");

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Sticky Mobile Header */}
      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
        scrolled ? "py-3 shadow-sm" : "py-4"
      } lg:hidden`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Privacy Policy</h1>
              <p className="text-xs text-gray-500 mt-0.5">Your data protection rights</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Print privacy policy"
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
                <h1 className="text-3xl font-bold  bg-secondary bg-clip-text text-transparent">
                  Privacy Policy
                </h1>
                <p className="mt-2 text-gray-600">
                  Here is everything you need to know about how we use your personal data.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                  aria-label="Print privacy policy"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Policy
                </button>

                <Link href="/contact" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Privacy Officer
                  </button>
                </Link>
              </div>
            </div>
          </header>

          <div className="lg:flex">
            {/* Sticky Sidebar / TOC */}
            <aside className="lg:w-80 xl:w-96 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-blue-50">
              <nav className="sticky top-24">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase text-blue-600 tracking-wider">Contents</h3>
                  <div className="mt-2 w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </div>
                
                <ul className="space-y-3">
                  {[
                    { id: "collect", label: "What we collect" },
                    { id: "consent", label: "Consent" },
                    { id: "disclosure", label: "Disclosure" },
                    { id: "payment", label: "Payment" },
                    { id: "thirdparty", label: "Third-Party Services" },
                    { id: "security", label: "Security & Cookies" },
                    { id: "age", label: "Age of Consent" },
                    { id: "changes", label: "Changes" },
                    { id: "contact", label: "Questions" }
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                          activeSection === item.id
                            ? "bg-white text-blue-900 shadow-md border border-blue-200 font-medium"
                            : "text-blue-700 hover:text-blue-900 hover:bg-white/50"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Quick Stats */}
                <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <h4 className="text-sm font-semibold text-blue-900 mb-3">Your Privacy Rights</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Right to Access</span>
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Right to Delete</span>
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Data Portability</span>
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0">
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Introduction */}
                <section className="mb-12">
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 mb-6 rounded-r-lg">
                      <p className="text-blue-800 font-medium">
                        We are committed to protecting your privacy and being transparent about how we handle your personal data.
                      </p>
                    </div>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      This Privacy Policy explains how Vereda.co.in collects, uses, and protects your personal information when you use our services.
                    </p>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-indigo-800 text-sm font-medium">
                            Last updated: November 11, 2025
                          </p>
                          <p className="text-indigo-700 text-sm mt-1">
                            We regularly review and update our privacy practices to ensure compliance with applicable laws.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Policy Sections */}
                <div className="space-y-12">
                  <section id="collect" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        1. What information do we collect and what do we do with it?
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        When you enroll as a student or subscriber (a &quot;learner&quot;) on our site or related courses, we collect the personal information you provide such as your name, email address and payment details.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        We use that information to register you for courses, deliver course content, process payments, send course updates, and improve our services. Marketing emails are only sent if you opt in.
                      </p>
                    </div>
                  </section>

                  <section id="consent" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        2. How do you get my consent?
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        By providing personal information when enrolling, purchasing, or contacting us, you consent to collection and use for those purposes. For secondary uses (like marketing) we ask for express consent and always provide a way to opt out.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                        <p className="text-yellow-800 text-sm">
                          <strong>Withdraw consent:</strong> To withdraw consent, email{" "}
                          <a
                            href="mailto:support@vereda.co.in"
                            className="text-yellow-900 underline font-medium"
                          >
                            support@vereda.co.in
                          </a>
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="disclosure" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        3. Disclosure
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        We may disclose personal information if required by law or if you violate our Terms of Service. Service providers may also access data only to the extent necessary.
                      </p>
                    </div>
                  </section>

                  <section id="payment" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        4. Payment
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        If you make a purchase we use third-party payment processors such as Razorpay or PayU. Payment data is handled according to PCI-DSS standards and retained only as long as needed to complete your transaction.
                      </p>
                    </div>
                  </section>

                  <section id="thirdparty" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        5. Third-Party Services
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Third-party providers may collect and use your information only as required to perform their services. They have their own privacy policies—we recommend reviewing them. If services are provided from another jurisdiction, your data may be subject to that jurisdiction&quot;s laws.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Once redirected to a third-party site, their privacy practices apply.
                      </p>
                    </div>
                  </section>

                  <section id="security" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        6. Security
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        We take reasonable steps and follow industry standards to protect your personal information. Payment data is transmitted via SSL and stored using encryption where applicable. However, no method of online transmission or storage is 100% secure.
                      </p>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">Security Measures</h3>
                        <ul className="text-green-800 text-sm space-y-1">
                          <li>• SSL encrypted connections</li>
                          <li>• PCI-DSS compliant payment processing</li>
                          <li>• Regular security assessments</li>
                          <li>• Limited data access to authorized personnel</li>
                        </ul>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookies</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        We use cookies and tracking technologies to personalize your experience, measure engagement, and serve targeted ads. You can manage cookies in your browser settings.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        To opt out of targeted advertising, visit the Digital Advertising Alliance opt-out page or use vendor-specific privacy controls.
                      </p>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Web Analytics</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We may use analytics tools to measure anonymous session data and improve our site and services.
                      </p>
                    </div>
                  </section>

                  <section id="age" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        7. Age of Consent
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        By using this site, you confirm that you are at least the age of majority in your jurisdiction. We do not knowingly collect data from users under 16.
                      </p>
                    </div>
                  </section>

                  <section id="changes" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        8. Changes to this Privacy Policy
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        We may update this privacy policy at any time. Significant changes will be posted here. Continued use indicates acceptance. If our business is acquired, your data may be transferred to new ownership.
                      </p>
                    </div>
                  </section>

                  <section id="contact" className="scroll-mt-24">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                        Questions and Contact Information
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        For access, correction, deletion of data, or questions about this policy, contact our Privacy Compliance Officer.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Privacy Compliance Officer</h3>
                            <a
                              href="mailto:support@vereda.co.in"
                              className="text-blue-700 hover:text-blue-900 font-medium text-lg underline"
                            >
                              support@vereda.co.in
                            </a>
                            <p className="text-blue-600 text-sm mt-2">
                              We typically respond within 24-48 hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Footer Actions */}
                <section className="mt-16 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                      href="/terms"
                      className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Terms of Use
                    </Link>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print This Policy
                      </button>
                    </div>
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