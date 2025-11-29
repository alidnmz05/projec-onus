import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Projects = () => {
  const categories = ['Tümü', 'Mutfak', 'Banyo', 'Mobilya', 'Özel Tasarım'];
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: 'Modern Mutfak Tasarımı',
      category: 'Mutfak',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
      description: 'Minimal ve fonksiyonel mutfak çözümü ile modern yaşam tarzına uygun tasarım.',
      details: 'Bu projede açık mutfak konsepti ile salon birleştirildi. Yüksek kalite malzemeler ve akıllı depolama çözümleri kullanıldı.',
    },
    {
      id: 2,
      title: 'Lüks Banyo Projesi',
      category: 'Banyo',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      description: 'Spa konseptli modern banyo tasarımı',
      details: 'Doğal taş kaplama ve özel aydınlatma ile spa atmosferi yaratıldı.',
    },
    {
      id: 3,
      title: 'Özel Dolap Sistemi',
      category: 'Mobilya',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
      description: 'Yatak odası için özel tasarım dolap',
      details: 'Maksimum depolama alanı sağlayan akıllı dolap sistemi.',
    },
    {
      id: 4,
      title: 'Açık Mutfak Uygulaması',
      category: 'Mutfak',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80',
      description: 'Salon ile entegre modern mutfak',
      details: 'Geniş ada mutfak ve premium aksesuarlarla donatıldı.',
    },
    {
      id: 5,
      title: 'Kompakt Banyo Çözümü',
      category: 'Banyo',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
      description: 'Küçük alanlara özel tasarım',
      details: 'Alan optimizasyonu ile fonksiyonel ve şık banyo.',
    },
    {
      id: 6,
      title: 'Ahşap Detaylar',
      category: 'Mobilya',
      image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=800&q=80',
      description: 'Doğal ahşap özel üretim mobilyalar',
      details: 'El işçiliği ile hazırlanmış özel tasarım mobilyalar.',
    },
    {
      id: 7,
      title: 'Endüstriyel Mutfak',
      category: 'Mutfak',
      image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80',
      description: 'Endüstriyel tarz açık mutfak',
      details: 'Metal ve ahşabın mükemmel kombinasyonu.',
    },
    {
      id: 8,
      title: 'Çift Lavabolu Banyo',
      category: 'Banyo',
      image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=800&q=80',
      description: 'Geniş ve lüks banyo tasarımı',
      details: 'Çift lavabo ve geniş duş alanı ile konforlu banyo.',
    },
    {
      id: 9,
      title: 'TV Ünitesi',
      category: 'Mobilya',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      description: 'Modern ve minimalist TV ünitesi',
      details: 'LED aydınlatmalı özel tasarım TV ünitesi.',
    },
  ];

  const filteredProjects = activeCategory === 'Tümü' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-900 mb-4">
            Projelerimiz
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            Gerçekleştirdiğimiz projelerle yaşam alanlarını dönüştürüyoruz
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-dark-600 hover:bg-gray-100 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-primary-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center text-white font-semibold">
                      <FaSearch className="mr-2" />
                      <span>Detayları Gör</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-96 object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes className="text-dark-900" />
                  </button>
                </div>
                <div className="p-8">
                  <span className="inline-block bg-primary-600 text-white text-sm px-4 py-1 rounded-full mb-4">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-bold text-dark-900 mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-dark-600 text-lg mb-4">
                    {selectedProject.description}
                  </p>
                  <p className="text-dark-700 leading-relaxed">
                    {selectedProject.details}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
