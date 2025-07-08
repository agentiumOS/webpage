import { cn } from "@/lib/utils";
import { IconBrain } from "@tabler/icons-react";

// Upside-down RetroGrid component for footer
function UpsideDownRetroGrid({
  className,
  angle = -20,
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute w-full h-full overflow-hidden opacity-30 [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` }}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_100%_0] [width:600vw]",
            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",
            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient - flipped for footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-90% dark:from-black" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 w-full text-center flex flex-col items-center justify-center mt-10">
      <UpsideDownRetroGrid className="absolute inset-0 opacity-30" />
      <div className="relative z-10 flex flex-col gap-4 py-16 max-w-4xl mx-auto items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex-shrink-0 flex items-center  px-4">
          <a href="/" className="flex items-center space-x-2">
            <IconBrain size={24} />
            <span className="text-xl font-bold">
              xhip.AI
            </span>
          </a>
        </div>
          <p className="text-sm text-gray-500 max-w-md">
            AI-Powered Solutions for All Business Needs
          </p>
        </div>
        
        {/* <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Contact
          </a>
        </div> */}
        
        <div className="text-xs text-gray-400 mt-2">
          © 2024 XHIP AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 