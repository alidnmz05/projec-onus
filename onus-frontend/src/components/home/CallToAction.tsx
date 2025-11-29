import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-dark-900/95" />
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
          >
            {t('cta.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {t('cta.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/iletisim"
              className="group bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-2 hover:shadow-2xl hover:scale-105"
            >
              <span>{t('cta.getFreeQuote')}</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>

            <a
              href="tel:+905555555555"
              className="group bg-primary-600/20 backdrop-blur-sm hover:bg-primary-600 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-2"
            >
              <FaPhone className="group-hover:rotate-12 transition-transform" />
              <span>{t('cta.callNow')}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span className="text-lg">{t('cta.freeSurvey')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span className="text-lg">{t('cta.3dVisualization')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span className="text-lg">{t('cta.certified')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
