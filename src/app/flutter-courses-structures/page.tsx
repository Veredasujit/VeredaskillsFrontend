"use client";

import { useState } from "react";
import { ChevronDown, FileText, Download, Video, CheckCircle, PlayCircle, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

interface Lecture {
  title: string;
  duration: string;
  isPreview?: boolean;
}

interface Section {
  title: string;
  lectures: Lecture[];
  totalLectures: number;
  totalDuration: string;
  progress?: number;
}

const courseIncludes = [
  { icon: Video, text: "30 hours on-demand video", color: "text-blue-500" },
  { icon: FileText, text: "Assignments", color: "text-green-500" },
  { icon: Download, text: "43 downloadable resources", color: "text-purple-500" },
  { icon: CheckCircle, text: "Certificate of completion", color: "text-emerald-500" },
  { icon: FileText, text: "23 articles", color: "text-orange-500" },
];

const sections: Section[] = [
  {
    title: "Introduction",
    totalLectures: 13,
    totalDuration: "1hr 7min",
    progress: 0,
    lectures: [
      { title: "Welcome to the course", duration: "4m", isPreview: false },
      { title: "Setting up environment", duration: "10m", isPreview: false},
      { title: "Your first Flutter app", duration: "15m" },
    ],
  },
  {
    title: "Flutter & Dart Basics I - Getting a Solid Foundation [ROLL DICE APP]",
    totalLectures: 39,
    totalDuration: "3hr 27min",
    progress:0,
    lectures: [
      { title: "Understanding Widgets", duration: "10m" },
      { title: "Building the UI", duration: "20m", isPreview: false },
    ],
  },
  {
    title: "Flutter & Dart Basics II - Getting a Solid Foundation [ROLL DICE APP]",
    totalLectures: 39,
    totalDuration: "3hr 27min",
    progress:0,
    lectures: [
      { title: "Understanding Widgets", duration: "10m" },
      { title: "Building the UI", duration: "20m", isPreview: false },
    ],
  },
  {
    title: "Debugging Flutter Apps",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },
  {
    title: "Adding Interactivity, More Widgets & Theming",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },
  {
    title: "Building Responsive & Adaptive User Interfaces",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },
  {
    title: "Flutter & Dart Internals",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },
  {
    title: "Building Multi-Screen Apps & Navigating Between Screens",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },{
    title: "Managing App-wide State",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },
  {
    title: "Adding Animations",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },{
    title: "Handling User Input & Working with Forms",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },{
    title: "Connecting a Backend & Sending HTTP Requests",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },{
    title: "Using Native Device Features",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },{
    title: "Push Notifications & More:Building a Chat App with Flutter & Firebase",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  },
  {
    title: "Next Steps & Roundup",
    totalLectures: 6,
    totalDuration: "33min",
    progress: 0,
    lectures: [
      { title: "Common Debugging Tools", duration: "10m" },
      { title: "Using DevTools", duration: "23m" },
    ],
  }
];

export default function FlutterCourseDetail() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const totalLectures = sections.reduce((sum, s) => sum + s.totalLectures, 0);
  const totalDuration = "30h";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Development • Flutter
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Flutter & Dart - The Complete Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Build native mobile apps for iOS and Android using Flutter and Dart. 
            From zero to hero with hands-on projects and real-world examples.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Includes Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                What&apos;s included in this course
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {courseIncludes.map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-gray-700 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Course Content
                    </h2>
                    <p className="text-gray-600 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        {totalLectures} lectures
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {totalDuration}
                      </span>
                    </p>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                    {sections.length} sections
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {sections.map((section, idx) => {
                  const isOpen = openSection === idx;
                  return (
                    <div key={idx} className="transition-all duration-200 hover:bg-gray-50">
                      <button
                        className="w-full flex justify-between items-start p-6 text-left"
                        onClick={() => setOpenSection(isOpen ? null : idx)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg pr-2">
                              {section.title}
                            </h3>
                            {section.progress === 100 && (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{section.totalLectures} lectures</span>
                            <span>•</span>
                            <span>{section.totalDuration}</span>
                            {section.progress !== undefined && section.progress > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-blue-600 font-medium">
                                  {section.progress}% complete
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          {section.progress !== undefined && section.progress > 0 && (
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${section.progress}%` }}
                              />
                            </div>
                          )}
                          <div className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                            {section.lectures.map((lec, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-white transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-blue-100 transition-colors">
                                    <PlayCircle className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                                  </div>
                                  <span className="text-gray-700 font-medium">{lec.title}</span>
                                  {lec.isPreview && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                      Preview
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-gray-500 text-sm">{lec.duration}</span>
                                  {lec.isPreview && (
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                      Play
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Course Info & Actions */}
          <div className="space-y-8">
            {/* Course Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                 
                  
                </div>
                
                <Link href='/view-courses' className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors mb-4">
                  Enroll Now
                </Link>
            
                
                
              </div>
              
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">Beginner to Advanced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">December 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            {/* Instructor Card */}
            {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Developer</h4>
                  <p className="text-gray-600 text-sm">Flutter Expert & Mobile Developer</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-gray-500 text-sm">4.9/5</span>
                  </div>
                </div>
              </div>
            </div> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}