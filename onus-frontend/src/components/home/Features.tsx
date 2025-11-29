import { motion } from 'framer-motion';
import { FaPaintBrush, FaCube, FaRulerCombined, FaCheckCircle, FaClock, FaAward } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: FaPaintBrush,
      title: t('features.customDesign.title'),
      description: t('features.customDesign.description'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FaCube,
      title: t('features.3dVisualization.title'),
      description: t('features.3dVisualization.description'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FaRulerCombined,
      title: t('features.preciseMeasurement.title'),
      description: t('features.preciseMeasurement.description'),
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FaCheckCircle,
      title: t('features.qualityGuarantee.title'),
      description: t('features.qualityGuarantee.description'),
      color: 'from-red-500 to-red-600',
    },
    {
      icon: FaClock,
      title: t('features.timelyDelivery.title'),
      description: t('features.timelyDelivery.description'),
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: FaAward,
      title: t('features.awardWinning.title'),
      description: t('features.awardWinning.description'),
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            {t('features.whyOnus')}
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-dark-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
