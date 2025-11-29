import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="/logo.svg" alt="ONUS" className="h-16 mb-6 brightness-0 invert" />
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                className="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/905555555555"
                className="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/projeler" className="text-gray-400 hover:text-primary-400 transition-colors">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-gray-400 hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-400 hover:text-primary-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">{t('footer.kitchenDesign')}</li>
              <li className="text-gray-400">{t('footer.bathroomDesign')}</li>
              <li className="text-gray-400">{t('footer.customFurniture')}</li>
              <li className="text-gray-400">{t('footer.3dVisualization')}</li>
              <li className="text-gray-400">{t('footer.consulting')}</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <a href="tel:+905555555555" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +90 555 555 55 55
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@onus.com.tr" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@onus.com.tr
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/gizlilik" className="text-gray-400 hover:text-primary-400 transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/kullanim" className="text-gray-400 hover:text-primary-400 transition-colors">
                {t('footer.termsOfUse')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
