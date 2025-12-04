import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaBlog, FaCog, FaSignOutAlt, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
    { name: 'Projeler', path: '/admin/projects', icon: FaProjectDiagram },
    { name: 'Blog', path: '/admin/blog', icon: FaBlog },
    { name: 'Referanslar', path: '/admin/references', icon: FaHandshake },
    { name: 'Ayarlar', path: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-dark-900 text-white p-6">
      <div className="mb-10">
        <img src="/logo.svg" alt="ONUS" className="h-12 brightness-0 invert" />
        <p className="text-sm text-gray-400 mt-2">Admin Paneli</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <item.icon className="text-xl" />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeAdmin"
                  className="ml-auto w-1 h-6 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-6 left-6 right-6 flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
      >
        <FaSignOutAlt />
        <span className="font-medium">Çıkış Yap</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
