import { motion } from 'motion/react';
import { Gift, BellRing } from 'lucide-react';

export default function Promo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-700 p-8 md:p-16 text-white shadow-2xl shadow-emerald-500/20"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold mb-6">
                <Gift className="w-4 h-4" />
                BAHORGI MAXSUS TAKLIF
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bahorgi maxsus chegirma mavjud!
              </h2>
              <p className="text-xl text-emerald-50/80 mb-8 max-w-xl">
                Barcha IT kurslarimiz uchun hoziroq ro'yxatdan o'ting va 20% gacha chegirmani qo'lga kiriting. Joylar soni cheklangan!
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <a 
                  href="#registration"
                  className="px-8 py-4 rounded-2xl bg-white text-emerald-700 font-bold text-lg hover:bg-emerald-50 transition-all flex items-center gap-2"
                >
                  Hoziroq ro‘yxatdan o‘tish
                </a>
                <div className="flex items-center gap-2 text-emerald-100 font-medium">
                  <BellRing className="w-5 h-5 animate-bounce" />
                  Oxirgi 5 ta joy qoldi
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white/20 flex items-center justify-center relative bg-white/10 backdrop-blur-md"
                >
                  <div className="text-center">
                    <span className="block text-5xl md:text-7xl font-black mb-1">-20%</span>
                    <span className="text-sm md:text-base font-bold opacity-80 uppercase tracking-widest">Chegirma</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
