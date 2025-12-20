import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaEdit } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

interface AboutContent {
  id?: number;
  page: string;
  section: string;
  title: string;
  content: string;
  order: number;
}

const AdminAbout = () => {
  const [contents, setContents] = useState<AboutContent[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const defaultContents: AboutContent[] = [
    {
      page: 'about',
      section: 'hero',
      title: 'Ana Başlık',
      content: 'ONUS Mutfak & Banyo olarak, modern tasarım ve fonksiyonelliğin buluştuğu, yaşam alanlarınıza şıklık ve konfor getiren özel çözümler sunuyoruz.',
      order: 1
    },
    {
      page: 'about',
      section: 'hero',
      title: 'Slogan',
      content: 'Doğanın Çırağı, Ahşabın Ustası',
      order: 2
    },
    {
      page: 'about',
      section: 'hero',
      title: 'Açıklama',
      content: 'Yılların deneyimi ve sektördeki uzmanlığımızla, hayalinizdeki yaşam alanlarını gerçeğe dönüştürüyoruz. Kaliteli malzeme, profesyonel ekip ve mükemmel işçilik garantisi sunuyoruz.',
      order: 3
    },
    {
      page: 'about',
      section: 'stats',
      title: 'Deneyim Yılı',
      content: '15+',
      order: 4
    }
  ];

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get(`${API_URL}/pagecontents?page=about`);
      if (response.data && response.data.length > 0) {
        setContents(response.data);
      } else {
        setContents(defaultContents);
      }
    } catch (error) {
      console.error('Error fetching about contents:', error);
      setContents(defaultContents);
    }
  };

  const handleSave = async (content: AboutContent) => {
    try {
      if (content.id) {
        await axios.put(`${API_URL}/pagecontents/${content.id}`, content);
      } else {
        const response = await axios.post(`${API_URL}/pagecontents`, content);
        content.id = response.data.id;
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setEditingId(null);
      fetchContents();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('İçerik kaydedilirken hata oluştu');
    }
  };

  const handleContentChange = (index: number, field: keyof AboutContent, value: string) => {
    const updated = [...contents];
    updated[index] = { ...updated[index], [field]: value };
    setContents(updated);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hakkımızda Sayfası</h1>
          <p className="text-gray-600 mt-2">Hakkımızda sayfasındaki içerikleri düzenleyin</p>
        </div>
        {saved && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <FaSave />
            Kaydedildi!
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {contents.map((content, index) => (
          <div key={content.id || index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.section === 'hero' ? '🎯 Ana Bölüm' : '📊 İstatistik'}
                </label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                  placeholder="Başlık"
                  disabled={editingId !== null && editingId !== index}
                />
                <textarea
                  value={content.content}
                  onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                  rows={content.section === 'stats' ? 2 : 4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="İçerik"
                  disabled={editingId !== null && editingId !== index}
                />
              </div>
              <button
                onClick={() => {
                  if (editingId === index) {
                    handleSave(content);
                  } else {
                    setEditingId(index);
                  }
                }}
                className={`ml-4 px-6 py-2 rounded-lg font-medium transition-colors ${
                  editingId === index
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {editingId === index ? (
                  <span className="flex items-center gap-2">
                    <FaSave /> Kaydet
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FaEdit /> Düzenle
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Bölüm: {content.section}</span>
              <span>Sıra: {content.order}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-xl">
        <h3 className="font-semibold text-blue-900 mb-2">📌 Bilgi</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Ana Başlık:</strong> Hakkımızda sayfasının en üst başlığı</li>
          <li>• <strong>Slogan:</strong> Firmanızın sloganı</li>
          <li>• <strong>Açıklama:</strong> Firma hakkında detaylı bilgi</li>
          <li>• <strong>Deneyim Yılı:</strong> "15+" gibi istatistik değeri</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminAbout;
