import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, Send } from 'lucide-react';
import { useSiteConfig } from '../lib/useSiteConfig';

export default function Location() {
  const { config, loading } = useSiteConfig();

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 italic">Biz bilan bog'lanish</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                    <MapPin className="w-6 h-6 text-emerald-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest">Manzil</p>
                    <p className="text-xl font-medium">Muzrabot tumani, Pochta binosi, 2-qavat</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                    <Phone className="w-6 h-6 text-emerald-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest">Telefon</p>
                    <a href={`tel:${config.phone}`} className="text-xl font-medium hover:text-emerald-400 transition-colors">
                      {loading ? "Yuklanmoqda..." : config.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                    <Send className="w-6 h-6 text-emerald-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest">Telegram</p>
                    <div className="flex flex-col gap-1">
                      <a href="https://t.me/Muzrabot_ITCenter" target="_blank" className="text-xl font-medium hover:text-emerald-400 transition-colors">@Muzrabot_ITCenter</a>
                      <a href={`https://t.me/${config.telegramAdmin.replace('@', '')}`} target="_blank" className="text-slate-400 hover:text-emerald-400 transition-colors">
                        Admin: {loading ? "..." : config.telegramAdmin}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  Savollaringiz bormi?
                </h3>
                <p className="text-slate-400 mb-6">
                  Biz bilan bog'laning yoki markazimizga tashrif buyuring. Mutaxassislarimiz barcha savollaringizga javob berishga tayyor.
                </p>
                <a href={`https://t.me/${config.telegramAdmin.replace('@', '')}`} target="_blank" className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-white transition-all">
                  Telegramda yozish
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative"
            >
              {/* Fallback pattern if map fails to load or for better aesthetic */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-8 text-center text-slate-500 z-0">
                <div className="max-w-sm">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Muzrabot IT Center xaritasi bu yerda ko'rsatiladi</p>
                </div>
              </div>
              
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d66.8!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzAwLjAiTiA2NsKwNDgnMDAuMCJF!5e0!3m2!1suz!2suz!4v1630000000000!5m2!1suz!2suz" 
                className="w-full h-full border-0 relative z-10 opacity-80 contrast-125 grayscale rounded-[2.5rem]" 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
