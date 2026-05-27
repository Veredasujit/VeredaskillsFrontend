"use client";

import { useState, useEffect } from "react";
import {
  useCreateGoalMutation,
  useUpdateGoalMutation
} from "../../Redux/api/usergoalApi";
import toast from "react-hot-toast";
import { UserGoal } from "../../Redux/api/usergoalApi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Target, Calendar, X, Clock, PlayCircle, CheckCircle, Loader2 } from "lucide-react";

interface GoalFormProps {
  userId: string | undefined;
  editingGoal: UserGoal | null;
  onClose: () => void;
  onSuccess: () => void;
}

type GoalStatus = "pending" | "in-progress" | "completed";

const GoalForm: React.FC<GoalFormProps> = ({
  userId,
  editingGoal,
  onClose,
  onSuccess
}) => {
  const [createGoal] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();

  const [formData, setFormData] = useState({
    goalTitle: "",
    goalDescription: "",
    targetDate: "",
    status: "pending" as GoalStatus
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        goalTitle: editingGoal.goalTitle || "",
        goalDescription: editingGoal.goalDescription || "",
        targetDate: editingGoal.targetDate?.slice(0, 10) || "",
        status: editingGoal.status || "pending"
      });
    }
  }, [editingGoal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: GoalStatus) => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) {
      toast.error("User ID missing");
      setIsSubmitting(false);
      return;
    }

    // Validate form
    if (!formData.goalTitle.trim()) {
      toast.error("Goal title is required");
      setIsSubmitting(false);
      return;
    }

    try {
      let res;

      if (editingGoal) {
        res = await updateGoal({
          id: editingGoal.id,
          updatedData: formData,
        });
      } else {
        res = await createGoal({ userId, ...formData });
      }

      if (res?.data?.success) {
        toast.success(
          editingGoal ? "Goal updated successfully! 🎉" : "Goal created successfully! 🎉",
          {
            duration: 4000,
            icon: '✅'
          }
        );
        onSuccess();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save goal");
      console.error("Goal submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-500 text-white";
      case "in-progress":
        return "bg-blue-500 border-blue-500 text-white";
      case "pending":
        return "bg-gray-500 border-gray-500 text-white";
      default:
        return "bg-gray-500 border-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: GoalStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const statusOptions: { value: GoalStatus; label: string; description: string }[] = [
    { value: "pending", label: "Not Started", description: "Haven't started working on this goal" },
    { value: "in-progress", label: "In Progress", description: "Currently working on this goal" },
    { value: "completed", label: "Completed", description: "Successfully completed this goal" }
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants:Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#374151" },
    blur: { scale: 1, borderColor: "#D1D5DB" }
  };

  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98 },
    disabled: { scale: 1, opacity: 0.5 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-200"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <motion.div 
            className="border-b border-gray-100 p-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2 bg-gray-800 rounded-xl text-white"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Target className="w-6 h-6" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingGoal ? "Edit Goal" : "Create New Goal"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {editingGoal ? "Update your goal details" : "What do you want to achieve?"}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Goal Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Goal Title *
              </label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <input
                  name="goalTitle"
                  placeholder="e.g., Learn React, Run Marathon, Read 12 Books..."
                  value={formData.goalTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                  maxLength={100}
                />
              </motion.div>
              <motion.div 
                className="text-right text-xs text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {formData.goalTitle.length}/100
              </motion.div>
            </motion.div>

            {/* Goal Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileHover="focus"
              >
                <textarea
                  name="goalDescription"
                  placeholder="Describe your goal in detail... (optional)"
                  value={formData.goalDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 resize-none bg-gray-50"
                  maxLength={500}
                />
              </motion.div>
              <motion.div 
                className="text-right text-xs text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                {formData.goalDescription.length}/500
              </motion.div>
            </motion.div>

            {/* Status Selection */}
            {editingGoal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {statusOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleStatusChange(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                        formData.status === option.value
                          ? `${getStatusColor(option.value)} shadow-md`
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {getStatusIcon(option.value)}
                        </motion.div>
                        <span>{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Target Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Target Date
              </label>
              <div className="relative">
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover="focus"
                >
                  <input
                    type="date"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 bg-gray-50 pr-12"
                  />
                </motion.div>
                <motion.div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  whileHover={{ scale: 1.2 }}
                >
                  <Calendar className="w-5 h-5" />
                </motion.div>
              </div>
              <motion.p 
                className="text-xs text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Set a target date to keep yourself motivated
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.goalTitle.trim()}
                className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonVariants}
                whileHover={isSubmitting || !formData.goalTitle.trim() ? "disabled" : "hover"}
                whileTap={isSubmitting || !formData.goalTitle.trim() ? "disabled" : "tap"}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                    {editingGoal ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <span>{editingGoal ? "Update Goal" : "Create Goal"}</span>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Target className="w-4 h-4" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GoalForm;