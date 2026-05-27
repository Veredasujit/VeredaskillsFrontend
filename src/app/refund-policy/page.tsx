export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Breadcrumb */}
        <nav className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-gray-200/60">
            <span className="text-blue-600 font-semibold text-lg">Refund Policy</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-500">Last updated: Oct 3, 2025</span>
          </div>
        </nav>

        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 px-8 py-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Refund Policy
              </h1>
              <p className="text-blue-200 text-lg leading-relaxed">
                When you make purchases on our platform, you agree to and must accept this refund policy.
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-8 py-12 space-y-12">
            {/* Warning Section */}
            <section className="group">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    All Sales Are Final
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Please read this section carefully before making any purchase.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-xl p-6 transform hover:scale-[1.02] transition-all duration-300 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-red-800 font-semibold text-lg">
                    We do not offer refunds under any circumstances
                  </p>
                </div>
              </div>
            </section>

            {/* No Returns Section */}
            <section className="group">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    No Returns or Exchanges
                  </h2>
                  <p className="text-gray-600">
                    Understanding our digital service policy
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    As we provide digital services and products, returns and exchanges do not apply. 
                    We do not offer any kind of returns or exchanges once a purchase is completed.
                  </p>
                </div>

                {/* Important Notes */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="font-bold text-gray-900 text-lg">Important Notes</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "All purchases are considered final at the moment of transaction completion",
                      "Digital products, courses, and services cannot be returned or exchanged",
                      "Subscription fees and one-time payments are non-refundable",
                      "No exceptions will be made to this policy under any circumstances",
                      "Chargebacks or disputes may result in account suspension"
                    ].map((note, index) => (
                      <li key={index} className="flex items-start space-x-3 group/item">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Support Section */}
            <section className="group">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-900 mb-1">
                        Need Clarification?
                      </h3>
                      <p className="text-blue-700">
                        We&quot;re here to help you understand our policies better
                      </p>
                    </div>
                  </div>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <span>Contact Support</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200/60 bg-gray-50/50 px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-600 text-sm">
                © 2025 Vereda Digital Learning. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <a href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Privacy Policy
                </a>
                <a href="/contact" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}