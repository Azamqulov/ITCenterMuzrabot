import { motion } from 'motion/react';
import { CheckCircle2, Users, Rocket, Award } from 'lucide-react';
import { useSiteConfig } from '../lib/useSiteConfig';

const highlights = [
  {
    icon: Users,
    title: "Tajribali ustozlar",
    desc: "Soha mutaxassislaridan dars o'rganing"
  },
  {
    icon: Rocket,
    title: "Amaliy mashg‘ulotlar",
    desc: "Nazaridan ko'ra amaliyotga ko'proq e'tibor"
  },
  {
    icon: Award,
    title: "Sertifikat beriladi",
    desc: "Kursni bitirgach tasdiqlovchi sertifikat"
  }
];

export default function About() {
  const { config, loading } = useSiteConfig();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {loading ? "IT Center haqida" : config.aboutTitle}
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {loading ? "Yuklanmoqda..." : config.aboutDescription}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className="text-slate-700 font-medium">Barcha sharoitlarga ega o'quv xonalari</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className="text-slate-700 font-medium">Har bir o'quvchi uchun alohida kompyuter</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className="text-slate-700 font-medium">O'quv materiallari va kofebreyklar</p>
              </div>
            </div>
          </motion.div>
          
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                  <item.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
            
            {/* Callout box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-2">98%</h3>
              <p className="text-slate-400 text-sm">O'quvchilarimiz kurslarimizdan mamnun</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
