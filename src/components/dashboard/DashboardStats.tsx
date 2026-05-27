import React from 'react';
import { motion,Variants } from 'framer-motion';
import { UserStats } from '../../types/index';

interface DashboardStatsProps {
  stats: UserStats;
}

interface StatCard {
  title: string;
  value: string;
  subtitle?: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards: StatCard[] = [
    {
      title: 'Total Courses',
      value: stats.totalCourses.toString(),
      subtitle: 'Enrolled',
      color: 'blue',

    },
    {
      title: 'Total Payment',
      value: stats.totalPayments.toString(),
      subtitle: 'payment',
      color: 'blue',
     
    },
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-gradient-to-tr from-blue-50 to-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
      },
      green: {
        bg: 'bg-gradient-to-tr from-green-50 to-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
      },
      purple: {
        bg: 'bg-gradient-to-tr from-purple-50 to-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
      },
      orange: {
        bg: 'bg-gradient-to-tr from-orange-50 to-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
      },
      red: {
        bg: 'bg-gradient-to-tr from-red-50 to-red-100',
        text: 'text-red-600',
        border: 'border-red-200',
      },
    };

    return colors[color as keyof typeof colors]?.[type] || colors.blue[type];
  };

  const TrendIndicator: React.FC<{ trend: { value: number; isPositive: boolean } }> = ({ trend }) => (
    <div
      className={`flex items-center gap-1 text-xs font-medium ${
        trend.isPositive ? 'text-green-600' : 'text-red-600'
      }`}
    >
      <span className="text-[10px]">{trend.isPositive ? '▲' : '▼'}</span>
      <span>{trend.value}%</span>
    </div>
  );

  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8, // Slower animation
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Slower animation
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5, // Slower exit animation
        ease: "easeIn"
      }
    }
  };

  const hoverVariants:Variants = {
    rest: {
      y: 0,
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
    },
    hover: {
      y: -4,
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      transition: {
        duration: 0.4, // Slower hover animation
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          
          className="relative bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-500" // Slower transition
        >
          <motion.div
    variants={hoverVariants}
    initial="rest"
    whileHover="hover"
    animate="rest"
    className="flex flex-col h-full"
  >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-gray-700 tracking-tight">
                  {stat.title}
                </p>
                {stat.trend && <TrendIndicator trend={stat.trend} />}
              </div>
              <motion.p 
                className="text-3xl font-bold text-gray-900 leading-snug"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.7, // Slower number animation
                  delay: 0.2 
                }}
              >
                {stat.value}
              </motion.p>
              {stat.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
              )}
            </div>
          </div>

          {/* Bottom subtle accent bar */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 w-full rounded-b-2xl ${getColorClasses(
              stat.color,
              'bg'
            )} opacity-70`}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 0.9, // Slower bar animation
              delay: 0.3,
              ease: "easeOut"
            }}
          />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;