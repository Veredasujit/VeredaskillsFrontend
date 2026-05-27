"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizComponent from "./quizComponent/QuizComponent";

type TabType = "projects" | "quizzes";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Continue your learning journey below.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("projects")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "projects"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Assignment
            </button>
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "quizzes"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Quizzes
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Creative Projects
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600">
                    Work on assignments and hands-on projects here.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "quizzes" && (
              <motion.div
                key="quizzes"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <QuizComponent onExit={() => setActiveTab("projects")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;