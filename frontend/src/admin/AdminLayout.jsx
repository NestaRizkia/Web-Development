import { useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import api from '../utils/api';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await api.get('/auth/verify');
    } catch (error) {
      navigate('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-primary-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="text-2xl font-bold">Admin CMS</span>
              <div className="hidden md:flex gap-6">
                <Link
                  to="/admin/dashboard"
                  className={`${
                    isActive('/admin/dashboard')
                      ? 'text-white font-semibold border-b-2 border-white'
                      : 'text-primary-100 hover:text-white'
                  } py-5 transition-colors`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/content"
                  className={`${
                    isActive('/admin/content')
                      ? 'text-white font-semibold border-b-2 border-white'
                      : 'text-primary-100 hover:text-white'
                  } py-5 transition-colors`}
                >
                  Content Editor
                </Link>
                <Link
                  to="/admin/portfolio"
                  className={`${
                    isActive('/admin/portfolio')
                      ? 'text-white font-semibold border-b-2 border-white'
                      : 'text-primary-100 hover:text-white'
                  } py-5 transition-colors`}
                >
                  Portfolio Manager
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="text-primary-100 hover:text-white transition-colors"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
