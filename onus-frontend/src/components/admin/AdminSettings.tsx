import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5177/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    id: 1,
    siteName: 'ONUS Mutfak & Banyo',
    email: 'info@onus.com.tr',
    phone: '+90 555 555 55 55',
    address: 'Doğanın Çırağı, Ahşabın Ustası\nİstanbul, Türkiye',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    whatsAppNumber: '+905555555555',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/settings`);
      if (response.data && response.data.length > 0) {
        setSettings(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/settings/${settings.id}`, settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('Ayarlar kaydedildi');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Ayarlar kaydedilirken hata oluştu');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Ayarlar</h1>
        <p className="text-dark-600 mt-2">Site ayarlarını yönetin</p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-dark-900 mb-6">Genel Ayarlar</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-dark-700 font-medium mb-2">
                Site Adı
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-dark-700 font-medium mb-2 flex items-center space-x-2">
                <FaEnvelope className="text-primary-600" />
                <span>E-posta</span>
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-dark-700 font-medium mb-2 flex items-center space-x-2">
                <FaPhone className="text-primary-600" />
                <span>Telefon</span>
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-dark-700 font-medium mb-2 flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary-600" />
                <span>Adres</span>
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                rows={3}
              />
            </div>

            <hr className="my-8" />

            <h3 className="text-lg font-bold text-dark-900 mb-4">Sosyal Medya</h3>

            <div>
              <label className="block text-dark-700 font-medium mb-2 flex items-center space-x-2">
                <FaFacebook className="text-blue-600" />
                <span>Facebook</span>
              </label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-dark-700 font-medium mb-2 flex items-center space-x-2">
                <FaInstagram className="text-pink-600" />
                <span>Instagram</span>
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-dark-700 font-medium mb-2">
                WhatsApp Numarası
              </label>
              <input
                type="tel"
                value={settings.whatsAppNumber}
                onChange={(e) => setSettings({ ...settings, whatsAppNumber: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none"
                placeholder="+905555555555"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-bold text-lg transition-all ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {saved ? (
                <>
                  <span>✓</span>
                  <span>Kaydedildi!</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Ayarları Kaydet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
