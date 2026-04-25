import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutTitle: string;
  aboutDescription: string;
  phone: string;
  telegramAdmin: string;
  telegramChatId: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  heroTitle: 'IT olamiga qadam qo‘ying!',
  heroSubtitle: 'Kompyuterni faqat ishlatish emas, pul ishlaydigan ko‘nikmaga aylantiring.',
  heroImage: '/input_file_0.png',
  aboutTitle: 'Xalqabot IT Center haqida',
  aboutDescription: 'Zamonaviy IT bilimlarni o‘rgatuvchi o‘quv markazi. Tajribali ustozlar va amaliy mashg‘ulotlar orqali sizni real kasb egasiga aylantiramiz.',
  phone: '+998 77 040 46 24',
  telegramAdmin: '@ITCenter_01',
  telegramChatId: ''
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'config', 'site'), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(docSnap.data() as SiteConfig);
      }
      setLoading(false);
    }, (error) => {
      console.error("Config fetch error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { config, loading };
}
