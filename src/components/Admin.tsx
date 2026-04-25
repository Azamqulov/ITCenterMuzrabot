import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Layout, Type, LogOut, Settings, Users, LogIn, CheckCircle, Clock, Phone } from 'lucide-react';
import { auth, db, signIn, signOut, handleFirestoreError, OperationType, serverTimestamp } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

interface Registration {
  id: string;
  name: string;
  phone: string;
  course: string;
  createdAt: Timestamp;
}

export default function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [siteConfig, setSiteConfig] = useState({
    heroTitle: 'IT olamiga qadam qo‘ying!',
    heroSubtitle: 'Kompyuterni faqat ishlatish emas, pul ishlaydigan ko‘nikmaga aylantiring.',
    phone: '+998 77 040 46 24',
    telegramAdmin: '@ITCenter_01',
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

    // Fetch registrations
    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(data);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'registrations'));

    // Fetch site config
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'config', 'site');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSiteConfig(docSnap.data() as any);
        }
      } catch (err) {
        console.error("Config fetch error:", err);
      }
    };
    fetchConfig();

    return () => unsubscribe();
  }, [user]);

  const handleSaveConfig = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'config', 'site'), {
        ...siteConfig,
        updatedAt: serverTimestamp()
      });
      alert("Ma'lumotlar saqlandi!");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'config/site');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 rotate-3">
          <Settings className="w-10 h-10 text-slate-950" />
        </div>
        <h1 className="text-4xl font-bold mb-4 italic">Xalqabot IT Center</h1>
        <p className="text-slate-400 mb-12 max-w-sm">
          Ushbu sahifa faqatgina administratorlar uchun. Iltimos, hisobingizga kiring.
        </p>
        <button 
          onClick={() => signIn()}
          className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20"
        >
          <LogIn />
          Google orqali kirish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col border-r border-white/5">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-slate-950" />
          </div>
          <h1 className="text-xl font-bold italic">Admin Panel</h1>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'general' ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Type size={20} />
            Matnlar
          </button>
          <button 
            onClick={() => setActiveTab('registrations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'registrations' ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Users size={20} />
            Arizalar
          </button>
        </nav>
        
        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.email}</p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
          >
            <LogOut size={20} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2 italic">
              {activeTab === 'general' && 'Matnlar va Kontent'}
              {activeTab === 'registrations' && 'Yuborilgan arizalar'}
            </h2>
            <p className="text-slate-500">
              {activeTab === 'general' && "Saytning asosiy sarlavhalari va bog'lanish ma'lumotlarini tahrirlang."}
              {activeTab === 'registrations' && "O'quvchilar tomonidan yuborilgan so'nggi arizalar ro'yxati."}
            </p>
          </div>
          
          {activeTab === 'general' && (
            <button 
              onClick={handleSaveConfig}
              className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
            >
              <Save size={20} />
              O'zgarishlarni saqlash
            </button>
          )}
        </header>

        <section className="max-w-6xl">
          {activeTab === 'general' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-600 italic">
                    <Layout className="w-5 h-5" />
                    Asosiy qism
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Hero Sarlavha</label>
                    <input 
                      type="text" 
                      value={siteConfig.heroTitle}
                      onChange={(e) => setSiteConfig({...siteConfig, heroTitle: e.target.value})}
                      className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Hero Meta Tavsif</label>
                    <textarea 
                      rows={4}
                      value={siteConfig.heroSubtitle}
                      onChange={(e) => setSiteConfig({...siteConfig, heroSubtitle: e.target.value})}
                      className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-600 italic">
                    <Phone className="w-5 h-5" />
                    Bog'lanish
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Telefon raqam</label>
                      <input 
                        type="text" 
                        value={siteConfig.phone}
                        onChange={(e) => setSiteConfig({...siteConfig, phone: e.target.value})}
                        className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Telegram Admin</label>
                      <input 
                        type="text" 
                        value={siteConfig.telegramAdmin}
                        onChange={(e) => setSiteConfig({...siteConfig, telegramAdmin: e.target.value})}
                        className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 underline decoration-emerald-200 decoration-4">Telegram Chat ID</label>
                    <input 
                      type="text" 
                      placeholder="Masalan: 12345678"
                      value={siteConfig.telegramChatId}
                      onChange={(e) => setSiteConfig({...siteConfig, telegramChatId: e.target.value})}
                      className="w-full p-5 rounded-2xl bg-emerald-50 border border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-mono"
                    />
                    <p className="text-xs text-slate-400 mt-3 italic leading-relaxed">
                      Chat ID xabarlar bot orqali aynan sizga kelishi uchun kerak. @userinfobot orqali Chat ID ni aniqlab oling.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'registrations' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm font-bold uppercase tracking-wider">
                      <th className="px-8 py-6">O'quvchi</th>
                      <th className="px-8 py-6">Kurs</th>
                      <th className="px-8 py-6">Sana</th>
                      <th className="px-8 py-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                          Hozircha hech qanday arizalar mavjud emas.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{reg.name}</p>
                            <a href={`tel:${reg.phone}`} className="text-sm text-slate-500 hover:text-emerald-500 underline decoration-slate-200">{reg.phone}</a>
                          </td>
                          <td className="px-8 py-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                              <CheckCircle className="w-3 h-3" />
                              {reg.course}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Clock className="w-4 h-4 opacity-50" />
                              {reg.createdAt?.toDate().toLocaleDateString('uz-UZ')}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs font-bold py-1 px-3 rounded-md bg-slate-100 text-slate-600">Yangi</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

import { Rocket } from 'lucide-react';
