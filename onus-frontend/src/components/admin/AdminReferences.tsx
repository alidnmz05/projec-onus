import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
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

const AdminReferences = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Reference>>({});

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/references');
      setReferences(response.data);
    } catch (error) {
      console.error('Referanslar yüklenirken hata:', error);
    }
  };

  const handleAdd = () => {
    setIsAddingNew(true);
    setFormData({
      companyName: '',
      logo: '',
      industry: '',
      year: new Date().getFullYear(),
      website: '',
      description: '',
    });
  };

  const handleEdit = (reference: Reference) => {
    setEditingId(reference.id);
    setFormData(reference);
  };

  const handleSave = async () => {
    try {
      if (isAddingNew) {
        await axios.post('http://localhost:5001/api/references', formData);
      } else if (editingId) {
        await axios.put(`http://localhost:5001/api/references/${editingId}`, formData);
      }
      setIsAddingNew(false);
      setEditingId(null);
      setFormData({});
      fetchReferences();
    } catch (error) {
      console.error('Kaydetme hatası:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5001/api/references/${id}`);
        fetchReferences();
      } catch (error) {
        console.error('Silme hatası:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-dark-900">Referanslar Yönetimi</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <FaPlus />
          <span>Yeni Referans Ekle</span>
        </button>
      </div>

      {(isAddingNew || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-dark-900">
            {isAddingNew ? 'Yeni Referans' : 'Referansı Düzenle'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-dark-700 font-medium mb-2">Şirket Adı</label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Örn: Hilton Hotels"
              />
            </div>
            <div>
              <label className="block text-dark-700 font-medium mb-2">Sektör</label>
              <input
                type="text"
                value={formData.industry || ''}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Örn: Otelcilik"
              />
            </div>
            <div>
              <label className="block text-dark-700 font-medium mb-2">Yıl</label>
              <input
                type="number"
                value={formData.year || new Date().getFullYear()}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-dark-700 font-medium mb-2">Website</label>
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-dark-700 font-medium mb-2">Logo URL</label>
              <input
                type="url"
                value={formData.logo || ''}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-dark-700 font-medium mb-2">Açıklama</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Proje hakkında kısa açıklama..."
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FaSave />
              <span>Kaydet</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-dark-400 hover:bg-dark-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FaTimes />
              <span>İptal</span>
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map((reference, index) => (
          <motion.div
            key={reference.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="p-6">
              <div className="flex items-center justify-center h-32 mb-4 bg-gray-50 rounded-lg">
                {reference.logo ? (
                  <img
                    src={reference.logo}
                    alt={reference.companyName}
                    className="max-h-24 max-w-full object-contain"
                  />
                ) : (
                  <div className="text-4xl font-bold text-gray-300">{reference.companyName[0]}</div>
                )}
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">{reference.companyName}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-dark-600">
                  <span className="font-semibold">Sektör:</span> {reference.industry}
                </p>
                <p className="text-sm text-dark-600">
                  <span className="font-semibold">Yıl:</span> {reference.year}
                </p>
                <p className="text-sm text-dark-600 line-clamp-2">{reference.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(reference)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaEdit />
                  <span>Düzenle</span>
                </button>
                <button
                  onClick={() => handleDelete(reference.id)}
                  className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {references.length === 0 && !isAddingNew && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-dark-500 text-lg">Henüz referans eklenmemiş.</p>
          <button
            onClick={handleAdd}
            className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
          >
            İlk referansı ekle
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReferences;
