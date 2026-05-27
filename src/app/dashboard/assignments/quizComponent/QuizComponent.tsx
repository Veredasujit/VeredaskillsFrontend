"use client";

import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetWeeklyResultsQuery } from "@/Redux/api/weekApi";
import {
  Loader2,
  Trophy,
  AlertTriangle,
  Lock,
  PlayCircle,
  Star,
  Calendar,
  Sparkles,
} from "lucide-react";

interface QuizProps {
  onExit: () => void;
}

const QuizComponent: React.FC<QuizProps> = ({ onExit }) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetWeeklyResultsQuery();
  const weeks = useMemo(() => data?.data || [], [data]);
 

  // Determine locked weeks
  const availableWeeks = useMemo(() => {
    if (!weeks.length) return [];
    const firstLockedIndex = weeks.findIndex(
      (w) => w.weekStatus === "failed" || w.weekStatus === "appearing"
    );
    return weeks.map((w, i) => ({
      ...w,
      isLocked: i > firstLockedIndex && firstLockedIndex !== -1,
    }));
  }, [weeks]);

  const completedWeeks = weeks.filter((w) => w.weekStatus === "passed").length;
  const totalWeeks = weeks.length;
  const progressPercentage =
    totalWeeks > 0 ? (completedWeeks / totalWeeks) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.08 },
    },
  };

 const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100 },
  },
} satisfies Variants;

  // ✅ Updated: Allow retest for passed, failed, and appearing weeks
  const handleWeekClick = (weekNumber: number, status: string, isLocked: boolean) => {
    if (isLocked) return;
    router.push(`/test?week=${weekNumber}`);
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <Loader2 className="w-10 h-10 text-indigo-500" />
        </motion.div>
        <p className="text-lg font-medium text-slate-700">
          Loading your progress...
        </p>
      </div>
    );

    // ✅ If API fails (like 401), show CUSTOM message instead of error
    if (error)
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white/60 backdrop-blur-md border border-slate-200 rounded-3xl"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center shadow-inner">
            <Sparkles className="w-10 h-10 text-indigo-500" />
          </div>
  
          <h3 className="text-2xl font-bold text-slate-800 mb-3">
            No Test Records Found
          </h3>
  
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            It looks like you haven’t completed any weekly tests yet.  
            Start your first module and begin your learning journey!
          </p>
  
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/test?week=1")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-sky-500 text-white rounded-xl shadow-md"
          >
            Start Week 1 Test
          </motion.button>
        </motion.div>
      );
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-rose-50 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl p-10 mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Flutter Learning Path
                </h1>
              </div>
              <p className="text-slate-500 max-w-xl">
                Monitor your weekly learning milestones and stay on track toward
                mastery.
              </p>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-500 font-medium">
                    Overall Progress
                  </span>
                  <span className="text-slate-700 font-semibold">
                    {completedWeeks}/{totalWeeks} Weeks
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="px-6 py-3 bg-white/80 hover:bg-white/90 text-slate-700 rounded-xl font-medium border border-slate-300 shadow-sm transition-all"
            >
              Exit
            </motion.button>
          </div>
        </motion.div>

        {/* Week Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {availableWeeks.map((week) => {
            const isAppearing = week.weekStatus === "appearing";
            const isPassed = week.weekStatus === "passed";
            const isFailed = week.weekStatus === "failed";
            const isLocked = week.isLocked;

            const baseGradient = isLocked
              ? "from-slate-100 to-slate-50"
              : isPassed
              ? "from-emerald-100 to-green-50"
              : isFailed
              ? "from-rose-100 to-red-50"
              : "from-indigo-100 to-blue-50";

            const icon = isLocked ? (
              <Lock className="w-5 h-5 text-slate-500" />
            ) : isPassed ? (
              <Trophy className="w-5 h-5 text-green-600" />
            ) : isFailed ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <PlayCircle className="w-5 h-5 text-blue-600" />
            );

            return (
              <motion.div
                key={week.id}
                variants={cardVariants}
                whileHover={
                  !isLocked
                    ? {
                        scale: 1.03,
                        y: -6,
                        boxShadow: "0 12px 45px rgba(0,0,0,0.08)",
                      }
                    : {}
                }
                className={`relative p-6 rounded-2xl border border-slate-200 bg-gradient-to-br ${baseGradient} shadow-sm backdrop-blur-sm`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/80 rounded-lg border border-slate-200">
                      <Calendar className="w-5 h-5 text-slate-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Week {week.weekNumber}
                    </h3>
                  </div>
                  {icon}
                </div>

                {/* Status */}
                <p
                  className={`text-sm font-medium mb-3 ${
                    isPassed
                      ? "text-green-700"
                      : isFailed
                      ? "text-red-700"
                      : isLocked
                      ? "text-gray-500"
                      : "text-blue-700"
                  }`}
                >
                  {isAppearing && "Ready to begin your next module."}
                  {isPassed && "You can retake this quiz anytime."}
                  {isFailed && "You can retake this quiz."}
                  {isLocked && "Locked — complete the previous week to unlock."}
                </p>

                {/* Marks */}
                {!isAppearing && !isLocked && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      Score:{" "}
                      <strong className="text-slate-800">
                        {week.weekMarks}
                      </strong>
                    </span>
                  </div>
                )}

                {/* ✅ Action Button */}
                <motion.button
                  disabled={isLocked}
                  onClick={() =>
                    handleWeekClick(week.weekNumber, week.weekStatus, isLocked)
                  }
                  whileHover={!isLocked ? { scale: 1.05 } : {}}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition ${
                    isLocked
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-sky-500 text-white"
                  }`}
                >
                  <PlayCircle className="w-5 h-5" />{" "}
                  {isAppearing
                    ? "Begin Quiz"
                    : isFailed
                    ? "Retake Quiz"
                    : isPassed
                    ? "Retest"
                    : "Start"}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {availableWeeks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-white/70 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">
              No Available Modules
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              New weekly modules will be available soon. Please check back
              later.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizComponent;