import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Jahongir To'rayev",
    role: "Frontend o'quvchisi",
    text: "Markazdagi muhit juda ham zo'r. Ustozlar har bir darsni qiziqarli va tushunarli qilib o'tishadi. Men darslarni o'zlashtirishda hech qanday qiynalmadim.",
    avatar: "JT"
  },
  {
    name: "Gulnora Ergasheva",
    role: "Dizayn o'quvchisi",
    text: "Men oldin Photoshop ni umuman bilmasdim. Hozirda Xalqabot IT Center da o'qib, o'zimning birinchi dizaynlarimni yarata oldim. Tavsiya qilaman!",
    avatar: "GE"
  },
  {
    name: "Sirojiddin Rahmonov",
    role: "Backend o'quvchisi",
    text: "Markazdagi kompyuterlar juda tez va internet ham zo'r ishlaydi. Real loyihalar ustida ishlash menga juda ko'p bilim berdi.",
    avatar: "SR"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">O'quvchilarimiz <span className="text-emerald-600">fikrlari</span></h2>
            <p className="text-slate-500">Bizning kurslarimizni bitirgan va o'qiyotgan o'quvchilarning haqiqiy tajribalari.</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-emerald-50 opacity-10 group-hover:opacity-20 transition-opacity" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              
              <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
