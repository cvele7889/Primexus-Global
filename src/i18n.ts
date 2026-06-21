import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import sr from './locales/sr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import ru from './locales/ru.json'

const savedLang = localStorage.getItem('primexus-lang') || 'sr'

i18n.use(initReactI18next).init({
  resources: {
    sr: { translation: sr },
    en: { translation: en },
    de: { translation: de },
    ru: { translation: ru },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
