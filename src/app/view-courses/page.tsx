'use client';

import { motion, Variants } from 'framer-motion';
import { useMemo, useState } from 'react';
import { 
  Search, 
  Star, 
  Users, 
  Smartphone, 
  ChevronDown,  
  BookOpen,
  Code,
  Database,
  Cloud,
  GitBranch,
  TestTube,
  Globe,
  Bot,
  MessageCircle,
  Palette,
  Rocket,
  BarChart3,
  Shield,
  Smartphone as Mobile,
  ArrowRight,
  Layers,
  Cpu,
  Terminal,
  Server,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { useGetAllCoursesQuery } from '../../Redux/api/coursesApi';
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Interface for raw API response
interface ApiCourse {
  id: string;
  title: string;
  courseImageURL: string;
  description: string;
  price: string;
  instructorId: string | null;
  instructorName: string;
  courseDuration: string;
  status: 'coming_soon' | 'live' | 'expired';
  availableSeat: number;
  courseRatings: number;
  usersLearn: number;
  createdAt: string;
  updatedAt: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalSeat: number;
  batch: string;
}

// Extended interface for UI with computed properties
interface UICourse {
  id: string;
  title: string;
  courseImageURL: string;
  description: string;
  price: string;
  instructorId: string | null;
  instructorName: string;
  courseDuration: string;
  status: 'coming_soon' | 'live' | 'expired';
  availableSeat: number;
  courseRatings: number;
  usersLearn: number;
  createdAt: string;
  updatedAt: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalSeat: number;
  batch: string;
  
  // Computed properties
  category: 'Mobile Development';
  tags: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  programName: string;
  batchStatus: 'Coming Soon' | 'Ongoing' | 'Starting Soon' | 'Expired';
  instructor: { name: string };
  totalSeats: number;
  icon: string;
  bgGradient: string;
  popularity: 'High' | 'Medium' | 'Low';
}

// API Response interfaces
interface ApiResponseSuccess {
  success: boolean;
  courses: ApiCourse[];
}

interface ApiResponseArray {
  data?: ApiCourse[];
  courses?: ApiCourse[];
  result?: ApiCourse[];
}

interface ApiResponseObject {
  data?: ApiCourse[] | ApiResponseArray;
  courses?: ApiCourse[];
  result?: ApiCourse[];
}

type ApiResponse = ApiCourse[] | ApiResponseObject | ApiResponseArray | ApiResponseSuccess | undefined;

// Helper functions
const determineCategory = (): 'Mobile Development' => {
  return 'Mobile Development';
};

const getCourseTags = (course: ApiCourse): string[] => {
  const tags: string[] = [];
  const content = (course.title + ' ' + course.description).toLowerCase();
  
  if (content.includes('flutter') || content.includes('dart')) {
    tags.push('Flutter', 'Dart', 'Mobile');
  }
  
  tags.push(course.level);
  return tags.length > 0 ? tags : ['Flutter', 'Mobile Development'];
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

const calculatePopularity = (course: ApiCourse): 'High' | 'Medium' | 'Low' => {
  if (course.usersLearn > 100 || course.courseRatings > 4.5) return 'High';
  if (course.usersLearn > 50 || course.courseRatings > 4.0) return 'Medium';
  return 'Low';
};

// Type guard to check if an item is a valid ApiCourse
const isValidCourse = (item: unknown): item is ApiCourse => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'title' in item &&
    'courseImageURL' in item &&
    'description' in item &&
    'price' in item
  );
};

// Type guards for API response
const isApiResponseSuccess = (data: unknown): data is ApiResponseSuccess => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    'courses' in data &&
    Array.isArray((data as ApiResponseSuccess).courses)
  );
};

const hasDataProperty = (data: unknown): data is { data: unknown } => {
  return typeof data === 'object' && data !== null && 'data' in data;
};

const hasCoursesProperty = (data: unknown): data is { courses: unknown } => {
  return typeof data === 'object' && data !== null && 'courses' in data;
};

const hasResultProperty = (data: unknown): data is { result: unknown } => {
  return typeof data === 'object' && data !== null && 'result' in data;
};

// Function to extract courses from API response
const extractCoursesFromResponse = (data: ApiResponse): ApiCourse[] => {
  if (!data) return [];
  
  if (Array.isArray(data)) {
    return data.filter(isValidCourse);
  }
  
  if (isApiResponseSuccess(data)) {
    return data.courses.filter(isValidCourse);
  }
  
  if (hasCoursesProperty(data) && Array.isArray(data.courses)) {
    return data.courses.filter(isValidCourse);
  }
  
  if (hasDataProperty(data) && Array.isArray(data.data)) {
    return data.data.filter(isValidCourse);
  }
  
  if (hasResultProperty(data) && Array.isArray(data.result)) {
    return data.result.filter(isValidCourse);
  }
  
  if (hasDataProperty(data) && typeof data.data === 'object' && data.data !== null) {
    const nestedData = data.data;
    
    if (hasCoursesProperty(nestedData) && Array.isArray(nestedData.courses)) {
      return nestedData.courses.filter(isValidCourse);
    }
    
    if (hasDataProperty(nestedData) && Array.isArray(nestedData.data)) {
      return nestedData.data.filter(isValidCourse);
    }
    
    if (hasResultProperty(nestedData) && Array.isArray(nestedData.result)) {
      return nestedData.result.filter(isValidCourse);
    }
  }
  
  return [];
};

// Professional Curriculum Data - 12 Weeks Total
const professionalCurriculum = [
  {
    section: "Foundation & Setup",
    icon: Terminal,
    duration: "2 weeks",
    items: [
      { icon: Code, text: "Complete Flutter & Dart environment setup", duration: "3h" },
      { icon: GitBranch, text: "Git & GitHub version control", duration: "2h" },
      { icon: Layers, text: "Flutter architecture & widget tree", duration: "3h" }
    ]
  },
  {
    section: "Core Development",
    icon: Palette,
    duration: "3 weeks",
    items: [
      { icon: Palette, text: "Widgets mastery - Stateless & Stateful", duration: "6h" },
      { icon: Database, text: "API integration & HTTP requests", duration: "5h" },
      { icon: BarChart3, text: "State management with Provider", duration: "8h" }
    ]
  },
  {
    section: "Backend Integration",
    icon: Cloud,
    duration: "2 weeks",
    items: [
      { icon: Cloud, text: "Firebase backend integration", duration: "7h" },
      { icon: Globe, text: "Third-party API integrations", duration: "5h" },
      { icon: Database, text: "RESTful services & data modeling", duration: "4h" }
    ]
  },
  {
    section: "Advanced Features",
    icon: Cpu,
    duration: "2 weeks",
    items: [
      { icon: Zap, text: "Animations & custom UI design", duration: "6h" },
      { icon: TestTube, text: "Testing strategies", duration: "4h" },
      { icon: Shield, text: "App security best practices", duration: "3h" }
    ]
  },
  {
    section: "AI Integration",
    icon: Bot,
    duration: "2 weeks",
    items: [
      { icon: Bot, text: "AI-powered features integration", duration: "5h" },
      { icon: MessageCircle, text: "AI chat & claim agents", duration: "6h" },
      { icon: Target, text: "Intelligent recommendation systems", duration: "4h" }
    ]
  },
  {
    section: "Production & Deployment",
    icon: Rocket,
    duration: "1 week",
    items: [
      { icon: Rocket, text: "App Store & Play Store deployment", duration: "6h" },
      { icon: Award, text: "Real-world projects", duration: "8h" },
      { icon: Server, text: "Performance optimization", duration: "3h" }
    ]
  }
];

// Professional Curriculum Component
const ProfessionalCurriculum = ({ courseId }: { courseId: string }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const collapseVariants: Variants = {
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="p-3 bg-gray-700 rounded-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpen className="w-6 h-6 text-gray-200" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">12-Week Curriculum</h2>
            <p className="text-gray-300 text-sm">Master Flutter with structured learning path</p>
          </div>
        </motion.div>
        
        {/* Progress Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { value: "12", label: "Weeks" },
            { value: "Weekly", label: "Test" },
            { value: "5", label: "Projects" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="p-6 max-h-[600px] overflow-y-auto">
        {professionalCurriculum.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={sectionIndex}
              className="mb-3 last:mb-0"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <motion.button
                onClick={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
                className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-200 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <motion.div 
                    className="p-2 bg-gray-200 rounded-lg text-gray-700"
                    whileHover={{ rotate: 5 }}
                  >
                    <SectionIcon className="w-5 h-5" />
                  </motion.div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {section.section}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {section.items.length} modules
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === sectionIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500 transition-colors flex-shrink-0" />
                </motion.div>
              </motion.button>
              
              <motion.div
                variants={collapseVariants}
                initial="closed"
                animate={expandedSection === sectionIndex ? "open" : "closed"}
                className="overflow-hidden"
              >
                <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: itemIndex * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white transition-colors group cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="p-1.5 bg-white rounded border border-gray-300 group-hover:border-gray-400 transition-colors flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                        >
                          <item.icon className="w-4 h-4 text-gray-700" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium group-hover:text-gray-900 transition-colors">
                            {item.text}
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Call to Action */}
        <motion.div 
          className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="font-semibold text-gray-900 mb-1">Ready to Start?</h4>
          <p className="text-gray-600 text-xs mb-3">
            Join 1000+ developers in this comprehensive program
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/courses/lessons/${courseId}`}
              className="inline-block px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-gray-900 hover:shadow-md transition-all duration-300"
            >
              Want to know more about course →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Course Card Component
const EnhancedCourseCard = ({ course, handleEnrollClick }: { course: UICourse, handleEnrollClick: (course: UICourse) => void }) => {
  

  

  

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      y: -8,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const imageVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
    >
      <div className="relative">
        <Link href={`/courses/lessons/${course.id}`}>
          <motion.div className="relative  overflow-hidden" variants={imageVariants}>
            <Image
              src={course.courseImageURL || '/api/placeholder/600/224'}
              width={400}
              height={400}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  to-transparent"></div>
            
            {/* Badges */}
            <motion.div 
              className="absolute top-4 left-4 flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
             
            </motion.div>
            
            

           
          </motion.div>
        </Link>
      </div>

      <div className="p-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-1 items-center bg-gray-100 px-2 py-1 rounded border border-gray-200">
            
            <Star className="w-3 h-3 fill-yellow-600 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">
              {course.courseRatings}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div 
              className="p-1.5 bg-gray-100 rounded border border-gray-200"
              whileHover={{ rotate: 5 }}
            >
             
            </motion.div>
            <Link
                                 href={`/courses/lessons/${course.id}`}
                                 className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 hover:gap-3 transition-all duration-300 group"
                               >
                                 Course Structure
                                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                               </Link>
            
          </div>
          
        </motion.div>

        {/* Course Info */}
        <motion.div 
          className="mb-4 flex justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
            {course.title}
          </h3>
          <p className='text-blue-400 text-lg'>{course.courseDuration}</p>
        </motion.div>

        

        

        

        {/* Pricing and CTA */}
        <motion.div 
          className="flex items-center justify-between pt-4 border-t border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{course.discountedPrice.toLocaleString()}
            </span>
            
          </div>
          <motion.button
            onClick={() => handleEnrollClick(course)}
            className="font-medium py-2.5 px-6 rounded-lg hover:shadow-sm transition-all duration-200 bg-blue-400 hover:bg-blue-900 text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={course.status !== 'live'}
          >
            {course.status === 'live' ? 'Enroll Now' : 
            course.status === 'coming_soon' ? 'Coming Soon' : 'Enrollment Closed'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ViewCourses() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: coursesData, isLoading, error } = useGetAllCoursesQuery();
  const router = useRouter();

  console.log("Raw courses data from API:", coursesData);

  // Transform the API data to match the component's needs
  const courses: UICourse[] = useMemo(() => {
    const extractedCourses = extractCoursesFromResponse(coursesData as ApiResponse);
    console.log("Extracted courses:", extractedCourses);

    if (extractedCourses.length === 0) {
      console.log("No valid courses found in the data");
      return [];
    }

    return extractedCourses.map((course: ApiCourse): UICourse => {
      const category = determineCategory();
      const tags = getCourseTags(course);
      const priceValue = parseFloat(course.price);
      const discountedPrice = isNaN(priceValue) ? 0 : priceValue;
      const originalPrice = calculateOriginalPrice(discountedPrice);
      const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);
      
      return {
        ...course,
        category,
        tags,
        originalPrice,
        discountedPrice,
        discountPercentage,
        programName: course.title,
        batchStatus: mapStatusToBatchStatus(course.status),
        instructor: { name: course.instructorName || 'Unknown Instructor' },
        totalSeats: course.totalSeat || 0,
        icon: '📱',
        bgGradient: 'from-gray-800 to-gray-600',
        popularity: calculatePopularity(course)
      };
    });
  }, [coursesData]);

  // Filter only Mobile Development courses
  const mobileDevelopmentCourses = useMemo(() => {
    return courses.filter(course => course.category === 'Mobile Development');
  }, [courses]);

  // Handle enrollment button click
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
        level: course.level
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
      transition: { 
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }
    }
  };



  

  // Loading state
  if (isLoading) {
    return (
      <section className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading professional courses...
          </motion.p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>Error loading courses. Please try again later.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Mobile className="w-4 h-4" />
            <span>Flutter Pro Program</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Mastery <motion.span 
              className="text-blue-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >In Mobile App Development</motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Master enterprise mobile development with our comprehensive 12-week Flutter program. 
            Build scalable, AI-powered applications.
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-gray-300 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Target, text: "Real Projects" },
              { icon: Bot, text: "AI Integration" },
              { icon: Award, text: "Career Focused" },
              { icon: Zap, text: "12 Weeks" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200"
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <feature.icon className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Professional Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { 
              icon: Smartphone, 
              value: mobileDevelopmentCourses.length.toString(), 
              label: "Professional Courses",
              delay: 0.1
            },
            { 
              icon: Users, 
              value: `5K+`, 
              label: "Developers Trained",
              delay: 0.2
            },
            { 
              icon: Star, 
              value: "4.9/5", 
              label: "Average Rating",
              delay: 0.3
            },
            { 
              icon: Zap, 
              value: "Weekly", 
              label: "Tests",
              delay: 0.4
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-3 bg-gray-100 rounded-xl border border-gray-300"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <stat.icon className="w-7 h-7 text-gray-700" />
                </motion.div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h4>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Courses Column */}
          <div className="xl:col-span-2">
            {mobileDevelopmentCourses.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {mobileDevelopmentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    custom={index}
                  >
                    <EnhancedCourseCard 
                      course={course} 
                      handleEnrollClick={handleEnrollClick} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16 bg-white rounded-3xl border border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-md mx-auto">
                  <motion.div 
                    className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Search className="w-10 h-10 text-gray-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No professional courses available
                  </h3>
                  <p className="text-gray-600">
                    Check back later for new professional mobile development courses.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Professional Curriculum Column */}
          <div className="xl:col-span-1">
            <ProfessionalCurriculum courseId={mobileDevelopmentCourses[0]?.id ?? ''} />
          </div>
        </div>
      </div>
    </section>
  );
}