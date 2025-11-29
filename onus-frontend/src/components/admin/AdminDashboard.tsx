import { motion } from 'framer-motion';
import { FaProjectDiagram, FaBlog, FaUsers, FaEye, FaChartLine, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
  const stats = [
    { title: 'Toplam Proje', value: '127', icon: FaProjectDiagram, color: 'bg-blue-500' },
    { title: 'Blog Yazısı', value: '45', icon: FaBlog, color: 'bg-green-500' },
    { title: 'Müşteriler', value: '89', icon: FaUsers, color: 'bg-purple-500' },
    { title: 'Toplam Görüntülenme', value: '12.5K', icon: FaEye, color: 'bg-yellow-500' },
  ];

  const recentProjects = [
    { name: 'Modern Mutfak - Ahmet Bey', status: 'Devam Ediyor', date: '25 Kas 2024' },
    { name: 'Lüks Banyo - Ayşe Hanım', status: 'Tamamlandı', date: '23 Kas 2024' },
    { name: 'Özel Dolap - Mehmet Bey', status: 'Beklemede', date: '20 Kas 2024' },
  ];

  const recentActivities = [
    { action: 'Yeni proje eklendi', time: '2 saat önce' },
    { action: 'Blog yazısı yayınlandı', time: '5 saat önce' },
    { action: 'Müşteri mesajı alındı', time: '1 gün önce' },
    { action: 'Proje güncellendi', time: '2 gün önce' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Dashboard</h1>
        <p className="text-dark-600 mt-2">Hoş geldiniz! İşte genel bakış...</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <FaChartLine className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-dark-900 mb-1">{stat.value}</h3>
            <p className="text-dark-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-dark-900 mb-4">Son Projeler</h2>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-dark-900">{project.name}</h3>
                  <p className="text-sm text-dark-600">{project.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Tamamlandı' ? 'bg-green-100 text-green-600' :
                  project.status === 'Devam Ediyor' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-dark-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <FaClock className="text-primary-600 mt-1" />
                <div>
                  <p className="text-dark-900">{activity.action}</p>
                  <p className="text-sm text-dark-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
