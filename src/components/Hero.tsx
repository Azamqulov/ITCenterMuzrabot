import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../lib/useSiteConfig';

export default function Hero() {
  const { config, loading } = useSiteConfig();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                Muzrabot tumanidagi zamonaviy IT markaz
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight italic">
                {loading ? "IT olamiga..." : config.heroTitle}
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                {loading ? "Yuklanmoqda..." : config.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#registration"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-lg hover:bg-emerald-400 transition-all group lg:scale-110 shadow-xl shadow-emerald-500/20"
                >
                  Ro‘yxatdan o‘tish
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#courses"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Kurslar bilan tanishish
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 flex gap-10 items-center text-slate-400 border-t border-white/5 pt-8"
            >
              <div>
                <p className="text-2xl font-bold text-white italic">500+</p>
                <p className="text-xs uppercase tracking-widest">O'quvchilar</p>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div>
                <p className="text-2xl font-bold text-white italic">10+</p>
                <p className="text-xs uppercase tracking-widest">Ustozlar</p>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div>
                <p className="text-2xl font-bold text-white italic">15+</p>
                <p className="text-xs uppercase tracking-widest">IT Kurslar</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl shadow-emerald-500/10">
              <img 
                src={config.heroImage || "/input_file_0.png"} 
                alt="IT Center" 
                className="w-full h-auto object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>
            {/* Decorative frames */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-emerald-500/20 rounded-[3rem] -z-10" />
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-emerald-500/10 rounded-[3rem] -z-10" />
            
            <div className="absolute -bottom-10 -right-10 bg-emerald-500 text-slate-950 p-6 rounded-3xl shadow-2xl rotate-3 hidden md:block">
              <p className="text-3xl font-black italic">24/7</p>
              <p className="text-xs font-bold uppercase tracking-tight">Qo'llab quvvatlash</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
