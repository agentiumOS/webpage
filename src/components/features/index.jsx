import { Phone, Settings, FileText, GraduationCap, Globe, BarChart3 } from 'lucide-react'

// Main Features Component
export default function Features() {
  return (
    <>
      <FeaturesSection />
      <PricingSection />
      <GetStartedSection />
    </>
  )
}

// Features Section Component
function FeaturesSection() {
  return (
    <section className="relative w-full text-center flex flex-col items-center justify-center -mt-10 gap-0 -top-10">
      <div className="relative z-10 flex flex-col gap-4 max-w-4xl mx-auto items-center">
        <h2 className="md:text-5xl text-2xl font-[650] text-gray-590 tracking-[-1px]">
          Know how you&apos;re responding to calls
        </h2>
        <h6 className="text-gray-500 md:text-3xl text-md">
          and improve them based on the insights.
        </h6>
      </div>

      <div className="relative z-10 mt-20 max-w-7xl mx-auto py-0 flex flex-col gap-8 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left">
            <Phone className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-blue-600 transition-colors">100% Call Coverage</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Monitor and analyze every customer call without missing a single interaction or conversation.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left">
            <Settings className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-purple-600 transition-colors">Personalized Parameters</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Get analysis across your customized parameters tailored to your specific business needs and requirements.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left">
            <FileText className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-green-600 transition-colors">Detailed Call Analytics</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Access comprehensive call transcripts, summaries, defect analysis, emotion detection, and intent analytics.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left">
            <GraduationCap className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-amber-600 transition-colors">Automated Trainings</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Streamline your training process with automated programs designed to improve team performance.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left">
            <Globe className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-red-600 transition-colors">Multilingual Support</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Support customers in multiple languages with comprehensive multilingual analysis capabilities.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left">
            <BarChart3 className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-indigo-600 transition-colors">Comprehensive Tracking</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Track key metrics, manage training calendars, and monitor attendance all in one unified platform.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
// Pricing Section Component
function PricingSection() {
  return (
    <section className="w-full bg-gray-50 py-20 mt-20 relative overflow-hidden">
      {/* Background gradient with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-[-1px]">
              Pay only for AI usage,
              <span className="text-gray-600 block mt-1">everything else is free</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              No platform fees, no hidden costs. Just transparent AI pricing that scales with your usage.
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Powered by Gemini 2.5 Flash - analyze a 3-minute call for just ~5¢. More AI models coming soon.
              </p>
              
              <p className="text-gray-700">
                Start instantly with your Google Cloud key. Pay Google directly - no middleman markup.
              </p>
            </div>
          </div>
          
          {/* Right side - Graphic/Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Transparent Pricing</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">3-minute call analysis</span>
                    <span className="font-semibold text-gray-900">~$0.05</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Platform & features</span>
                    <span className="font-semibold text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Setup & support</span>
                    <span className="font-semibold text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-3">
                    <span className="font-semibold text-gray-900">You pay Google directly</span>
                    <span className="font-bold text-blue-600">AI only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Get Started Section Component
function GetStartedSection() {
  return (
    <section className="w-full bg-gradient-to-r from-slate-50 to-white py-20 mt-10 border border-gray-200 rounded-lg shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 items-center">
        <h2 className="text-4xl font-bold text-center">Get Started In Under 1 Minute</h2>
        <h6 className="text-gray-500 md:text-3xl text-md">
          No credit card required.
        </h6>
      </div>
    </section>
  )
}
