"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation } from "../../Redux/api/authApi";
import { useDispatch } from "react-redux";
import { logout as logoutSlice } from "../../Redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { BookOpen, Home, LayoutDashboard, LogOut, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserName(JSON.parse(userData).name);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(logoutSlice());
      setUserName(null);
      router.push("/login");
    }
  };

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/view-courses", label: "Courses", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <motion.nav
      className="backdrop-blur-md bg-white/80 text-gray-800 shadow-sm border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer"
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={140}
                height={55}
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-gray-900 transition"
              >
                <item.icon size={16} className="opacity-70" />
                {item.label}

                {/* Modern underline */}
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Auth Controls */}
            {userName ? (
              <div className="flex items-center gap-4">
                {/* User avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 rounded-full bg-gray-900 text-white flex justify-center items-center shadow-sm font-semibold"
                >
                  {userName.charAt(0).toUpperCase()}
                </motion.div>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition font-medium"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white shadow-sm hover:bg-black transition font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition text-2xl"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? "✕" : "☰"}
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 pb-4 space-y-1"
          >
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}

            {userName ? (
              <div className="pt-2 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex justify-center items-center font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{userName}</span>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center px-4 py-3 rounded-lg bg-gray-900 text-white shadow-sm mt-2 hover:bg-black transition font-medium"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
