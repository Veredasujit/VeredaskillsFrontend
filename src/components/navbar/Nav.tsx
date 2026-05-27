'use client';

import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function Nav() {
  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/veredaindia?mibextid=LQQJ4d' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/vereda-management-india/' },
    { icon: FaInstagram, href: 'https://www.instagram.com/veredaindia' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow border-b border-gray-200">
      {/* Left Section: Phone & Address */}
      <div className="flex flex-row justify-items-end  gap-6 pl-9">
        {/* Phone */}
        <div className="flex items-center gap-2 ">
          <FaPhone className="text-blue-600 text-lg" />
          <Link
            href="tel:+919570994444"
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            +91-9 570 994 444
          </Link>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="text-blue-600 text-lg mt-1" />
          <p className="text-gray-800 font-medium leading-tight">
            9 Sinha Library Road,
            Venture Park Patna
          </p>
        </div>
      </div>

      {/* Right Section: Social Media */}
      <div className="flex flex-row gap-5 items-end ">
        <p className="text-sm text-gray-600 mb-1">Find us on:</p>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className="w-7 h-7  rounded-lg flex items-center justify-center text-gray-600  hover:text-white transition-colors"
            >
              <social.icon className="text-lg" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
