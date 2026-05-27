"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, LogOut, User, Settings, BookOpen } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import Link from "next/link";
import { useLogoutMutation } from "../../Redux/api/authApi";
import { useDispatch } from "react-redux";
import { logout as logoutSlice } from "../../Redux/slices/authSlice";
import { useRouter } from "next/navigation";

interface DashboardNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.auth.user);
  // console.log("user data are ",userData)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fix hydration by only rendering client-side content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch(logoutSlice());
      router.push("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe user data with fallbacks to prevent hydration mismatches
  const safeUserData = {
    name: userData?.name || 'User',
    email: userData?.email || '',
    profileURL: userData?.profileURL || '',
    role: userData?.role || 'Student'
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/80 fixed w-full z-50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left section: Brand + Mobile Toggle */}
        <div className="flex items-center space-x-4">
  {/* 📱 Mobile Sidebar Toggle */}
  <button
    onClick={onToggleSidebar}
    className="lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-white/70 to-white/40 
               backdrop-blur-md hover:from-white/90 hover:to-white/70
               transition-all duration-300 border border-gray-200/60 shadow-sm 
               hover:shadow-lg active:scale-95"
    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
  >
    {isSidebarOpen ? (
      <X className="w-5 h-5 text-gray-700 transition-transform duration-300" />
    ) : (
      <Menu className="w-5 h-5 text-gray-700 transition-transform duration-300" />
    )}
  </button>

  {/* 🌐 Logo / Brand */}
  <Link href="/" className="flex items-center space-x-3 group relative">
    {/* 🌀 Circular Logo with Glow */}
    <div
      className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-50/80 via-white/70 to-purple-50/80
                 flex items-center justify-center border border-white/60 shadow-[0_3px_12px_rgba(0,0,0,0.05)]
                 backdrop-blur-md overflow-hidden
                 transition-all duration-500 group-hover:scale-[1.06] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] relative"
    >
      <Image
        src="https://www.vereda.co.in/images/logo.png"
        alt="Vereda Logo"
        width={30}
        height={30}
        className="w-7 h-7 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110"
      />
      {/* 🌈 Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/40 via-purple-100/40 to-transparent opacity-0 group-hover:opacity-80 blur-2xl transition-opacity duration-700"></div>
    </div>

    {/* 🪶 Brand Typography */}
    <div className="flex flex-col leading-tight select-none">
      <div className="flex items-baseline">
        <span
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 
                     bg-clip-text text-transparent tracking-tight
                     drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]
                     transition-all duration-500 group-hover:from-blue-700 group-hover:to-purple-600"
        >
          V
        </span>
        <span
          className="text-xl font-semibold text-gray-700 tracking-tight 
                     transition-all duration-500 group-hover:text-gray-900"
        >
          ereda
        </span>
      </div>
      <span
        className="text-[0.8rem] font-medium tracking-wide text-gray-500 
                   transition-all duration-500 group-hover:text-blue-600"
      >
        Technologies
      </span>
    </div>
  </Link>
</div>


        {/* Right section: User profile + notifications */}
        <div className="flex items-center space-x-3">
         

          {/* User Profile Dropdown - Modern Design */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-50/80 transition-all duration-200 border border-transparent hover:border-gray-200/60 group"
              aria-label="User menu"
              aria-expanded={isDropdownOpen}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200/60 flex items-center justify-center overflow-hidden shadow-sm">
                {safeUserData.profileURL && isMounted ? (
                  <Image
                    src={safeUserData.profileURL}
                    alt={safeUserData.name}
                    width={36}
                    height={36}
                    className="object-cover rounded-xl"
                    priority
                  />
                ) : (
                  <span className="text-gray-600 font-semibold text-sm">
                    {safeUserData.name[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {safeUserData.name}
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  {safeUserData.role}
                </p>
              </div>

              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Enhanced Dropdown Menu - Only render when mounted to avoid hydration mismatch */}
            {isMounted && isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-100/60">
                  <p className="font-semibold text-gray-800 text-sm">{safeUserData.name}</p>
                  <p className="text-sm text-gray-500 truncate">{safeUserData.email}</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-all duration-150 group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-all duration-150 group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <Settings className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Profile Settings</span>
                  </Link>

                  <Link
                    href="/dashboard/courses"
                    className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-all duration-150 group"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                    </div>
                    <span>My Courses</span>
                  </Link>
                </div>

                {/* Logout Section */}
                <div className="border-t border-gray-100/60 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/80 transition-all duration-150 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background overlay when dropdown is open - Only render when mounted */}
      {isMounted && isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black/5 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default DashboardNavbar;

