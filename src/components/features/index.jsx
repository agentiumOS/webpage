import { Phone, Settings, FileText, GraduationCap, Globe, BarChart3 } from 'lucide-react'

export default function Features() {
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

      <div className="relative z-10 mt-20 max-w-7xl mx-auto py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-gray-200">
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left border-r border-b border-gray-200">
            <Phone className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-blue-600 transition-colors">100% Call Coverage</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Monitor and analyze every customer call without missing a single interaction or conversation.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left border-r border-b border-gray-200">
            <Settings className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-purple-600 transition-colors">Personalized Parameters</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Get analysis across your customized parameters tailored to your specific business needs and requirements.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left border-r border-b border-gray-200">
            <FileText className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-green-600 transition-colors">Detailed Call Analytics</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Access comprehensive call transcripts, summaries, defect analysis, emotion detection, and intent analytics.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left border-r border-b border-gray-200">
            <GraduationCap className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-amber-600 transition-colors">Automated Trainings</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Streamline your training process with automated programs designed to improve team performance.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left border-r border-b border-gray-200">
            <Globe className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-red-600 transition-colors">Multilingual Support</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Support customers in multiple languages with comprehensive multilingual analysis capabilities.</p>
          </div>
          <div className="bg-white aspect-[4/2.5] w-full p-10 flex flex-col gap-2 items-start text-left border-r border-b border-gray-200">
            <BarChart3 className="w-12 h-12 text-gray-600 mb-4" strokeWidth={1.2} />
            <h3 className="text-xl font-semibold mt-1 hover:text-indigo-600 transition-colors">Comprehensive Tracking</h3>
            <p className="text-gray-600 hover:text-gray-900 transition-colors">Track key metrics, manage training calendars, and monitor attendance all in one unified platform.</p>
          </div>
        </div>
      </div>

      {/* full width section talking about pricing */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 items-center">
          <h2 className="text-4xl font-bold text-center">Unlimited Calls, Unlimited Insights For Free</h2>
          <h6 className="text-gray-500 md:text-3xl text-md">
            You only pay for the AI, direct to Google.
          </h6>
        </div>
      </section>
      
      {/* get started under 1 min */}
      <section className="w-full bg-gradient-to-r from-slate-50 to-white py-20 border border-gray-200 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 items-center">
          <h2 className="text-4xl font-bold text-center">Get Started In Under 1 Minute</h2>
          <h6 className="text-gray-500 md:text-3xl text-md">
            No credit card required.
          </h6>
        </div>
      </section>
    </section>
  )
}