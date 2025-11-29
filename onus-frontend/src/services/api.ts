import axios from 'axios';

// Environment variable veya default localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const getProjects = async (category?: string) => {
  const params = category ? { category } : {};
  const response = await api.get('/projects', { params });
  return response.data;
};

export const getProject = async (id: number) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (project: any) => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const updateProject = async (id: number, project: any) => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: number) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// Blog
export const getBlogPosts = async (category?: string) => {
  const params = category ? { category } : {};
  const response = await api.get('/blog', { params });
  return response.data;
};

export const getBlogPost = async (id: number) => {
  const response = await api.get(`/blog/${id}`);
  return response.data;
};

export const createBlogPost = async (post: any) => {
  const response = await api.post('/blog', post);
  return response.data;
};

export const updateBlogPost = async (id: number, post: any) => {
  const response = await api.put(`/blog/${id}`, post);
  return response.data;
};

export const deleteBlogPost = async (id: number) => {
  const response = await api.delete(`/blog/${id}`);
  return response.data;
};

// Contact
export const sendContactMessage = async (message: any) => {
  const response = await api.post('/contact', message);
  return response.data;
};

export const getContactMessages = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const markMessageAsRead = async (id: number) => {
  const response = await api.put(`/contact/${id}/read`);
  return response.data;
};

// Settings
export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const updateSettings = async (settings: any) => {
  const response = await api.put('/settings', settings);
  return response.data;
};

// Testimonials
export const getTestimonials = async () => {
  const response = await api.get('/testimonials');
  return response.data;
};

export const createTestimonial = async (testimonial: any) => {
  const response = await api.post('/testimonials', testimonial);
  return response.data;
};

export const approveTestimonial = async (id: number) => {
  const response = await api.put(`/testimonials/${id}/approve`);
  return response.data;
};

export const deleteTestimonial = async (id: number) => {
  const response = await api.delete(`/testimonials/${id}`);
  return response.data;
};

export default api;
