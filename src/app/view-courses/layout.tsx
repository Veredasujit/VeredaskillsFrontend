// app/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import { Metadata } from "next";
import React from "react";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
 title: "AI & ML and Flutter Courses | Vereda Digital Learning",
  description:
    "Explore Vereda Digital Learning’s expert-led AI & Machine Learning and Flutter development courses. Master real-world skills, build innovative projects, and accelerate your tech career with hands-on, mentor-guided training.",
  keywords: [
    "Vereda Digital Learning",
    "AI and ML course",
    "Artificial Intelligence course",
    "Machine Learning course",
    "Flutter course",
    "Flutter development",
    "mobile app development",
    "deep learning",
    "data science",
    "Python AI",
    "neural networks",
    "TensorFlow training",
    "React Native vs Flutter",
    "online AI courses",
    "online Flutter courses",
    "tech education",
    "career training",
    "professional certification",
    "skill-based learning",
    "e-learning India",
  ],
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add custom meta tags or scripts here */}
      </head>
      <body >
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar/>

        <main className="">{children}</main>

       
      </body>
    </html>
  );
}
