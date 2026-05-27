// app/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
 title: "Flutter  Learning Structures ",
  description: "Reach out to Vereda Digital Learning for inquiries, support, or collaboration. Connect with our team, explore our tech education programs, and start your learning journey today.",
  keywords: [
     "Contact Vereda Digital Learning",
     "get in touch Vereda",
    "Vereda Digital Learning",
    "About Vereda",
    "tech education",
    "online learning platform",
    "digital learning",
    "career training",
    "skill development",
    "professional courses",
    "quality education",
    "accessible learning",
    "innovation in education",
    "student-centric training",
    "e-learning India",
    "Vereda mentors",
    "Vereda management team",
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
        <Navbar/>

        <main className="">{children}</main>

       
      </body>
    </html>
  );
}
