"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";


type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
  icon?: string; // ✅ optional
};

type FooterSection = {
  title: string;
  social?: boolean;
  links: FooterLink[];
};


export default function Footer() {


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  };

  const itemVariants:Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const linkVariants:Variants = {
    rest: { x: 0, color: "#D1D5DB" },
    hover: { 
      x: 8, 
      color: "#FFFFFF",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const socialLinkVariants:Variants = {
    rest: { x: 0, color: "#D1D5DB", scale: 1 },
    hover: { 
      x: 6, color: "#FFFFFF", scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const sections:FooterSection[] = [
    {
      title: "Account",
      links: [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" }
      ]
    },
    {
      title: "Company",
      links: [
        { href: "/about-us", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
        { href: "/refund-policy", label: "Refund Policy" },
        { href: "/terms-and-conditions", label: "Terms & Conditions" },
        { href: "/privacy", label: "Privacy Policy" }
      ]
    },
    {
      title: "Follow Us",
      social: true,
      links: [
        { href: "https://facebook.com", label: "Facebook", icon: "facebook-fill", external: true },
        { href: "https://instagram.com", label: "Instagram", icon: "instagram-fill", external: true },
        { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin-box-fill", external: true }
      ]
    },
    {
      title: "Support",
      links: [
        { href: "https://api.whatsapp.com/send/?phone=%2B919570994444", label: "Help Center", external: true },
        { href: "tel:+919570994444", label: "Contact Support", external: true }
      ]
    }
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ------- BRAND INTRO BLOCK -------- */}
        <motion.div
          variants={itemVariants}
          className="mb-16 max-w-3xl text-center mx-auto"
        >
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src="/images/logo.png"
              width={60}
              height={60}
              alt="Vereda Logo"
              className="rounded-xl shadow-lg"
            />
          </motion.div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Vereda Digital Learning
          </h2>

          <p className="mt-4 text-gray-300 text-lg leading-relaxed">
            Empowering India with career-driven, skill-based digital education.  
            Learn from industry experts, build real-world projects, and become job-ready.
          </p>

          {/* Stats Strip */}
          <div className="flex justify-center gap-10 mt-8 text-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">7+</p>
              <p className="text-sm">Years of Experience</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">5000+</p>
              <p className="text-sm">Students Trained</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">2000+</p>
              <p className="text-sm">Student Placed</p>
            </div>
          </div>
        </motion.div>

        {/* ------- FOOTER SECTIONS -------- */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14"
        >
          {sections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 text-blue-400 relative inline-block">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map(link => (
                  <motion.li key={link.label} variants={itemVariants}>
                    {section.social ? (
                      <motion.div
                        variants={socialLinkVariants}
                        whileHover="hover"
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <i className={`ri-${link.icon} text-xl text-blue-400`} />
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={linkVariants}
                        initial="rest"
                        whileHover="hover"
                        className="cursor-pointer"
                      >
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : "_self"}
                          rel={link.external ? "noopener noreferrer" : ""}
                          className="text-gray-300 flex items-center gap-2 text-sm"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ------- TRUST BADGES -------- */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex justify-center gap-10 opacity-80"
        >
          <div className="flex flex-col items-center">
            <i className="ri-shield-check-line text-3xl text-blue-400"></i>
            <p className="text-sm mt-2 text-gray-400">ISO Certified Training</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="ri-award-fill text-3xl text-purple-400"></i>
            <p className="text-sm mt-2 text-gray-400">Industry Recognised</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="ri-group-fill text-3xl text-green-400"></i>
            <p className="text-sm mt-2 text-gray-400">5000+ Students</p>
          </div>
        </motion.div>

        {/* ------- COPYRIGHT -------- */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-700/50 mt-14 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Vereda Digital Learning — All rights reserved
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
