import { Instagram, Facebook, Send, Twitter } from 'lucide-react';
import { useSiteConfig } from '../lib/useSiteConfig';

export default function Footer() {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold text-white mb-6 italic">Xalqabot <span className="text-emerald-500">IT Center</span></h2>
            <p className="mb-8 leading-relaxed">
              Muzrabot tumanidagi zamonaviy IT bilimlarni o‘rgatuvchi o‘quv markazi. Kelajak kasbini biz bilan birga o'rganing.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Send, Twitter].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href={Icon === Send ? `https://t.me/${config.telegramAdmin.replace('@', '')}` : "#"} 
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-bold mb-6 italic">Sahifalar</h3>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Asosiy</a></li>
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">Biz haqimizda</a></li>
                <li><a href="#courses" className="hover:text-emerald-400 transition-colors">Kurslarimiz</a></li>
                <li><a href="#registration" className="hover:text-emerald-400 transition-colors">Ro'yxatdan o'tish</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 italic">Kurslar</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#courses" className="hover:text-emerald-400 transition-colors">Ingliz tili (IELTS, CEFR)</a></li>
                <li><a href="#courses" className="hover:text-emerald-400 transition-colors">Matematika & Fizika</a></li>
                <li><a href="#courses" className="hover:text-emerald-400 transition-colors">Frontend Dasturlash</a></li>
                <li><a href="#courses" className="hover:text-emerald-400 transition-colors">Robototexnika</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-bold mb-6 italic">Bog'lanish</h3>
              <p className="mb-4 text-sm">Muzrabot tumani, Pochta binosi, 2-qavat</p>
              <a href={`tel:${config.phone}`} className="text-white font-bold hover:text-emerald-400 transition-colors">{config.phone}</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Xalqabot IT Center. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
            <a href="/admin" className="opacity-20 hover:opacity-100 transition-opacity">Panel</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
