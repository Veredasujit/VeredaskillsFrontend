// app/dashboard/layout.tsx
"use client";

import React, { ReactNode, useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";




interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardClientLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner while redirecting
  }
      // console.log("u img ",userData)

  return (
    
    <div className="bg-gray-50 min-h-screen flex flex-col">
     

      <DashboardNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DashboardClientLayout;
