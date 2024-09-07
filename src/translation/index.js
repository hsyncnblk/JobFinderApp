import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import tr from './tr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  lng: 'en', // Varsayılan dili burada ayarlayabilirsiniz (ör. 'en' veya 'tr')
  fallbackLng: 'en', // Dil bulunamazsa varsayılan dil
  interpolation: {
    escapeValue: false, // React varsayılan olarak zaten XSS koruması sağlar
  },
});

export default i18n;
