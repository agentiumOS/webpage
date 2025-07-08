import { RetroGrid } from "@/components/ui/retro-grid";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-slate-50 w-full text-center flex flex-col items-center justify-center">
      <RetroGrid className="absolute inset-0 opacity-30" />
      <div className="relative z-10 flex flex-col gap-5 pt-[30px] pb-[150px] max-w-5xl mx-auto items-center">
        <div className="inline-flex items-center px-4 py-2 bg-white border border-blue-200 rounded-full shadow-lg backdrop-blur-sm">
          <span className="text-sm font-medium text-blue-500">
            100% Calls Analysed in Minutes
          </span>
        </div>

        <h1 className="text-xl md:text-5xl font-[800] text-gray-590 tracking-[-1px] leading-relaxed mt-5">
          Call Quality Audits & Training Made Simple
        </h1>
        <p className="md:text-xl text-lg font-serif text-gray-500 font-[450]">
          Instantly measure how well your team is responding to customers using AI
        </p>

        <div className="flex items-center gap-4 mt-3">
          <button className="p-2 px-5 bg-slate-50 text-black text-sm border border-gray-200 rounded-full font-medium transition-all flex items-center gap-2">
              How it works <ArrowDownIcon className="w-4 h-4" />
          </button>
          <button className="p-2 px-5 bg-black text-white text-sm rounded-full font-medium transition-all flex items-center gap-2">
            Schedule a Demo
            <ArrowTopRightIcon />
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="font-medium">Real-time 100% Call Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
            <span className="font-medium">Custom Tailored for You</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            <span className="font-medium">Zero Platform Cost</span>
          </div>
        </div>
      </div>
      
    </section>
  );
}       