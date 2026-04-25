import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Rocket, Layout, Shield, Cpu, Code, Palette, Zap } from 'lucide-react';

const iconMap: any = {
  Rocket, Layout, Shield, Cpu, Code, Palette, Zap
};

interface Course {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[]);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;
  if (courses.length === 0) return (
    <section id="courses" className="py-24 bg-white text-center">
      <p className="text-slate-400">Hozircha kurslar mavjud emas.</p>
    </section>
  );

  return (
    <section id="courses" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 italic">O'quv <span className="text-emerald-500">Yo'nalishlari</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Siz uchun eng dolzarb va daromadli IT sohalarini taklif etamiz. O'zingizga mos yo'nalishni tanlang.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const IconComponent = iconMap[course.icon] || Code;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 italic">{course.title}</h3>
                <p className="text-slate-600 leading-relaxed">{course.desc}</p>
                <button className="mt-8 text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Kurs haqida ma'lumot
                  <Zap size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
