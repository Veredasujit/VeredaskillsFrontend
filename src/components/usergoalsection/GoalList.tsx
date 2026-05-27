'use client';

import { useState } from "react";
import { motion, AnimatePresence, Variants, Variant } from "framer-motion";
import {
  useGetUserGoalsQuery,
  useDeleteGoalMutation,
} from "../../Redux/api/usergoalApi";
import GoalForm from "./GoalForm";
import { UserGoal } from "../../Redux/api/usergoalApi";
import { Target, Edit3, Trash2, Calendar, Clock, Grid, List, AlertCircle, CheckCircle, PlayCircle, PauseCircle, Plus, ArrowUpDown } from "lucide-react";

interface GoalListProps {
  userId: string | undefined;
}

type ViewMode = 'grid' | 'list';

// Enhanced Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  },
  tap: {
    scale: 0.98
  }
};

const statsVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300
    }
  })
};

const floatingAnimation:Variant = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const shimmerAnimation:Variant = {
  x: ["-100%", "100%"],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const GoalList: React.FC<GoalListProps> = ({ userId }) => {
  if (!userId) throw new Error("User ID is required");
  const { data, isLoading, isError, refetch } = useGetUserGoalsQuery(userId);
  const [deleteGoal, { isLoading: isDeleting }] = useDeleteGoalMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<UserGoal | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'status'>('date');
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);

  const handleDeleteGoal = async (goalId: string) => {
    setDeletingId(goalId);
    try {
      await deleteGoal(goalId).unwrap();
    } catch (error) {
      console.error("Failed to delete goal:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200 shadow-green-100/50";
      case "in progress":
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100/50";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 shadow-yellow-100/50";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 shadow-gray-100/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "in progress":
      case "in-progress":
        return <PlayCircle className="w-5 h-5" />;
      case "pending":
        return <PauseCircle className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  // Helper function to get goals array safely
  const getGoalsArray = (): UserGoal[] => {
    if (!data?.data) return [];
    
    if (Array.isArray(data.data)) {
      return data.data;
    } else {
      return [data.data];
    }
  };

  // Helper function to get display status text
  const getDisplayStatus = (status: string): string => {
    switch (status?.toLowerCase()) {
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Sort goals
  const getSortedGoals = (goals: UserGoal[]): UserGoal[] => {
    return [...goals].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.goalTitle || '').localeCompare(b.goalTitle || '');
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'date':
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto mt-8"
      >
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="rounded-full h-12 w-12 border-b-2 border-gray-600"
          />
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mt-8"
      >
        <motion.div 
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-lg"
          whileHover={{ 
            scale: 1.02,
            y: -2,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <motion.div 
            className="text-red-600 mb-4 flex justify-center"
            animate={floatingAnimation}
          >
            <AlertCircle className="w-16 h-16" />
          </motion.div>
          <h3 className="text-red-800 font-bold text-xl mb-3">
            Failed to load goals
          </h3>
          <p className="text-red-600 mb-6 text-lg">
            There was an error loading your goals. Please try again.
          </p>
          <motion.button
            onClick={refetch}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={shimmerAnimation}
            />
            <span className="relative z-10">Retry</span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const goals = getGoalsArray();
  const sortedGoals = getSortedGoals(goals);

  const handleAddGoal = () => {
    setEditingGoal(null);
    setOpenModal(true);
  };

  const handleEditGoal = (goal: UserGoal) => {
    setEditingGoal(goal);
    setOpenModal(true);
  };

  // Count goals by status
  const completedCount = goals.filter((goal: UserGoal) => 
    goal.status?.toLowerCase() === "completed"
  ).length;

  const inProgressCount = goals.filter((goal: UserGoal) => 
    goal.status?.toLowerCase() === "in-progress" || goal.status?.toLowerCase() === "in progress"
  ).length;

  const pendingCount = goals.filter((goal: UserGoal) => 
    goal.status?.toLowerCase() === "pending"
  ).length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
      >
        <div className="mb-4 lg:mb-0">
          <motion.h1 
            className="text-4xl font-bold text-gray-900"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Your Goals
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-3 text-lg"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
          >
            Track and manage your personal goals with style
          </motion.p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* View Controls */}
          <motion.div 
            className="flex items-center gap-4 bg-white rounded-2xl p-3 border border-gray-200 shadow-sm"
            whileHover={{ 
              y: -2,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-gray-800' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-gray-800' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Sort Dropdown */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <motion.select
                whileFocus={{ scale: 1.02 }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "title" | "status")}
                className="bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 shadow-sm appearance-none cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="status">Sort by Status</option>
              </motion.select>
            </motion.div>
          </motion.div>

          {/* Add Goal Button */}
          <motion.button
            onClick={handleAddGoal}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gray-800 hover:bg-gray-900 cursor-pointer text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 flex items-center space-x-3 overflow-hidden"
          >
            <motion.div
              animate={shimmerAnimation}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            />
            <motion.div
              whileHover={{ 
                scale: 1.2,
                rotate: 90
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Plus className="w-5 h-5 relative z-10" />
            </motion.div>
            <span className="font-semibold text-lg relative z-10">Add New Goal</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Summary */}
      {goals.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Total Goals", value: goals.length, color: "gray", icon: Target },
            { label: "Completed", value: completedCount, color: "green", icon: CheckCircle },
            { label: "In Progress", value: inProgressCount, color: "blue", icon: PlayCircle },
            { label: "Pending", value: pendingCount, color: "yellow", icon: PauseCircle }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              variants={statsVariants}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="w-2 h-2 bg-gray-300 rounded-full"
                  />
                </div>
                <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal for Create & Edit */}
      <AnimatePresence>
        {openModal && (
          <GoalForm
            userId={userId}
            editingGoal={editingGoal}
            onClose={() => setOpenModal(false)}
            onSuccess={() => setOpenModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300 shadow-inner relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent"
              animate={shimmerAnimation}
            />
            <motion.div 
              className="mb-6 flex justify-center relative z-10"
              animate={floatingAnimation}
            >
              <Target className="w-24 h-24 text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
              No goals yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed relative z-10">
              Start your journey by creating your first goal. What amazing things do you want to achieve?
            </p>
            <motion.button
              onClick={handleAddGoal}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg relative overflow-hidden"
            >
              <motion.div
                animate={shimmerAnimation}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              />
              <span className="relative z-10">Create Your First Goal</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Display - Grid View */}
      <AnimatePresence mode="wait">
        {goals.length > 0 && viewMode === 'grid' && (
          <motion.div
            key="grid-view"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {sortedGoals.map((goal: UserGoal) => (
                <motion.div
                  key={goal.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredGoal(goal.id)}
                  onHoverEnd={() => setHoveredGoal(null)}
                  className="group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden bg-white cursor-pointer"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full"
                    animate={hoveredGoal === goal.id ? shimmerAnimation : {}}
                  />
                  
                  <div className="relative p-6 flex flex-col h-full z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="text-gray-600"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {getStatusIcon(goal.status)}
                        </motion.div>
                        <motion.span 
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border-2 shadow-sm ${getStatusColor(goal.status)}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {getDisplayStatus(goal.status)}
                        </motion.span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-4">
                      <motion.h3 
                        className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {goal.goalTitle}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 leading-relaxed mb-4 line-clamp-3 text-sm"
                        whileHover={{ x: 2 }}
                      >
                        {goal.goalDescription || "No description provided"}
                      </motion.p>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 text-sm text-gray-500 mb-6">
                      {goal.targetDate && (
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                          >
                            <Calendar className="w-4 h-4" />
                          </motion.div>
                          <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                        </motion.div>
                      )}
                      <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                        >
                          <Clock className="w-4 h-4" />
                        </motion.div>
                        <span>Created: {new Date(goal.createdAt || Date.now()).toLocaleDateString()}</span>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex gap-3 pt-4 border-t border-gray-100"
                      initial={{ opacity: 0.8, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditGoal(goal);
                        }}
                        disabled={isDeleting}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-md relative overflow-hidden"
                      >
                        <motion.div
                          animate={shimmerAnimation}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        />
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Edit3 className="w-4 h-4 relative z-10" />
                        </motion.div>
                        <span className="relative z-10">Edit</span>
                      </motion.button>

                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGoal(goal.id);
                        }}
                        disabled={isDeleting && deletingId === goal.id}
                        whileHover={{ 
                          scale: deletingId !== goal.id ? 1.05 : 1,
                          y: deletingId !== goal.id ? -2 : 0,
                          boxShadow: deletingId !== goal.id ? "0 5px 15px rgba(0, 0, 0, 0.1)" : "none"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        <motion.div
                          animate={shimmerAnimation}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        />
                        {isDeleting && deletingId === goal.id ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full relative z-10"
                            />
                            <span className="relative z-10">Deleting...</span>
                          </>
                        ) : (
                          <>
                            <motion.div
                              whileHover={{ rotate: -15 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Trash2 className="w-4 h-4 relative z-10" />
                            </motion.div>
                            <span className="relative z-10">Delete</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Display - List View */}
      <AnimatePresence mode="wait">
        {goals.length > 0 && viewMode === 'list' && (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Goal
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Target Date
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {sortedGoals.map((goal: UserGoal, index: number) => (
                      <motion.tr 
                        key={goal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ 
                          backgroundColor: "rgba(249, 250, 251, 0.8)",
                          scale: 1.01,
                          y: -1
                        }}
                        className="transition-all duration-200"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <motion.div 
                              className="text-gray-600"
                              whileHover={{ scale: 1.3, rotate: 5 }}
                            >
                              {getStatusIcon(goal.status)}
                            </motion.div>
                            <div>
                              <div className="font-bold text-gray-900 text-lg mb-1">
                                {goal.goalTitle}
                              </div>
                              <div className="text-sm text-gray-600 line-clamp-1">
                                {goal.goalDescription || "No description"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <motion.span 
                            className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border-2 ${getStatusColor(goal.status)}`}
                            whileHover={{ scale: 1.05, y: -1 }}
                          >
                            {getDisplayStatus(goal.status)}
                          </motion.span>
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-700 font-medium">
                          {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'Not set'}
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-600">
                          {new Date(goal.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={() => handleEditGoal(goal)}
                              disabled={isDeleting}
                              whileHover={{ scale: 1.1, rotate: 5, y: -1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-xl transition-colors duration-200 disabled:opacity-50 shadow-md"
                              title="Edit Goal"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteGoal(goal.id)}
                              disabled={isDeleting && deletingId === goal.id}
                              whileHover={{ scale: 1.1, rotate: -5, y: -1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-colors duration-200 disabled:opacity-50 shadow-md"
                              title="Delete Goal"
                            >
                              {isDeleting && deletingId === goal.id ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay for deletions */}
      <AnimatePresence>
        {(isDeleting) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 flex items-center gap-4 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full"
              />
              <span className="text-gray-700 font-semibold">Processing...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GoalList;