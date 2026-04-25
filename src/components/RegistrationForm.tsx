import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2, User, Phone, BookOpen } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: ''
  });
  const [courses, setCourses] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course) {
      alert("Iltimos, kursni tanlang!");
      return;
    }
    setStatus('loading');

    try {
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', phone: '', course: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      handleFirestoreError(error, OperationType.CREATE, 'registrations');
    }
  };

  return (
    <section id="registration" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/10 blur-[120px] rounded-full -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-500/5 blur-[120px] rounded-full -ml-20 -mb-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-16 bg-emerald-500 text-slate-950">
              <h2 className="text-4xl lg:text-5xl font-black mb-8 italic uppercase leading-tight">Kelajakni bugundan <br /> boshlang!</h2>
              <p className="text-xl font-medium mb-12 opacity-80 leading-relaxed italic">
                Formani to'ldiring va mutaxassislarimiz siz bilan bog'lanib, bepul maslahat berishadi. IT olamiga ilk qadamni hoziroq qo'ying!
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg">Xalqaro sertifikat</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg">Amaliy loyihalar</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg">Ishga joylashishda ko'mak</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-16">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center rotate-3 shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12 text-slate-950" />
                  </div>
                  <h3 className="text-2xl font-bold text-white italic">Muvaffaqiyatli!</h3>
                  <p className="text-slate-400">Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Yana ariza topshirish
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-widest">F.I.SH</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input
                        required
                        type="text"
                        placeholder="Ali Valiyev"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-widest">Telefon raqam</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input
                        required
                        type="tel"
                        placeholder="+998 (__) ___ __ __"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-widest">Kursni tanlang</label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <select
                        required
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-slate-900">Yo'nalishni tanlang</option>
                        {courses.map((course, idx) => (
                          <option key={idx} value={course.title} className="bg-slate-900">
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    disabled={status === 'loading'}
                    className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-[0.98] mt-8"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin w-6 h-6" />
                    ) : (
                      <>
                        ARIZA TOPSHIRISH
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
