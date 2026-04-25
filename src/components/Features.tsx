import { motion } from 'motion/react';
import { Target, Zap, Heart, LayoutGrid } from 'lucide-react';

const features = [
  {
    title: "Zamonaviy ta’lim",
    desc: "Eng so'nggi texnologiyalar va metodikalar asosida darslar.",
    icon: LayoutGrid
  },
  {
    title: "Real loyihalar",
    desc: "O'rganish davomida amaliy loyihalarda qatnashish imkoniyati.",
    icon: Rocket
  },
  {
    title: "Kichik guruhlar",
    desc: "Har bir o'quvchiga yetarli vaqt ajratish uchun guruhlar hajmi cheklangan.",
    icon: Zap
  },
  {
    title: "Individual yondashuv",
    desc: "O'quvchining qobiliyati va qiziqishidan kelib chiqib dars o'tish.",
    icon: Heart
  }
];

import { Rocket } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Nega aynan <span className="text-emerald-500 underline decoration-emerald-200 underline-offset-8 transition-all hover:decoration-emerald-500">bizni</span> tanlashingiz kerak?
              </h2>
              <p className="text-lg text-slate-500 mb-8">
                Biz nafaqat bilim beramiz, balki sizni kelajak kasbi bilan ta'minlaymiz. Har bir darsimiz amaliyotga yo'naltirilgan.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 max-w-xs">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Aniq maqsad</p>
                  <p className="text-sm text-slate-500 italic">Natijaga yo'naltirilgan ta'lim</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-6 text-emerald-600">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
