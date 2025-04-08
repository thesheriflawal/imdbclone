import { initReactI18next } from "react-i18next";
import i18n from "i18next";

// Import the translation JSON files
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    es: {
      translation: es,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Language to fallback to if the current language is not available
  interpolation: {
    escapeValue: false, // React already escapes variables
  },
});

export default i18n;
