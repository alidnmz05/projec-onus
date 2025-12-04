import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProjectsShowcase = () => {
  const { t } = useTranslation();
  const projects = [
    {
      id: 1,
      title: 'Modern Mutfak Tasarımı',
      category: 'Mutfak',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
      description: 'Minimal ve fonksiyonel mutfak çözümü',
    },
    {
      id: 2,
      title: 'Lüks Banyo Projesi',
      category: 'Banyo',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      description: 'Spa konseptli modern banyo tasarımı',
    },
    {
      id: 3,
      title: 'Özel Dolap Sistemi',
      category: 'Mobilya',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
      description: 'Yatak odası için özel tasarım dolap',
    },
    {
      id: 4,
      title: 'Açık Mutfak Uygulaması',
      category: 'Mutfak',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80',
      description: 'Salon ile entegre modern mutfak',
    },
    {
      id: 5,
      title: 'Kompakt Banyo Çözümü',
      category: 'Banyo',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
      description: 'Küçük alanlara özel tasarım',
    },
    {
      id: 6,
      title: 'Ahşap Detaylar',
      category: 'Mobilya',
      image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=800&q=80',
      description: 'Doğal ahşap özel üretim mobilyalar',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            {t('projects.title')} <span className="gradient-text">{t('projects.subtitle')}</span>
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/95 via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-primary-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <button className="flex items-center space-x-2 text-white font-semibold">
                    <span>{t('projects.viewDetails')}</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/projeler"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span>{t('projects.viewAll')}</span>
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
