import { Phone, Settings, FileText, GraduationCap, Globe, BarChart3, ArrowUpRightIcon } from 'lucide-react'
import step1PNG from '@/assets/step-1.png'
import step2PNG from '@/assets/step-2.png'
import step3PNG from '@/assets/step-3.png'

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
    <section className="w-full bg-gray-50 py-12 md:py-20 mt-12 md:mt-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background gradient with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-[-1px]">
              Everything else is free,
              <span className="text-gray-600 block mt-1">pay only for AI usage</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              No platform fees, no hidden costs. Just transparent AI pricing that scales with your usage.
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-blue-200">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Powered by Gemini 2.5 Flash [ ~$0.05 per 3 minute call ]
              </div>
              
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Start instantly with GCP key, pay Google directly
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-600 px-2 font-[400]">
                <p>* More AI models coming soon.</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Graphic/Visual */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full border border-gray-200">
              <div className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Transparent Pricing</h3>
                </div>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">3-minute call analysis</span>
                    <span className="text-sm md:text-base font-semibold text-gray-900">~$0.05</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Platform & features</span>
                    <span className="text-sm md:text-base font-semibold text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Setup & support</span>
                    <span className="text-sm md:text-base font-semibold text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 md:py-3 bg-gray-50 rounded-lg px-3">
                    <span className="text-sm md:text-base font-semibold text-gray-900">You pay Google directly</span>
                    <span className="text-sm md:text-base font-bold text-blue-600">AI only</span>
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
    <section className="w-full py-16 pb-5 mt-5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Get started in <span className="text-orange-600">&lt;1 minute</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start analyzing your calls in 3 simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-bl from-slate-100 to-transparent p-0 h-full text-left py-8 rounded-lg relative overflow-hidden">
              {/* Grid pattern covering whole box */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <defs>
                    <pattern id="grid1" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#ffffff" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid1)" />
                </svg>
              </div>

              <div className="flex flex-row gap-2 px-4 relative z-10">
                <span className="w-10 h-10 text-gray-400 rounded-full flex items-start justify-center text-xl font-bold">
                  1
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">Add your Exotel API Key & Google Gemini API Key</h3>
                  <p className="text-gray-600">You start seeing analysis of your calls</p>
                </div>
              </div>
              <img src={step1PNG} alt="Step 1" className="w-full mt-5 relative z-10" />
            </div>

            <div className="bg-gradient-to-bl from-slate-100 to-transparent p-0 text-left h-full py-8 rounded-lg relative overflow-hidden">
              {/* Grid pattern covering whole box */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <defs>
                    <pattern id="grid1" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#ffffff" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid1)" />
                </svg>
              </div>

              <div className="flex flex-row gap-2 px-4 relative z-10">
                <span className="w-10 h-10 text-gray-400 rounded-full flex items-start justify-center text-xl font-bold">
                  2
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">Add your team members & agents details</h3>
                  <p className="text-gray-600">Invite your team to start monitoring their calls</p>
                </div>
              </div>
              <img src={step2PNG} alt="Step 2" className="w-full mt-5 relative z-10" />
            </div>

            <div className="bg-gradient-to-bl from-slate-100 to-transparent p-0 text-left h-full py-8 rounded-lg relative overflow-hidden">
              {/* Grid pattern covering whole box */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <defs>
                    <pattern id="grid3" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#ffffff" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid3)" />
                </svg>
              </div>

              <div className="flex flex-row gap-2 px-4 relative z-10">
                <span className="w-10 h-10 text-gray-400 rounded-full flex items-start justify-center text-xl font-bold">
                  3
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">Setup One-Time or Recurring Auto Trainings</h3>
                  <p className="text-gray-600">LISA automatically sends training invites when someone makes a mistake</p>
                </div>
              </div>
              <img src={step3PNG} alt="Step 3" className="w-full mt-5 relative z-10" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col justify-center mx-auto items-center gap-5">
            <h2 className="text-2xl md:text-3xl font-[400] text-gray-900 tracking-tight mb-5">
              That&apos;s it. <span className="text-gray-300">Start tracking all defects and improve your team&apos;s performance</span>
            </h2>
            <button className="p-2 px-5 bg-black text-white text-sm rounded-full font-medium transition-all flex items-center gap-2 w-max mx-auto">
              Schedule a Demo
              <ArrowUpRightIcon />
            </button>
          </div>
      </div>
    </section>
  )
}
