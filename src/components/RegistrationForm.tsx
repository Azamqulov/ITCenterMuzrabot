import { useState, type FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Phone, BookOpen, Send, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';
import { useSiteConfig } from '../lib/useSiteConfig';

const BOT_TOKEN = '7699329181:AAG2We-pDXE_P4HjqrxMF8IlDncX7y24auc';

export default function RegistrationForm() {
  const { config } = useSiteConfig();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Save to Firestore
      const registrationData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        course: formData.course,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'registrations'), registrationData);

      // 2. Prepare Telegram message
      const message = `
🚀 *Yangi ariza!*
👤 *Ism:* ${registrationData.name}
📞 *Tel:* ${registrationData.phone}
📚 *Kurs:* ${registrationData.course}
🕒 *Vaqt:* ${new Date().toLocaleString('uz-UZ')}
      `;

      // 3. Send to Telegram (best effort)
      if (config.telegramChatId) {
        try {
          await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: config.telegramChatId,
            text: message,
            parse_mode: 'Markdown'
          });
        } catch (tgError) {
          console.error('Telegram notification failed:', tgError);
        }
      }

      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'registrations');
    } finally {
      setIsLoading(false);
    }
  };

  const courses = [
    "English (IELTS & CEFR)",
    "Ingliz tili (Boshlang'ich)",
    "Matematika",
    "Nemis tili",
    "Frontend dasturlash",
    "Kompyuter savodxonligi"
  ];

  return (
    <section id="registration" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-xl flex flex-col md:flex-row">
          
          <div className="md:w-5/12 bg-emerald-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full -ml-24 -mb-24 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ro‘yxatdan o‘tish</h2>
              <p className="text-emerald-100 text-lg mb-8">
                IT karerangizni bugun boshlang! Shaklni to'ldiring va biz siz bilan 24 soat ichida bog'lanamiz.
              </p>
              
              <ul className="space-y-4">
                {['Bepul konsultatsiya', 'Dars tartibi va narxlar', 'Sohaga oid maslahatlar'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative z-10 pt-12">
              <p className="text-emerald-200 text-sm">Yordam kerakmi?</p>
              <p className="font-bold">+998 77 040 46 24</p>
            </div>
          </div>
          
          <div className="md:w-7/12 p-12 bg-white relative">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Rahmat!</h3>
                <p className="text-slate-500 mb-8 max-w-sm">
                  Sizning arizangiz qabul qilindi. Tez orada administratorlarimiz siz bilan bog'lanishadi.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Yana ariza topshirish
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Ismingiz</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      id="name"
                      required
                      placeholder="Masalan: Azizbek"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Telefon raqamingiz</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-slate-700 mb-2">Kursni tanlang</label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      id="course"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none"
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                    >
                      <option value="" disabled>Kursni tanlang</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Yuborish
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-slate-400 text-center">
                  "Yuborish" tugmasini bosish orqali siz shaxsiy ma'lumotlaringizni qayta ishlashga rozilik bildirasiz.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
