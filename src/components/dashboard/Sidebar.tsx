"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Courses", href: "/dashboard/courses" },
    { name: "My Assignments", href: "/dashboard/assignments" },
     { name: "SetGoals", href: "/dashboard/usergoal" },
     { name: "Certificate", href: "/dashboard/Certificate" },
    { name: "Settings", href: "/dashboard/settings" },
    { name: "Billing", href: "/dashboard/billing" },
  ];

  const itemVariants:Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }),
    hover: {
      x: 4,
      backgroundColor: "rgba(243, 244, 246, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    active: {
      backgroundColor: "rgba(229, 231, 235, 0.8)",
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500
      }
    }
  };

  const indicatorVariants:Variants = {
    inactive: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    active: {
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    hover: {
      scaleY: 1,
      opacity: 1,
      backgroundColor: "rgba(156, 163, 175, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  const backgroundVariants:Variants = {
    inactive: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    active: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    hover: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* 📋 Sidebar */}
      <aside
        className={`fixed mt-20 top-[64px] left-0 z-40 
          w-64 h-[calc(100vh-64px)] overflow-y-auto
          bg-white/95 backdrop-blur-2xl border-r border-gray-200/60
          shadow-xl
          transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
          lg:translate-x-0 lg:opacity-100 lg:static`}
      >
        <div className="p-6 space-y-2">
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={itemVariants}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      relative flex items-center px-3 py-3 rounded-lg overflow-hidden
                      font-medium tracking-wide transition-all duration-300 group
                      ${isActive ? "text-gray-900" : "text-gray-700 hover:text-gray-900"}
                    `}
                  >
                    {/* Selection Indicator Bar */}
                    <motion.span
                      className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gray-800 origin-bottom"
                      variants={indicatorVariants}
                      animate={isActive ? "active" : "inactive"}
                      whileHover="hover"
                    />

                    {/* Background Glow Effect */}
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-200/40 to-transparent"
                      variants={backgroundVariants}
                      animate={isActive ? "active" : "inactive"}
                      whileHover="hover"
                    />

                    <motion.span
                      className={`z-10 relative flex-1 pl-3 transition-colors duration-300
                        ${isActive ? "font-semibold" : ""}`}
                      whileHover={{ x: 2 }}
                    >
                      {item.name}
                    </motion.span>

                    {/* Active State Pulse */}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-lg border border-gray-300/50"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 🔲 Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;