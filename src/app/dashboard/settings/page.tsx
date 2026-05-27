"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/Redux/store";
import { useUpdateUserMutation } from "@/Redux/api/userApi";
import { setCredentials } from "@/Redux/slices/authSlice";
import Image from "next/image";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { motion, AnimatePresence } from "framer-motion";

// Use the exact same User interface as your Redux store
// Replace this with the actual User interface from your Redux store
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileURL?: string | null;
  profileImage?: string | null;
  bio?: string | null;
  skills?: string[];
  joinDate?: string;
  role?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Create a display-friendly version for the component
interface DisplayUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileURL: string | null;
  profileImage: string | null;
  bio: string;
  skills: string[];
  joinDate: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const UserSettings: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const userData = auth.user;
  
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  // Convert Redux User to DisplayUser
  const convertToDisplayUser = (user: User | null): DisplayUser => {
    if (!user) {
      const now = new Date().toISOString();
      return {
        id: "1",
        name: "SetName",
        email: "addemail@example.com",
        phone: "+1 (555) 123-4567",
        profileURL: "https://example.com/johndoe",
        profileImage: null,
        bio: "Add Bio",
        skills: ["add skills"],
        joinDate: now.split("T")[0],
        role: "student",
        createdAt: now,
        updatedAt: now,
      };
    }

    const createdAt = user.createdAt instanceof Date 
      ? user.createdAt.toISOString() 
      : new Date().toISOString();
    
    const updatedAt = user.updatedAt instanceof Date 
      ? user.updatedAt.toISOString() 
      : new Date().toISOString();

    return {
      id: user.id,
      name: user.name || "SetName",
      email: user.email || "addemail@example.com",
      phone: user.phone || "+1 (555) 123-4567",
      profileURL: user.profileURL || null,
      profileImage: user.profileImage || null,
      bio: user.bio || "Add Bio",
      skills: Array.isArray(user.skills) ? user.skills : (user.skills ? [user.skills] : ["add skills"]),
      joinDate: user.joinDate || createdAt.split("T")[0],
      role: user.role || "student",
      createdAt,
      updatedAt,
    };
  };

  const [user, setUser] = useState<DisplayUser>(() => convertToDisplayUser(userData));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileURL: "",
    bio: "",
    skills: "",
    imageFile: null as File | null,
  });

  // Initialize form data when user changes
  useEffect(() => {
    const displayUser = convertToDisplayUser(userData);
    setUser(displayUser);
    setFormData({
      name: displayUser.name,
      email: displayUser.email,
      phone: displayUser.phone,
      profileURL: displayUser.profileURL || "",
      bio: displayUser.bio,
      skills: displayUser.skills.join(", "),
      imageFile: null,
    });
    // Fix: Use online image URL as fallback
    setImagePreview(displayUser.profileImage || displayUser.profileURL);
  }, [userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData((prev) => ({ ...prev, imageFile: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("profileURL", formData.profileURL);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("skills", formData.skills);

      if (formData.imageFile) {
        formDataToSend.append("profileImage", formData.imageFile);
      }

      const result = await updateUser({ id: user.id, data: formDataToSend }).unwrap();

      if (result) {
        dispatch(setCredentials({
          user: result.user,
          token: auth?.token ?? "",
        }));
      }

      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      let message = "Failed to update profile";

      if (err instanceof Error) {
        message = err.message;
      } else {
        const fetchError = err as FetchBaseQueryError;
        if ('data' in fetchError && typeof fetchError.data === 'object' && fetchError.data !== null) {
          const data = fetchError.data as { message?: string };
          if (data.message) message = data.message;
        }
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileURL: user.profileURL || "",
      bio: user.bio,
      skills: user.skills.join(", "),
      imageFile: null,
    });
    // Fix: Reset to original image with online URL fallback
    setImagePreview(user.profileImage || user.profileURL);
    setIsModalOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Enhanced spinner component with motion
  const LoadingSpinner = () => (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span>Saving...</span>
    </motion.div>
  );

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 p-6 mt-[80px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Profile Card */}
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header Section */}
          <div className="bg-white p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Fix: Use online URL as fallback for profile image */}
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt={user.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                      onError={(e) => {
                        // If image fails to load, fall back to initials
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-gray-100">
                      {getInitials(user.name)}
                    </div>
                  )}
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <motion.span 
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </motion.span>
                  </div>
                </motion.div>
              </div>
              <motion.button
                onClick={openModal}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full mr-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 text-sm">📱</span>
                      </div>
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full mr-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    Member Since
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {new Date(user.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full mr-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    Bio
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {user.bio || "No bio provided yet."}
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full mr-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.length > 0 ? (
                      user.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-2 bg-white text-gray-700 rounded-lg font-medium text-sm border border-gray-300 hover:bg-gray-50 transition-colors duration-200 cursor-default"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added yet.</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal with Image Upload */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-900 p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
                  <motion.button
                    onClick={handleCancel}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {/* Profile Image Upload */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {/* Fix: Use online URL as fallback in modal too */}
                        {imagePreview ? (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              width={64}
                              height={64}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                              onError={(e) => {
                                // Fallback to initials if image fails to load
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const fallback = parent.querySelector('.image-fallback') as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="image-fallback hidden w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                              {getInitials(formData.name)}
                            </div>
                          </motion.div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                            {getInitials(formData.name)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG, WEBP allowed. Max 5MB.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
                    { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
                    { name: "profileURL", label: "Profile URL", type: "url", placeholder: "https://example.com/yourprofile" },
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] as string}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                        placeholder={field.placeholder}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 resize-none transition-all duration-200"
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {formData.bio.length}/500
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200"
                      placeholder="React, TypeScript, Node.js, ..."
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Separate skills with commas
                    </div>
                    
                    {/* Skills Preview */}
                    {formData.skills && (
                      <motion.div 
                        className="flex flex-wrap gap-2 mt-3"
                        layout
                      >
                        {formData.skills.split(",").map((skill, index) => (
                          skill.trim() && (
                            <motion.span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {skill.trim()}
                            </motion.span>
                          )
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <motion.button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                  whileHover={{ 
                    scale: isLoading ? 1 : 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? <LoadingSpinner /> : <span>Save Changes</span>}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserSettings;