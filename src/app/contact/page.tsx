'use client';

import { useState, useEffect } from 'react';
import type React from 'react';
import { MapPin, Phone, Mail, Globe, Send, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCreateContactMutation } from '@/Redux/api/contactApi';
import toast from 'react-hot-toast';
import Navbar from '@/components/navbar/Navbar';
import { motion, Variants } from 'framer-motion';
import Image from "next/image";

// Dynamically import the map component with no SSR
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <motion.div 
      className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center text-gray-500">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
          <MapPin size={24} className="text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">Loading map...</p>
      </div>
    </motion.div>
  )
});

interface FormData {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize the mutation hook
  const [createContact, { isLoading }] = useCreateContactMutation();

  // Contact information with handlers
  const contactInfo = {
    phone: '+919570994444',
    email: 'support@vereda.co.in',
    website: 'https://www.vereda.co.in'
  };

  const handlePhoneClick = () => {
    window.open(`tel:${contactInfo.phone}`);
  };

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`);
  };

  const handleWebsiteClick = () => {
    window.open(contactInfo.website, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message
      };

      await createContact(contactData).unwrap();
      toast.success("Your message has been sent successfully! We'll get back to you soon.");
      setShowModal(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error('Failed to create contact:', err);
    }
  };

 

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants: Variants = {
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

  const cardVariants: Variants = {
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
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const inputVariants: Variants = {
    focused: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    blurred: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div 
          className="max-w-7xl mx-auto text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            variants={itemVariants}
          >
            <MessageCircle size={16} />
            We&apos;re here to help
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Get in <span className="text-blue-700">Touch</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Interested in learning Flutter or have questions about our courses? 
            Send us a message — we&apos;d love to help you start your journey in app development 
            and create something amazing together.
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Enhanced Contact Form */}
            <motion.div 
              className="relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 border border-gray-200"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    Start the Conversation
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Tell us about your project and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                        Your Name *
                      </label>
                      <motion.div
                        variants={inputVariants}
                        animate={focusedField === 'name' ? 'focused' : 'blurred'}
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          disabled={isLoading}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder-gray-400"
                          placeholder="Abhishek Kumar"
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Your Email *
                      </label>
                      <motion.div
                        variants={inputVariants}
                        animate={focusedField === 'email' ? 'focused' : 'blurred'}
                      >
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          disabled={isLoading}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder-gray-400"
                          placeholder="Abhishek@vereda.co.in"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700">
                      Mobile Number *
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={focusedField === 'mobile' ? 'focused' : 'blurred'}
                    >
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                        onFocus={() => handleFocus('mobile')}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder-gray-400"
                        placeholder="+919934601244"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                      Subject *
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={focusedField === 'subject' ? 'focused' : 'blurred'}
                    >
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder-gray-400"
                        placeholder="What can we help you with?"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                      Your Message *
                    </label>
                    <motion.div
                      variants={inputVariants}
                      animate={focusedField === 'message' ? 'focused' : 'blurred'}
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed placeholder-gray-400"
                        placeholder="Tell us more about your project, timeline, and requirements..."
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-400 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-900 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="font-medium">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span className="font-medium">Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>

            {/* Right Column - Enhanced Company Info & Map */}
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Enhanced Company Information */}
              <motion.div 
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-start gap-4 mb-8">
                  {/* LOGO ADDED HERE */}
                  <motion.div 
                    className="bg-blue-400 p-3 rounded-2xl shadow-lg"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/logo.png"
                        alt="Vereda Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Vereda Digital Technologies
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex text-yellow-500">
                        {"★".repeat(5)}
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-fit">

{/* Google Icon */}
<div className="flex items-center">
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 33.3 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11.05 0 19.8-8.95 19.8-20 0-1.3-.1-2.5-.2-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 14.7 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.1 4 9.2 8.5 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 36 26.7 37 24 37c-5.2 0-9.5-3.3-11.2-7.8l-6.6 5C9.2 39.5 16.1 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.4 3.3-4.7 6-9.3 6-5.2 0-9.5-3.3-11.2-7.8l-6.6 5C9.2 39.5 16.1 44 24 44c11.05 0 19.8-8.95 19.8-20 0-1.3-.1-2.5-.2-3.5z"/>
  </svg>
</div>

{/* Rating */}
<div className="flex flex-col leading-tight">
  <span className="text-gray-900 font-semibold text-sm">
     4.9 / 5.0
  </span>
  <span className="text-gray-500 text-xs">
    Based on 2,400+ Google Reviews
  </span>
</div>

</div>

                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Office Address</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Sinha Library road, Venture park, Patna <br />
                        Lodipur, Patna, Bihar 800001, India
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                    onClick={handlePhoneClick}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Phone number</p>
                      <p className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                    onClick={handleEmailClick}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Send email</p>
                      <p className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                        {contactInfo.email}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    whileHover={{ x: 5 }}
                    onClick={handleWebsiteClick}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Our website</p>
                      <p className="text-gray-600 text-sm hover:text-blue-600 transition-colors">
                        {contactInfo.website.replace("https://", "")}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Map Section */}
              <motion.div 
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <MapPin size={20} className="text-gray-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">Find Us Here</h3>
                </div>

                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {isClient && <Map />}
                </motion.div>

                <motion.div 
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-600">
                    Visit our office — we&apos;d love to meet you in person!
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {showModal && (
        <motion.div 
          className="fixed inset-0 bg-blue-500/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                <Send size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Message Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully.<br />
              Our team will reach out to you within <span className="font-semibold text-gray-800">24 hours</span>.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}




