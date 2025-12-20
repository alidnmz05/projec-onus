import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaCheck } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Body scroll lock for mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
        aria-label="Dil Seç"
      >
        <FaGlobe className="text-lg text-blue-600" />
        <span className="hidden md:inline font-medium text-gray-900">{currentLanguage.flag} {currentLanguage.name}</span>
        <span className="md:hidden text-xl">{currentLanguage.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[999]"
            />
            
            {/* Desktop Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="hidden md:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-[1000]"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors ${
                    i18n.language === language.code ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <span className="font-medium text-gray-900">{language.name}</span>
                  </span>
                  {i18n.language === language.code && (
                    <FaCheck className="text-blue-600" />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Mobile Bottom Sheet */}
            <motion.div
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                mass: 0.8
              }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[1000] max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 pb-8">
                {/* Handle bar */}
                <div className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mb-6" />
                
                <h3 className="text-xl font-black text-black mb-4 text-center">
                  Dil Seçin
                </h3>
                
                <div className="space-y-3">
                  {languages.map((language, index) => (
                    <motion.button
                      key={language.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => changeLanguage(language.code)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                        i18n.language === language.code 
                          ? 'bg-blue-600 shadow-lg' 
                          : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
                      }`}
                    >
                      <span className="flex items-center space-x-4">
                        <span className="text-4xl">{language.flag}</span>
                        <span className={`font-bold text-lg ${
                          i18n.language === language.code ? 'text-white' : 'text-black'
                        }`}>
                          {language.name}
                        </span>
                      </span>
                      {i18n.language === language.code && (
                        <FaCheck className="text-white text-xl" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
