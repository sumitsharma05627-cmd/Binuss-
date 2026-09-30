import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language, LanguageOption, SUPPORTED_LANGUAGES, TRANSLATIONS, Translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  languages: LanguageOption[];
  currentLanguage: LanguageOption;
}

const STORAGE_KEY = 'gwl_language';
const FALLBACK_STORAGE_KEY = 'kbsr_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(FALLBACK_STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved as Language;
      }
    } catch {
      // Ignore localStorage access errors
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore write errors
    }
  };

  const toggleLanguage = () => {
    // Cycles between supported languages: en -> hi -> es -> en
    const currentIndex = SUPPORTED_LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    setLanguage(SUPPORTED_LANGUAGES[nextIndex].code);
  };

  // Sync with document element
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.en, [language]);
  const currentLanguage = useMemo(
    () => SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0],
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
