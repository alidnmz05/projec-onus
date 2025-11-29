import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const AdminProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Modern Mutfak Tasarımı',
      category: 'Mutfak',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=400&q=80',
      description: 'Minimal ve fonksiyonel mutfak çözümü',
      status: 'Aktif',
    },
    {
      id: 2,
      title: 'Lüks Banyo Projesi',
      category: 'Banyo',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80',
      description: 'Spa konseptli modern banyo',
      status: 'Aktif',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mutfak',
    description: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      setProjects([...projects, {
        id: Date.now(),
        ...formData,
        status: 'Aktif',
      }]);
    }
    closeModal();
  };

  const openModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Mutfak',
        description: '',
        image: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Projeler</h1>
          <p className="text-dark-600 mt-2">Tüm projeleri yönetin</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <FaPlus />
          <span>Yeni Proje</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-block bg-primary-100 text-primary-600 text-xs px-3 py-1 rounded-full mb-3">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                {project.title}
              </h3>
              <p className="text-dark-600 mb-4">{project.description}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaEdit />
                  <span>Düzenle</span>
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
              </h2>
              <button
                onClick={closeModal}
                className="text-dark-400 hover:text-dark-600"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-dark-700 font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-dark-700 font-medium mb-2">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option>Mutfak</option>
                  <option>Banyo</option>
                  <option>Mobilya</option>
                  <option>Özel Tasarım</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-700 font-medium mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-dark-700 font-medium mb-2">Resim URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <FaSave />
                  <span>Kaydet</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
