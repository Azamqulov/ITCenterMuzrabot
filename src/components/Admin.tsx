import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Layout, Type, LogOut, Settings, Users, LogIn, CheckCircle, Clock, Phone, Rocket, AlertCircle, ArrowLeft, Plus, Trash2, Upload, Star, MessageSquare } from 'lucide-react';
import { auth, db, signIn, signOut, handleFirestoreError, OperationType, serverTimestamp } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import axios from 'axios';

const IMGBB_API_KEY = '4eae29c78f313acc97b8e9dbc80c23f2';

interface Registration {
  id: string;
  name: string;
  phone: string;
  course: string;
  createdAt: Timestamp;
}

interface Course {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  order?: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export default function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    aboutTitle: '',
    aboutDescription: '',
    phone: '',
    telegramAdmin: '',
    telegramChatId: ''
  });

  const ADMIN_EMAIL = 'qrolsher07@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const unsubRegs = onSnapshot(query(collection(db, 'registrations'), orderBy('createdAt', 'desc')), (snapshot) => {
      setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Registration[]);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'registrations'));

    const unsubCourses = onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[]);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'courses'));

    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[]);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'testimonials'));

    const fetchConfig = async () => {
      const docSnap = await getDoc(doc(db, 'config', 'site'));
      if (docSnap.exists()) setSiteConfig(docSnap.data());
    };
    fetchConfig();

    return () => {
      unsubRegs();
      unsubCourses();
      unsubTestimonials();
    };
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
      setSiteConfig({ ...siteConfig, [fieldName]: res.data.data.url });
    } catch (err) { alert("Rasm yuklashda xatolik!"); }
    finally { setIsUploading(false); }
  };

  const handleSaveConfig = async () => {
    try {
      await setDoc(doc(db, 'config', 'site'), { ...siteConfig, updatedAt: serverTimestamp() });
      alert("Saqlandi!");
    } catch (err) { handleFirestoreError(err, OperationType.UPDATE, 'config/site'); }
  };

  const addCourse = async () => {
    await addDoc(collection(db, 'courses'), { title: 'Yangi Kurs', desc: 'Kurs tarifi', icon: 'Rocket', color: 'emerald' });
  };

  const updateCourse = async (id: string, data: any) => {
    await setDoc(doc(db, 'courses', id), data, { merge: true });
  };

  const addTestimonial = async () => {
    await addDoc(collection(db, 'testimonials'), { name: 'F.I.SH', role: 'O\'quvchi', content: 'Fikr matni' });
  };

  const updateTestimonial = async (id: string, data: any) => {
    await setDoc(doc(db, 'testimonials', id), data, { merge: true });
  };

  const deleteItem = async (col: string, id: string) => {
    if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      await deleteDoc(doc(db, col, id));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;

  if (!user || user.email !== ADMIN_EMAIL || !user.emailVerified) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="w-20 s:w-24 h-20 s:h-24 bg-emerald-500 rounded-3xl flex items-center justify-center mb-8 rotate-3 mx-auto shadow-2xl shadow-emerald-500/20">
            <Settings className="w-10 s:w-12 h-10 s:h-12 text-slate-950" />
          </div>
          <h1 className="text-4xl font-bold mb-4 italic text-emerald-400">ADMIN PANEL</h1>
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
            {user ? (
              <div className="mb-8">
                <div className="flex justify-center mb-4"><AlertCircle className="w-8 h-8 text-red-400" /></div>
                <h2 className="text-xl font-bold mb-2 italic">Kirish cheklangan</h2>
                <p className="text-slate-400 text-sm mb-6">{user.email} hisobi admin emas.</p>
                <button onClick={() => signOut()} className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl">Chiqish</button>
              </div>
            ) : (
              <button onClick={() => signIn()} className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20">Google orqali kirish</button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 bg-slate-900 text-white p-6 flex flex-col lg:min-h-screen border-r border-white/5">
        <div className="flex items-center gap-3 mb-10">
          <Settings className="w-6 h-6 text-emerald-500" />
          <h1 className="text-xl font-bold italic">Admin Panel</h1>
        </div>
        <nav className="space-y-1 mb-10">
          {[
            { id: 'general', label: 'Matnlar', icon: Type },
            { id: 'registrations', label: 'Arizalar', icon: Users },
            { id: 'courses', label: 'Kurslar', icon: Layout },
            { id: 'testimonials', label: 'Fikrlar', icon: MessageSquare }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>
        <button onClick={() => signOut()} className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10">
          <LogOut size={20} /> Chiqish
        </button>
      </aside>

      <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h2 className="text-4xl font-black italic tracking-tight text-slate-900 uppercase">
            {activeTab === 'general' && 'Matnlar va Rasm'}
            {activeTab === 'registrations' && 'Arizalar ro\'yxati'}
            {activeTab === 'courses' && 'Kurslar boshqaruvi'}
            {activeTab === 'testimonials' && 'O\'quvchilar fikri'}
          </h2>
          {activeTab === 'general' && (
            <button onClick={handleSaveConfig} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">Saqlash</button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 italic text-emerald-600">Hero Section</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold">Hero Sarlavha</label>
                    <input type="text" value={siteConfig.heroTitle} onChange={e => setSiteConfig({...siteConfig, heroTitle: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
                    <label className="block text-sm font-bold">Hero Tavsif</label>
                    <textarea rows={3} value={siteConfig.heroSubtitle} onChange={e => setSiteConfig({...siteConfig, heroSubtitle: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold">Hero Rasm (ImgBB orqali yuklash)</label>
                    <div className="relative group">
                      <div className="w-full h-40 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden">
                        {siteConfig.heroImage ? <img src={siteConfig.heroImage} className="w-full h-full object-cover" /> : <Upload className="text-slate-400" />}
                        <input type="file" onChange={e => handleImageUpload(e, 'heroImage')} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                      {isUploading && <div className="absolute inset-0 bg-white/60 flex items-center justify-center font-bold text-emerald-600">Yuklanmoqda...</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 italic text-emerald-600">Markaz va Aloqa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold">Markaz haqida sarlavha</label>
                    <input type="text" value={siteConfig.aboutTitle} onChange={e => setSiteConfig({...siteConfig, aboutTitle: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none" />
                    <label className="block text-sm font-bold">Markaz haqida tavsif</label>
                    <textarea rows={4} value={siteConfig.aboutDescription} onChange={e => setSiteConfig({...siteConfig, aboutDescription: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none" />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-sm font-bold">Telefon</label><input type="text" value={siteConfig.phone} onChange={e => setSiteConfig({...siteConfig, phone: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none" /></div>
                      <div><label className="block text-sm font-bold">TG Admin</label><input type="text" value={siteConfig.telegramAdmin} onChange={e => setSiteConfig({...siteConfig, telegramAdmin: e.target.value})} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none" /></div>
                    </div>
                    <label className="block text-sm font-bold">Telegram Chat ID</label>
                    <input type="text" value={siteConfig.telegramChatId} onChange={e => setSiteConfig({...siteConfig, telegramChatId: e.target.value})} className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-100 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'registrations' && (
            <motion.div key="registrations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 uppercase text-xs font-bold text-slate-500">
                    <tr><th className="px-8 py-6">O'quvchi</th><th className="px-8 py-6">Kurs</th><th className="px-8 py-6">Sana</th><th className="px-8 py-6">Amal</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {registrations.map(reg => (
                      <tr key={reg.id} className="hover:bg-slate-50/50">
                        <td className="px-8 py-6"><p className="font-bold">{reg.name}</p><p className="text-sm text-slate-500">{reg.phone}</p></td>
                        <td className="px-8 py-6 text-emerald-600 font-bold">{reg.course}</td>
                        <td className="px-8 py-6 text-sm text-slate-500">{reg.createdAt?.toDate().toLocaleString()}</td>
                        <td className="px-8 py-6"><button onClick={() => deleteItem('registrations', reg.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div key="courses" className="space-y-4">
              <button onClick={addCourse} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl active:scale-95 transition-all mb-4"><Plus /> Yangi kurs qo'shish</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <input type="text" value={course.title} onChange={e => updateCourse(course.id, { title: e.target.value })} className="w-full font-bold text-lg outline-none" placeholder="Kurs nomi" />
                    <textarea value={course.desc} onChange={e => updateCourse(course.id, { desc: e.target.value })} className="w-full text-sm text-slate-500 h-20 outline-none" placeholder="Kurs tarifi" />
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                       <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">ID: {course.id.slice(0, 5)}</span>
                       <button onClick={() => deleteItem('courses', course.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div key="testimonials" className="space-y-4">
              <button onClick={addTestimonial} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl mb-4"><Plus /> Fikr qo'shish</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(test => (
                  <div key={test.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full shrink-0 flex items-center justify-center"><Star className="text-yellow-400 w-5 h-5" /></div>
                      <div className="flex-grow">
                        <input type="text" value={test.name} onChange={e => updateTestimonial(test.id, { name: e.target.value })} className="w-full font-bold outline-none" placeholder="Ism sharif" />
                        <input type="text" value={test.role} onChange={e => updateTestimonial(test.id, { role: e.target.value })} className="w-full text-xs text-slate-400 outline-none" placeholder="Lavozimi" />
                      </div>
                    </div>
                    <textarea value={test.content} onChange={e => updateTestimonial(test.id, { content: e.target.value })} className="w-full text-sm text-slate-600 h-24 outline-none italic leading-relaxed" placeholder="Fikr matni..." />
                    <button onClick={() => deleteItem('testimonials', test.id)} className="text-red-400 text-xs font-bold hover:underline">O'chirib tashlash</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
