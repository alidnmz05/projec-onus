import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminHeroSlides from '../components/admin/AdminHeroSlides';
import AdminProjects from '../components/admin/AdminProjects';
import AdminBlog from '../components/admin/AdminBlog';
import AdminReferences from '../components/admin/AdminReferences';
import AdminSettings from '../components/admin/AdminSettings';
import AdminStatistics from '../components/admin/AdminStatistics';
import AdminTestimonials from '../components/admin/AdminTestimonials';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem('adminToken', 'authenticated');
      setIsAuthenticated(true);
      navigate('/admin/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/hero-slides" element={<AdminHeroSlides />} />
        <Route path="/statistics" element={<AdminStatistics />} />
        <Route path="/projects" element={<AdminProjects />} />
        <Route path="/testimonials" element={<AdminTestimonials />} />
        <Route path="/blog" element={<AdminBlog />} />
        <Route path="/references" element={<AdminReferences />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
