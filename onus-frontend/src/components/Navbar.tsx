import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.projects'), path: '/projeler' },
    { name: t('nav.about'), path: '/hakkimizda' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/iletisim' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/logo.svg"
              alt="ONUS"
              className="h-12 md:h-16 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary-600'
                    : scrolled 
                      ? 'text-dark-900 hover:text-primary-600' 
                      : 'text-white hover:text-primary-400'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language & Social Icons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                scrolled ? 'text-dark-600 hover:text-primary-600' : 'text-white hover:text-primary-400'
              }`}
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                scrolled ? 'text-dark-600 hover:text-primary-600' : 'text-white hover:text-primary-400'
              }`}
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://wa.me/905555555555"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${
                scrolled ? 'text-dark-600 hover:text-primary-600' : 'text-white hover:text-primary-400'
              }`}
            >
              <FaWhatsapp size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${
              scrolled ? 'text-dark-900' : 'text-white'
            }`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="py-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-3 font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-dark-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="px-6 py-3">
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t">
                  <a href="https://facebook.com" className="text-dark-600 hover:text-primary-600">
                    <FaFacebook size={24} />
                  </a>
                  <a href="https://instagram.com" className="text-dark-600 hover:text-primary-600">
                    <FaInstagram size={24} />
                  </a>
                  <a href="https://wa.me/905555555555" className="text-dark-600 hover:text-primary-600">
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
