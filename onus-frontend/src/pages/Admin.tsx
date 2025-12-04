import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminProjects from '../components/admin/AdminProjects';
import AdminBlog from '../components/admin/AdminBlog';
import AdminReferences from '../components/admin/AdminReferences';
import AdminSettings from '../components/admin/AdminSettings';
import AdminSidebar from '../components/admin/AdminSidebar';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/projects" element={<AdminProjects />} />
          <Route path="/blog" element={<AdminBlog />} />
          <Route path="/references" element={<AdminReferences />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
