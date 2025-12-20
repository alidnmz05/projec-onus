import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaImage, 
  FaChartBar,
  FaProjectDiagram, 
  FaComments,
  FaBlog, 
  FaHandshake,
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const AdminLayout = ({ children, onLogout }: AdminLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Ana Sayfa Slaytları', path: '/admin/hero-slides', icon: FaImage },
    { name: 'İstatistikler', path: '/admin/statistics', icon: FaChartBar },
    { name: 'Projeler', path: '/admin/projects', icon: FaProjectDiagram },
    { name: 'Yorumlar', path: '/admin/testimonials', icon: FaComments },
    { name: 'Blog', path: '/admin/blog', icon: FaBlog },
    { name: 'Referanslar', path: '/admin/references', icon: FaHandshake },
    { name: 'Ayarlar', path: '/admin/settings', icon: FaCog },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-primary-500">ONUS</h1>
                  <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon className={`text-lg ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto w-1 h-6 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-6 left-6 right-6">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
                >
                  <FaSignOutAlt />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaBars className="text-gray-600" size={20} />
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Yönetici</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
