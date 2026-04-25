import { motion } from 'motion/react';
import { Globe, Languages, Calculator, MessageSquare, Laptop, Code } from 'lucide-react';

const courses = [
  {
    title: "English (IELTS & CEFR)",
    desc: "Xalqaro standartlar asosida ingliz tilini o'rganing. IELTS 7+ va CEFR B2/C1 darajalariga tayyorlov.",
    icon: Globe,
    color: "bg-blue-600"
  },
  {
    title: "Ingliz tili (Boshlang'ich)",
    desc: "Ingliz tilini noldan boshlovchilar uchun maxsus dastur. So'zlashuv va asosiy grammatika.",
    icon: Languages,
    color: "bg-cyan-500"
  },
  {
    title: "Matematika",
    desc: "Maktab darslari va OTM imtihonlariga sifatli tayyorgarlik. Mantiqiy fikrlashni rivojlantirish.",
    icon: Calculator,
    color: "bg-indigo-600"
  },
  {
    title: "Nemis tili",
    desc: "Nemis tilini noldan o'rganing. Germaniyada o'qish va ishlash niyatidagilar uchun maxsus kurs.",
    icon: MessageSquare,
    color: "bg-yellow-600"
  },
  {
    title: "Frontend dasturlash",
    desc: "Zamonaviy veb-saytlar yaratishni HTML, CSS va JavaScript orqali professional darajada o'rganing.",
    icon: Code,
    color: "bg-emerald-500"
  },
  {
    title: "Kompyuter savodxonligi",
    desc: "Word, Excel, PowerPoint va Internet bilan ishlashni amaliy o'rganing.",
    icon: Laptop,
    color: "bg-slate-700"
  }
];

export default function Courses() {
  return (
    <section id="courses" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Bizning <span className="text-emerald-600">kurslarimiz</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              O'zingizga ma'qul bo'lgan yo'nalishni tanlang va mutaxassislar bilan birga o'rganing.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl ${course.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-${course.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform`}>
                <course.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {course.desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-emerald-600 font-bold">Batafsil</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Code className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
