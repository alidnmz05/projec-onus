import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5177/api';

interface Statistic {
  id: number;
  title: string;
  value: string;
  icon: string;
  order: number;
}

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Statistic | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    icon: 'CheckCircle',
  });

  const iconOptions = [
    'CheckCircle', 'Heart', 'Award', 'Users', 'Star', 'TrendingUp', 'Shield', 'Clock'
  ];

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/statistics`);
      setStatistics(response.data.sort((a: Statistic, b: Statistic) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching statistics:', error);
      alert('İstatistikler yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const statData = {
        ...formData,
        order: editingStat ? editingStat.order : statistics.length + 1
      };

      if (editingStat) {
        await axios.put(`${API_URL}/statistics/${editingStat.id}`, {
          ...statData,
          id: editingStat.id
        });
        alert('İstatistik güncellendi');
      } else {
        await axios.post(`${API_URL}/statistics`, statData);
        alert('İstatistik eklendi');
      }
      await fetchStatistics();
      closeModal();
    } catch (error) {
      console.error('Error saving statistic:', error);
      alert('İstatistik kaydedilirken hata oluştu');
    }
  };

  const openModal = (stat?: Statistic) => {
    if (stat) {
      setEditingStat(stat);
      setFormData({
        title: stat.title,
        value: stat.value,
        icon: stat.icon,
      });
    } else {
      setEditingStat(null);
      setFormData({
        title: '',
        value: '',
        icon: 'CheckCircle',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStat(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu istatistiği silmek istediğinizden emin misiniz?')) return;
    try {
      await axios.delete(`${API_URL}/statistics/${id}`);
      await fetchStatistics();
      alert('İstatistik silindi');
    } catch (error) {
      console.error('Error deleting statistic:', error);
      alert('İstatistik silinirken hata oluştu');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İstatistikler</h1>
          <p className="text-gray-600 mt-2">Ana sayfada görünen istatistikleri yönetin</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <FaPlus />
          <span>Yeni İstatistik</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl text-primary-600">{stat.icon}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(stat)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(stat.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-gray-600 font-medium">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingStat ? 'İstatistik Düzenle' : 'Yeni İstatistik'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="Örn: Tamamlanan Proje"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Değer</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="Örn: 500+"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">İkon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <FaSave className="inline mr-2" />
                  Kaydet
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminStatistics;
