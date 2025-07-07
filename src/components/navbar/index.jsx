import { useState, useEffect } from 'react';
import { IconBrain } from '@tabler/icons-react';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const scrollThreshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) setShowNavbar(false);
      else setShowNavbar(true);

      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 rounded-full
        outline outline-0 outline-offset-0 outline-gray-100 py-1
        ${showNavbar ? 'translate-y-0 mt-5' : '-translate-y-full'} 
        ${scrollY > scrollThreshold ? 'bg-white outline-2 shadow-[0_0_10px_-4px_rgba(100,116,139,0.4)]' : 'bg-transparent outline-none shadow-none'}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center  px-4">
          <a href="/" className="flex items-center space-x-2">
            <IconBrain size={24} />
            <span className="text-xl font-bold">
              xhip.AI
            </span>
          </a>
        </div>

        {/* Right side - Login/Start button */}
        <div className="hidden md:flex items-center space-x-4 z-[51] px-1">
          <button className="p-2 px-5 bg-black text-white text-sm rounded-full font-medium transition-all flex items-center gap-2">
            Schedule a Demo
            <ArrowTopRightIcon />
          </button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
