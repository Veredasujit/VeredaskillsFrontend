"use client";
import { useState } from "react";
import { FileCheck, FileDown } from "lucide-react";
import Image from "next/image";

export default function CertificateSection() {
  // Mock user progress: In real you get this from API, Redux, DB etc.
  const [completedAssignments] = useState(0); // Change to test
    
  // const totalAssignments = 8;

  const isEligible = completedAssignments >= 7;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/certificate002.png";   // Your certificate file (public folder)
    link.download = "/images/certificate002.png";
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Course Certificate
      </h2>

      {/* Progress Display */}
      <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
        <p className=" text-gray-700 text-lg ">
          Complete Your Assignments to Unlock Your <span className="text-blue-500">Certificate</span> 
        </p>
        {/* <p className="text-gray-700 text-lg">
          Completed Assignments:{" "}
          <span className="font-semibold">
            {completedAssignments}/{totalAssignments}
          </span>
        </p> */}

        {/* Progress Bar
        <div className="w-full bg-gray-300 h-3 mt-3 rounded-full">
          <div
            className={`h-3 rounded-full ${
              isEligible ? "bg-green-600" : "bg-blue-600"
            }`}
            style={{
              width: `${(completedAssignments / totalAssignments) * 100}%`,
            }}
          ></div>
        </div> */}
      </div>

      {/* Certificate Section */}
      {isEligible ? (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FileCheck className="text-green-600" /> Certificate Available
          </h3>

          <p className="text-gray-600 mt-2">
            Congratulations! You have completed enough assignments to download
            your certificate.
          </p>

          {/* Certificate Preview */}
          <div className="mt-5 border rounded-xl overflow-hidden shadow">
            <Image
            width={300}
            height={400}
               src="/images/certificate002.png"
              alt="Certificate Preview"
              className="w-full"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 mt-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            <FileDown size={20} />
            Download Certificate
          </button>
        </div>
      ) : (
        <div className="mt-8 bg-yellow-100 border border-yellow-300 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-800">
            Complete more assignments!
          </h3>
          <p className="text-yellow-700 text-sm mt-1">
            You must complete at least <strong>7 out of 8</strong> assignments
            to unlock your certificate.
          </p>
           {/* Certificate Preview */}
          <div className="mt-5 border rounded-xl overflow-hidden shadow">
            <Image
            width={300}
            height={400}
               src="/images/certificate002.png"
              alt="Certificate Preview"
              className="w-full"
            />
          </div>

        </div>
      )}
    </div>
  );
}
