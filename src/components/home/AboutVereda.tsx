import Image from "next/image";
import Link from "next/link";

export default function AboutVereda() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
              About Our Academy
            </span>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
          <h1 className="text-3xl lg:text-3xl font-bold  mb-6 text-gray-900  bg-clip-text ">
                          ABOUT   <span className="text-blue-600">VEREDA</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Enhanced Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative">
              <Image
                src="/images/home1.webp" 
                alt="About Vereda"
                height={200}
                width={200}
                className="w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 transform group-hover:scale-105 transition duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Content */}
          <div className="space-y-8">
            {/* Main Content Card */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <div className="pl-8">
                <p className="text-2xl font-bold text-blue-600 mb-4 leading-tight">
                  Good Qualification Services And<br />Better Skills
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Vereda Digital Technologies Private Limited is an emerging bootcamp provider
                  that enables learners through rigorous and highly specialized training. Our aim
                  is to revolutionise tech education in India. We believe in outcomes and skills
                  over degrees and Certificates.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6">
              {/* Feature 1 */}
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-blue-200/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Skilled Instructors</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our instructors are provided with cutting-edge tools and continuous training 
                      to ensure exceptional education delivery and student success.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-purple-200/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                    <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate & Career Support</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Earn industry-recognized certificates and unlock comprehensive career support 
                      including resume reviews, interview prep, and job placement assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-indigo-200/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
                    <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Online Learning</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Study at your own pace with our fully online platform, designed for maximum 
                      flexibility without compromising on learning quality or peer interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/login">
              <button className="group cursor-pointer relative bg-gradient-to-r from-blue-300 to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Start Your Journey Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}