import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Asosiy', href: '#' },
    { name: 'Haqimizda', href: '#about' },
    { name: 'Kurslar', href: '#courses' },
    { name: 'Bog\'lanish', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6",
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight",
              scrolled ? "text-slate-900" : "text-white"
            )}>
              Xalqabot <span className="text-emerald-500">IT Center</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-emerald-500",
                  scrolled ? "text-slate-600" : "text-slate-200"
                )}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#registration"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              Ro'yxatdan o'tish
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "md:hidden p-2 rounded-lg",
              scrolled ? "text-slate-900" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
          style={{ scaleX }}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-slate-950 transition-all duration-500 md:hidden",
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-3xl font-bold text-white hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#registration"
            className="px-10 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xl"
            onClick={() => setIsOpen(false)}
          >
            Ro'yxatdan o'tish
          </a>
        </div>
      </div>
    </>
  );
}
