import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface Reference {
  id: number;
  companyName: string;
  logo: string;
  industry: string;
  year: number;
  website: string;
  description: string;
}

const References = () => {
  const { t } = useTranslation();
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/references');
      setReferences(response.data);
    } catch (error) {
      console.error('Error fetching references:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-900 mb-6">
            {t('references.title')} <span className="gradient-text">{t('references.subtitle')}</span>
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            {t('references.description')}
          </p>
        </motion.div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {references.map((reference, index) => (
            <motion.div
              key={reference.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Logo Area */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center h-48 border-b border-gray-100">
                {reference.logo ? (
                  <img
                    src={reference.logo}
                    alt={reference.companyName}
                    className="max-h-32 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="text-6xl font-bold text-primary-600">
                    {reference.companyName[0]}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {reference.industry}
                  </span>
                  <h3 className="text-2xl font-bold text-dark-900 mb-2">
                    {reference.companyName}
                  </h3>
                  <p className="text-sm text-dark-500 mb-3">
                    {t('references.year')}: {reference.year}
                  </p>
                </div>

                <p className="text-dark-600 mb-4 line-clamp-3">
                  {reference.description}
                </p>

                {reference.website && (
                  <a
                    href={reference.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary-600 hover:text-primary-700 font-semibold text-sm hover:underline"
                  >
                    {t('references.visitWebsite')} →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {references.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-dark-500">{t('references.noReferences')}</p>
          </div>
        )}

        {/* Stats */}
        {references.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-primary-50 to-white rounded-2xl p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {references.length}+
                </div>
                <div className="text-dark-700 font-medium">{t('references.totalClients')}</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {new Set(references.map(r => r.industry)).size}+
                </div>
                <div className="text-dark-700 font-medium">{t('references.industries')}</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {new Date().getFullYear() - Math.min(...references.map(r => r.year))}+
                </div>
                <div className="text-dark-700 font-medium">{t('references.yearsExperience')}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default References;
