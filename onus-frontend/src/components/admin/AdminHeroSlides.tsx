import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5177/api';

export default function AdminHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    isActive: true
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/heroslides`);
      setSlides(response.data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
    } catch (error) {
      console.error('Error fetching slides:', error);
      alert('Slaytlar yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSlide) {
        await axios.put(`${API_URL}/heroslides/${editingSlide.id}`, {
          ...formData,
          id: editingSlide.id,
          order: editingSlide.order
        });
      } else {
        await axios.post(`${API_URL}/heroslides`, {
          ...formData,
          order: slides.length + 1
        });
      }
      
      await fetchSlides();
      resetForm();
      alert(editingSlide ? 'Slayt güncellendi' : 'Slayt eklendi');
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Slayt kaydedilirken hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu slaytı silmek istediğinizden emin misiniz?')) return;
    
    try {
      await axios.delete(`${API_URL}/heroslides/${id}`);
      await fetchSlides();
      alert('Slayt silindi');
    } catch (error) {
      console.error('Error deleting slide:', error);
      alert('Slayt silinirken hata oluştu');
    }
  };

  const handleToggleActive = async (slide: HeroSlide) => {
    try {
      await axios.put(`${API_URL}/heroslides/${slide.id}`, {
        ...slide,
        isActive: !slide.isActive
      });
      await fetchSlides();
    } catch (error) {
      console.error('Error toggling slide:', error);
      alert('Slayt durumu değiştirilirken hata oluştu');
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(slides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSlides = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setSlides(updatedSlides);

    try {
      await Promise.all(
        updatedSlides.map(slide =>
          axios.put(`${API_URL}/heroslides/${slide.id}`, slide)
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Sıralama güncellenirken hata oluştu');
      await fetchSlides();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
      isActive: true
    });
    setEditingSlide(null);
    setIsFormOpen(false);
  };

  const startEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData(slide);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Hero Slayt Yönetimi</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Yeni Slayt Ekle
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => resetForm()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6">
              {editingSlide ? 'Slaytı Düzenle' : 'Yeni Slayt Ekle'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Başlık *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Görsel URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buton Yazısı
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buton Linki
                  </label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="/projeler"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700">Aktif</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingSlide ? 'Güncelle' : 'Ekle'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Slides List with Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="slides">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {slides.map((slide, index) => (
                <Draggable key={slide.id} draggableId={slide.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white rounded-lg shadow-md p-6 ${
                        snapshot.isDragging ? 'shadow-2xl ring-2 ring-primary-500' : ''
                      }`}
                    >
                      <div className="flex gap-6">
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{slide.title}</h3>
                              <p className="text-sm text-gray-600">{slide.subtitle}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              slide.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {slide.isActive ? 'Aktif' : 'Pasif'}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{slide.description}</p>
                          
                          {slide.buttonText && (
                            <div className="text-sm text-gray-600">
                              Buton: {slide.buttonText} → {slide.buttonLink}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleToggleActive(slide)}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                              slide.isActive
                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                : 'bg-green-100 hover:bg-green-200 text-green-700'
                            }`}
                          >
                            {slide.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                          </button>
                          <button
                            onClick={() => startEdit(slide)}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(slide.id)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {slides.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Henüz slayt eklenmemiş. Yukarıdaki butonu kullanarak ilk slaytı ekleyin.
        </div>
      )}
    </div>
  );
}
