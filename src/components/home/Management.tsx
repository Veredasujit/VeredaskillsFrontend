"use client";
import Image from "next/image";
import { Award, Users2, Sparkle, Stars } from "lucide-react";

export default function Management() {
  const teamMembers = [
    {
      name: "Himanshu Kumar",
      role: "Founder",
      qualification: "9+ Years Experience",
      image: "/images/Pictures-2.png",
      description:
        "With over 9 years of hands-on experience in product development, training, team leadership, and entrepreneurship, Himanshu leads with a clear vision—making high-quality tech education accessible and outcome-driven. His expertise spans mobile development, UI/UX, system architecture, and guiding students to real career breakthroughs.",
    },
    {
      name: "Hermant Kumar",
      role: "Co-Founder",
      qualification: "9+ Years Experience",
      image: "/images/Hermant-kumar.webp",
      description:
        "Hermant brings 9+ years of professional experience in operations, management, and technology scaling. He specializes in structured learning systems, team mentoring, and shaping the curriculum delivery model. His leadership ensures every learner receives world-class support and real industry readiness.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-gray-50 overflow-hidden">
      
      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-200/30 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ==== SECTION HEADER ==== */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/60 rounded-full shadow-sm backdrop-blur-md">
            <Stars className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase">
              Featured
            </span>
          </span>

          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mt-6">
            Our Leadership <span className="text-blue-600">Team</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-3">
            Experienced. Visionary. Student-Driven.  
            Meet the people shaping the future of tech learning.
          </p>
        </div>

        {/* ==== TEAM CARDS ==== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="
                group relative overflow-hidden
                bg-white/60 backdrop-blur-xl border border-gray-200
                rounded-3xl p-10 shadow-lg
                hover:shadow-[0px_20px_50px_rgba(0,110,255,0.20)]
                hover:border-blue-300
                transition-all duration-700 ease-out
              "
            >
              {/* Background Hover Image */}
              <div
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-40
                  transition-all duration-700
                "
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover scale-125 group-hover:scale-110 blur-sm transition-all duration-700"
                />
              </div>

              {/* Blue Shine Overlay */}
              <div
                className="
                  absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-blue-600/15 
                  opacity-0 group-hover:opacity-100 transition-all duration-700
                "
              ></div>

              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl"></div>

              {/* Profile Image */}
              <div className="flex justify-center mb-8 relative">
                <div className="relative w-40 h-40 group-hover:scale-110 transition-all duration-700">
                  <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="
                          object-cover
                          group-hover:scale-125
                          transition-all duration-700
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name */}
              <h4 className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-all duration-500 text-center">
                {member.name}
              </h4>

              {/* Role */}
              <div className="flex justify-center items-center gap-2 mt-3 text-gray-700 text-lg">
                <Award className="w-5 h-5 text-blue-600" />
                <span>{member.role}</span>
                <span className="text-gray-500">• {member.qualification}</span>
              </div>

              {/* Extra Description */}
              <p
                className="
                  text-gray-600 mt-5 text-center leading-relaxed
                  group-hover:text-gray-800
                  transition-all duration-700
                "
              >
                {member.description}
              </p>

              {/* Bottom Animated Accent Line */}
              <div
                className="
                  absolute bottom-0 left-0 w-full h-[3px]
                  bg-gradient-to-r from-blue-500 to-purple-600
                  scale-x-0 group-hover:scale-x-100
                  transition-transform duration-700
                "
              ></div>
            </div>
          ))}
        </div>

        {/* ==== EXTRA BENEFITS ==== */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
            <Sparkle className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold uppercase">
              Why Our Leadership Stands Out
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg mt-4">
            <li className="flex items-center gap-3">
              <Users2 className="w-6 h-6 text-blue-600" />  
              Over a decade of strong industry presence
            </li>
            <li className="flex items-center gap-3">
              <Stars className="w-6 h-6 text-blue-600" />  
              Innovation-driven learning methodology  
            </li>
            <li className="flex items-center gap-3">
              <Award className="w-6 h-6 text-blue-600" />  
              Recognized by major media outlets  
            </li>
            <li className="flex items-center gap-3">
              <Sparkle className="w-6 h-6 text-blue-600" />  
              Student-first, outcome-focused approach  
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
