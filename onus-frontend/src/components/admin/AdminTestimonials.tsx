import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar, FaCheck, FaTimes as FaX } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5177/api';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
  rating: number;
  isApproved: boolean;
  createdDate: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    imageUrl: '',
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      alert('Yorumlar yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const testimonialData = {
        ...formData,
        isApproved: true,
        createdDate: new Date().toISOString()
      };

      if (editingTestimonial) {
        await axios.put(`${API_URL}/testimonials/${editingTestimonial.id}`, {
          ...testimonialData,
          id: editingTestimonial.id
        });
        alert('Yorum güncellendi');
      } else {
        await axios.post(`${API_URL}/testimonials`, testimonialData);
        alert('Yorum eklendi');
      }
      await fetchTestimonials();
      closeModal();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Yorum kaydedilirken hata oluştu');
    }
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        imageUrl: testimonial.imageUrl,
        rating: testimonial.rating,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        role: '',
        content: '',
        imageUrl: '',
        rating: 5,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;
    try {
      await axios.delete(`${API_URL}/testimonials/${id}`);
      await fetchTestimonials();
      alert('Yorum silindi');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Yorum silinirken hata oluştu');
    }
  };

  const toggleApproval = async (testimonial: Testimonial) => {
    try {
      await axios.put(`${API_URL}/testimonials/${testimonial.id}`, {
        ...testimonial,
        isApproved: !testimonial.isApproved
      });
      await fetchTestimonials();
    } catch (error) {
      console.error('Error toggling approval:', error);
      alert('Onay durumu değiştirilirken hata oluştu');
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
          <h1 className="text-3xl font-bold text-gray-900">Müşteri Yorumları</h1>
          <p className="text-gray-600 mt-2">Ana sayfada görünen yorumları yönetin</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <FaPlus />
          <span>Yeni Yorum</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.imageUrl || 'https://via.placeholder.com/80'}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleApproval(testimonial)}
                  className={`p-2 rounded-lg transition-colors ${
                    testimonial.isApproved
                      ? 'text-green-600 bg-green-50 hover:bg-green-100'
                      : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                  }`}
                  title={testimonial.isApproved ? 'Onaylandı' : 'Onaylanmadı'}
                >
                  {testimonial.isApproved ? <FaCheck /> : <FaX />}
                </button>
                <button
                  onClick={() => openModal(testimonial)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.content}"</p>
            <p className="text-xs text-gray-400 mt-4">
              {new Date(testimonial.createdDate).toLocaleDateString('tr-TR')}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTestimonial ? 'Yorum Düzenle' : 'Yeni Yorum'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">İsim</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Rol/Ünvan</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Yorum</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Fotoğraf URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Puan (1-5)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} ⭐</option>
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

export default AdminTestimonials;
