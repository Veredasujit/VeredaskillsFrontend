'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllCoursesQuery } from '../../Redux/api/coursesApi';
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from 'next/navigation';
import { Clock, Users, CheckCircle, Video, Brain, Calendar, ArrowRight, X, Briefcase } from 'lucide-react';

// Interface based on your actual API response
interface Course {
  id: string;
  title: string;
  courseImageURL: string;
  description: string;
  price: string;
  instructorId: string;
  instructorName: string; // Added this field
  courseDuration: string;
  status: 'coming_soon' | 'live' | 'expired';
  availableSeat: number;
  courseRatings: number;
  usersLearn: number;
  createdAt: string;
  updatedAt: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced'; // Added this field
  totalSeat: number; // Added this field
}

// Extended interface for UI
interface UICourse extends Course {
  category: 'Web Development' | 'Mobile Development' | 'AI & Machine Learning';
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  programName: string;
  batchStatus: 'Coming Soon' | 'Ongoing' | 'Starting Soon' | 'Expired';
  instructor: { name: string };
  totalSeats: number;
  icon: string;
  bgGradient: string;
}

// Helper functions
const determineCategory = (course: Course): 'Web Development' | 'Mobile Development' | 'AI & Machine Learning' => {
  const title = course.title.toLowerCase();
  const description = course.description.toLowerCase();
  
  if (title.includes('flutter') || description.includes('flutter') || 
      title.includes('mobile') || description.includes('mobile') ||
      title.includes('dart') || title.includes('app')) {
    return 'Mobile Development';
  }
  
  if (title.includes('full stack') || title.includes('web') || 
      description.includes('web') || description.includes('frontend') ||
      description.includes('backend') || title.includes('javascript')) {
    return 'Web Development';
  }
  
  if (title.includes('ai') || title.includes('machine learning') || title.includes('ml') ||
      description.includes('ai') || description.includes('machine learning')) {
    return 'AI & Machine Learning';
  }
  
  return 'Web Development';
};

const calculateOriginalPrice = (discountedPrice: number): number => {
  const multiplier = 1 + (Math.random() * 0.5) + 0.3;
  return Math.round(discountedPrice * multiplier);
};

const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

const mapStatusToBatchStatus = (status: string): 'Coming Soon' | 'Ongoing' | 'Starting Soon' | 'Expired' => {
  switch (status) {
    case 'coming_soon': return 'Coming Soon';
    case 'live': return 'Ongoing';
    case 'expired': return 'Expired';
    default: return 'Starting Soon';
  }
};

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Web Development': return '💻';
    case 'Mobile Development': return '📱';
    case 'AI & Machine Learning': return '🤖';
    default: return '📚';
  }
};

const getCategoryGradient = (category: string): string => {
  switch (category) {
    case 'Web Development': return 'from-blue-400 to-blue-600';
    case 'Mobile Development': return 'from-blue-400 to-blue-600';
    case 'AI & Machine Learning': return 'from-blue-200 to-blue-600';
    default: return 'from-blue-400 to-blue-600';
  }
};

export default function FeaturedCourses() {
  const { data: coursesData, isLoading, error } = useGetAllCoursesQuery();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  console.log("Featured courses data:", coursesData);

  // Transform the API data for featured courses - ONLY SHOW 2 COURSES
  const featuredCourses: UICourse[] = [];
  
  if (coursesData && Array.isArray(coursesData)) {
    // Take only first 2 courses for featured section
    const coursesToShow = coursesData.slice(0, 1).map((course: Course): UICourse => {
      const category = determineCategory(course);
      const discountedPrice = parseFloat(course.price);
      const originalPrice = calculateOriginalPrice(discountedPrice);
      const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);
      
      // Use the actual data from API
      const totalSeats = course.totalSeat || (course.availableSeat + course.usersLearn);
      
      return {
        ...course,
        category,
        originalPrice,
        discountedPrice,
        discountPercentage,
        programName: course.title,
        batchStatus: mapStatusToBatchStatus(course.status),
        instructor: { name: course.instructorName }, // Use instructorName from API
        totalSeats, // Use totalSeat from API
        icon: getCategoryIcon(category),
        bgGradient: getCategoryGradient(category)
      };
    });
    
    featuredCourses.push(...coursesToShow);
  }

  // Handle enrollment
  const handleEnrollClick = (course: UICourse) => {
    if (!user) {
      router.push('/login?redirect=/courses');
      return;
    }

    const enrollmentData = {
      course: {
        id: course.id,
        title: course.title,
        price: course.discountedPrice,
        originalPrice: course.originalPrice,
        discountPercentage: course.discountPercentage,
        instructor: course.instructor.name,
        duration: course.courseDuration,
        image: course.courseImageURL,
        category: course.category,
        level: course.level // Use the level from API
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileURL: user.profileURL,
        phone: user.phone
      }
    };

    router.push(`/payment-page?data=${encodeURIComponent(JSON.stringify(enrollmentData))}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

   const features = [
     { icon: <Video className="w-6 h-6 text-blue-500" />, text: "Live Weekly Classes" ,subtext:"1.Recorded lessons 2.Live ssessions with doubt clearing"},
     { icon: <Brain className="w-6 h-6 text-purple-500" />, text: "Easy-to-follow content",subtext:"Structured modules created for absolute beginners" },
     { icon: <Calendar className="w-6 h-6 text-orange-500" />, text: "Weekly Assignments" ,subtext:"Checked by mentors with personaalized feedback"},
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Real App Projects",subtext:"Build 5 complete apps for your portfolio" },
    { icon: <Users className="w-6 h-6 text-indigo-500" />, text: "Mentor Support" ,subtext:"1:1 doubt-solving community chat"},
    { icon: <Briefcase className="w-6 h-6 text-pink-500" />, text: "Job & Freelance Guidance",subtext:"1.Resunts review 2.Interview prep- proposal scripts" },
  ];

  // Loading state - show 2 skeleton cards
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-xl font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Featured Courses
            </h2>
            <h3 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Pick A Course To Get Started
            </h3>
            <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          
          {/* Skeleton Loading for 2 courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-full aspect-[4/3] bg-gray-300 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-300 rounded-xl mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            <p>Error loading featured courses. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // If no courses available
  if (featuredCourses.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-xl font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Featured Courses
            </h2>
            <h3 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Pick A Course To Get Started
            </h3>
            <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          
          {/* No Courses Message */}
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Featured Courses Available
              </h3>
              <p className="text-gray-600 mb-6">
                Check back later for new featured courses.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
  <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        
        <h2 className="text-3xl  font-bold text-gray-900 mb-4 leading-tight">
         Master Mobile App Development with <span className='text-blue-400'>Industry Ready Skills</span> 
        </h2>
        
        
      </motion.div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
        {/* Course Card - Left Side */}
        <div className="lg:w-3/5">
          <motion.div
            className="max-w-[600px] mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100/50 backdrop-blur-sm"
              >
                {/* Course Image with Overlay */}
                <div className="relative">
                  <Link href={`/courses/lessons/${course.id}`}>
                    <div className="w-full overflow-hidden">
                      <div className="relative w-full aspect-[16/9] group">
                        <Image
                          src={course.courseImageURL || '/api/placeholder/400/300'}
                          alt={course.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 "
                          priority
                        />

                      </div>
                    </div>
                  </Link>
                </div>

                {/* Course Content */}
                <div className="p-6 lg:p-8">
                  {/* Pricing Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{course.discountedPrice.toLocaleString()}
                      </span>
                      
                    </div>
                    
                    <Link
                      href={`/courses/lessons/${course.id}`}
                      className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 hover:gap-3 transition-all duration-300 group"
                    >
                      Course Structure
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className='flex gap-9 items-center justify-between'>
                  {/* Program Name */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.programName}
                  </h3>

                 <p className='text-blue-500  text-lg'>{course.courseDuration}</p>

                  </div>

                 
                  {/* Enroll Button */}
                  <motion.button
                    onClick={() => handleEnrollClick(course)}
                    className={`w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-xl transition-all duration-300 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={{ scale: course.status === 'live' ? 1.02 : 1 }}
                    whileTap={{ scale: course.status === 'live' ? 0.98 : 1 }}
                    disabled={course.status !== 'live'}
                  >
                    <span className="flex items-center justify-center gap-3">
                      {course.status === 'live' ? (
                        <>
                          Enroll Now
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : course.status === 'coming_soon' ? (
                        <>
                          <Clock className="w-5 h-5" />
                          Coming Soon
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5" />
                          Enrollment Closed
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Sidebar - Right Side */}
        <motion.div
          className="lg:w-2/5"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100/50 sticky top-8">
            <motion.div
              className="text-center lg:text-left mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Premium Learning Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
               Learn industry-ready skills with a practical, project-based curriculum designed for real jobs and freelancing work.

              </p>
            </motion.div>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 border border-gray-100 hover:border-blue-200 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-300 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.text}
                    </h4>
                    <p>{feature.subtext}</p>
                    
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* View All Courses CTA */}
      {coursesData && Array.isArray(coursesData) && coursesData.length > 2 && (
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Explore All Our Courses
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Discover {coursesData.length}+ courses across various domains and skill levels
            </p>
            <Link href="/view-courses">
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Browse All Courses
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  </section>
);
}