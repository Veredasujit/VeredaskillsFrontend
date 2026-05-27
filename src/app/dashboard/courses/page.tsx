"use client";
import React, { useState, useMemo } from 'react';
import { useGetEnrollmentByIdQuery } from "@/Redux/api/enrollmentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  purchaseDate: string;
  progress: number;
  instructorName: string;
  category: string;
  thumbnail?: string;
 courseDuration: string;
  level: string;
  status: 'completed' | 'in-progress' | 'not-started';
  courseImageURL: string;
  batch:string;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'completed' | 'in-progress' | 'not-started';
  createdAt: string;
  updatedAt: string;
  course: Course;
}

type FilterKey = 'all' | 'in-progress' | 'completed' | 'not-started';

const CourseDetails: React.FC = () => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isClient, setIsClient] = useState(false);
  
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  
  const { data: enrollmentsData, error, isLoading } = useGetEnrollmentByIdQuery(userId);

  console.log("enr data are ",enrollmentsData)

  // Set client-side flag to prevent hydration mismatches
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Transform enrollment data to course format
  const enrolledCourses = useMemo(() => {
    if (!enrollmentsData?.enrollments) return [];
    
    return enrollmentsData.enrollments.map((enrollment: Enrollment) => {
      const course = enrollment.course;
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        price: typeof course.price === 'string' ? parseFloat(course.price) : course.price,
        purchaseDate: enrollment.createdAt,
        progress: enrollment.status === 'completed' ? 100 : 
                 enrollment.status === 'in-progress' ? 50 : 0,
        instructorName: course.instructorName|| 'Unknown Instructor',
        category: course.category || 'Uncategorized',
        status: enrollment.status,
        thumbnail: course.courseImageURL || '📚',
        courseDuration: course.courseDuration
 || 'Unknown duration',
        level: course.level || 'Beginner',
        batch:course.batch
      };
    });
  }, [enrollmentsData]);

  const filteredCourses = enrolledCourses.filter((course: Course) => 
    filter === 'all' || course.status === filter
  );

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: 'All Courses', count: enrolledCourses.length },
    { key: 'in-progress', label: 'In Progress', count: enrolledCourses.filter((c: Course) => c.status === 'in-progress').length },
    { key: 'completed', label: 'Completed', count: enrolledCourses.filter((c: Course) => c.status === 'completed').length },
    { key: 'not-started', label: 'Not Started', count: enrolledCourses.filter((c: Course) => c.status === 'not-started').length },
  ];

  



  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 mt-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden">
            {/* Decorative Gradient Top Bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
            
            <div className="px-6 py-12 sm:px-12 text-center">
              
              {/* Animated Illustration Container */}
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
                className="relative mb-8"
              >
                {/* Background decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-60"></div>
                </div>
                
                {/* Main illustration */}
                <div className="relative">
                  <div className="text-7xl sm:text-8xl mb-2">📚</div>
                  {/* Floating elements around the book */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-2 -right-4 text-3xl"
                  >
                    📚
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-4 -left-4 text-2xl"
                  >
                    ✨
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content with Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                  Your Learning Journey Awaits
                </h3>
                
                <div className="space-y-3 max-w-2xl mx-auto">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    It looks like your course library is empty. This could be because you&apos;re just getting started, 
                    or we&apos;re having trouble loading your courses.
                  </p>
                  
                  {/* Status Information */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>No courses enrolled yet</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Ready to explore learning opportunities</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                {/* Primary CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/view-courses">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="relative flex items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      Explore Our Course Catalog
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  </Link>
                </motion.div>

                {/* Secondary Action */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh Page
                  </button>
                </motion.div>
              </motion.div>

              {/* Additional Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 pt-8 border-t border-gray-200/60"
              >
                <p className="text-gray-500 text-sm mb-4">Need help getting started?</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course: Course) => (
        <motion.div 
          key={course.id} 
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
        >
          {/* Course Header */}
          <div className="relative">
            {course.thumbnail?.startsWith('http') ? (
              <Image
                src={course.thumbnail} 
                alt={course.title}
                width={400}
                height={160}
                className="w-full h-52 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl flex items-center justify-center text-white text-4xl">
                {course.thumbnail}
              </div>
            )}
            
            

            
          </div>

          {/* Course Content */}
          <div className="p-5 pt-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
             

            </div>

            

            <div className="flex items-center text-sm text-gray-500 mb-3">
              
              <span className="flex items-center text-lg text-blue-600">
                ⏱️ {course.courseDuration}
              </span>
            </div>

            

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <span className="text-lg font-bold text-gray-900">₹{course.price}</span>
                <span className="text-xs text-gray-500 block">
                  Purchased {new Date(course.purchaseDate).toLocaleDateString()}
                </span>
              </div>
              
              
              <a 
                href="/demo-ppt.pptx" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Demo PPT
                </button>
              </a>


            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="space-y-4">
      {filteredCourses.map((course: Course, index: number) => (
        <motion.div 
          key={course.id} 
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ x: 5 }}
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {/* Course Thumbnail */}
              <div className="flex-shrink-0">
                {course.thumbnail?.startsWith('http') ? (
                  <Image
                    src={course.thumbnail} 
                    alt={course.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {course.thumbnail}
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                   
                    <span className="text-lg font-bold text-gray-900">₹{course.price}</span>
                    <span className="text-xs text-gray-500 block">
                  Purchased {new Date(course.purchaseDate).toLocaleDateString()}
                </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  
                  <span className="flex items-center text-lg text-blue-600">
                    ⏱️ {course.courseDuration}
                  </span>
                  
                  
                </div>

                
                <div className="flex items-center justify-end">
                
                    <a 
                href="/demo-ppt.pptx" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Demo PPT
                </button>
              </a>
                  
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Don't render anything until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 mt-[80px]">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 mt-[80px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">Track your progress and continue your learning path</p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map(({ key, label, count }) => (
                <motion.button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === key
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label} <span className="ml-1 text-sm opacity-80">({count})</span>
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Grid
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📋 List
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Courses Content */}
        {filteredCourses.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600">
              {enrolledCourses.length === 0 ? "You haven't enrolled in any courses yet" : "Try changing your filter criteria"}
            </p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <GridView />
        ) : (
          <ListView />
        )}

        {/* Stats Summary */}
        {enrolledCourses.length > 0 && (
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { label: 'Total Courses', value: enrolledCourses.length, color: 'text-gray-800' },
              { label: 'In Progress', value: enrolledCourses.filter((c: Course) => c.status === 'in-progress').length, color: 'text-blue-600' },
              { label: 'Completed', value: enrolledCourses.filter((c: Course) => c.status === 'completed').length, color: 'text-green-600' },
              { label: 'Average Progress', value: `${Math.round(enrolledCourses.reduce((acc: number, course: Course) => acc + course.progress, 0) / enrolledCourses.length)}%`, color: 'text-gray-600' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;