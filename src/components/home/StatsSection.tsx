"use client";

import { FolderCog, GraduationCap, Users, Smartphone } from "lucide-react";
import { motion, Variants } from "framer-motion";

const stats = [
  {
    icon: Smartphone,
    number: "7+",
    label: "Years of Mobile App Development & Training",
  },
  {
    icon: GraduationCap,
    number: "5000+",
    label: "Learners Enrolled in Flutter Mastery Program",
  },
  {
    icon: Users,
    number: "2000+",
    label: "Total Students Placed",
  },
  {
    icon: FolderCog,
    number: "100+",
    label: "Projects Successfully Built",
  },
];

// Parent animation (stagger children)
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

// Child card animation
const itemVariants:Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function StatsSection() {
  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-indigo-50 via-white to-blue-50 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  transition: { type: "spring", stiffness: 220, damping: 18 },
                }}
                className="relative flex flex-col items-center px-6"
              >
                {/* GLASS ICON BOX */}
                <motion.div
                  whileHover={{ scale: 1.07, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="
                    flex items-center justify-center w-20 h-20 rounded-2xl
                    bg-white/20 backdrop-blur-xl 
                    border border-white/40 shadow-lg 
                    shadow-blue-100/40
                    ring-1 ring-white/20
                  "
                >
                  <Icon className="w-10 h-10 text-blue-600 drop-shadow-sm" strokeWidth={1.7} />
                </motion.div>

                {/* NUMBER */}
                <motion.h3
                  className="text-4xl font-extrabold mt-4 text-gray-900"
                  layout
                >
                  {item.number}
                </motion.h3>

                {/* LABEL */}
                <p className="text-lg text-gray-600 mt-1 font-medium">
                  {item.label}
                </p>

                {/* Animated underline */}
                <motion.div
                  className="mt-3 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "40%" }}
                  whileHover={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Vertical Divider */}
                {index !== stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-blue-200/60" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
