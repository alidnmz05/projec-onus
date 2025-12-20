import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5177/api';

const AdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/blog`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Blog yazıları yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Mutfak',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
        author: 'Admin',
        isPublished: false,
        createdDate: new Date().toISOString()
      };

      if (editingPost) {
        await axios.put(`${API_URL}/blog/${editingPost.id}`, {
          ...blogData,
          id: editingPost.id,
          isPublished: editingPost.isPublished
        });
        alert('Yazı güncellendi');
      } else {
        await axios.post(`${API_URL}/blog`, blogData);
        alert('Yazı eklendi');
      }
      await fetchPosts();
      closeModal();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Yazı kaydedilirken hata oluştu');
    }
  };

  const openModal = (post?: any) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        content: post.content || '',
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        excerpt: '',
        category: 'Mutfak',
        content: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return;
    try {
      await axios.delete(`${API_URL}/blog/${id}`);
      await fetchPosts();
      alert('Yazı silindi');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Yazı silinirken hata oluştu');
    }
  };

  const toggleStatus = async (post: any) => {
    try {
      await axios.put(`${API_URL}/blog/${post.id}`, {
        ...post,
        isPublished: !post.isPublished
      });
      await fetchPosts();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Durum değiştirilirken hata oluştu');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Blog Yazıları</h1>
          <p className="text-dark-600 mt-2">Blog içeriklerini yönetin</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <FaPlus />
          <span>Yeni Yazı</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-dark-900 font-semibold">Başlık</th>
              <th className="px-6 py-4 text-left text-dark-900 font-semibold">Kategori</th>
              <th className="px-6 py-4 text-left text-dark-900 font-semibold">Tarih</th>
              <th className="px-6 py-4 text-left text-dark-900 font-semibold">Durum</th>
              <th className="px-6 py-4 text-right text-dark-900 font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div>
                    <h3 className="font-semibold text-dark-900">{post.title}</h3>
                    <p className="text-sm text-dark-500 line-clamp-1">{post.excerpt}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-primary-100 text-primary-600 text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-dark-600">
                  {new Date(post.createdDate).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(post)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.isPublished
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {post.isPublished ? 'Yayında' : 'Taslak'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openModal(post)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
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
                  <option>Tasarım</option>
                  <option>Teknoloji</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-700 font-medium mb-2">Özet</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-dark-700 font-medium mb-2">İçerik</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  rows={8}
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

export default AdminBlog;
