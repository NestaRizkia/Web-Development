import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    servicesCount: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [portfolioRes, contentRes] = await Promise.all([
        api.get('/portfolio'),
        api.get('/content')
      ]);

      setStats({
        portfolioCount: portfolioRes.data.length,
        servicesCount: contentRes.data.services?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">Portfolio Items</p>
              <p className="text-4xl font-bold text-primary-600">{stats.portfolioCount}</p>
            </div>
            <div className="text-5xl">📁</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">Services</p>
              <p className="text-4xl font-bold text-primary-600">{stats.servicesCount}</p>
            </div>
            <div className="text-5xl">⚙️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
            <div className="text-5xl">✅</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/content"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
          >
            <div className="text-4xl">📝</div>
            <div>
              <h3 className="font-semibold text-lg">Edit Content</h3>
              <p className="text-gray-600">Update company profile and services</p>
            </div>
          </Link>

          <Link
            to="/admin/portfolio"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
          >
            <div className="text-4xl">📁</div>
            <div>
              <h3 className="font-semibold text-lg">Manage Portfolio</h3>
              <p className="text-gray-600">Add, edit, or remove portfolio items</p>
            </div>
          </Link>

          <a
            href="/"
            target="_blank"
            className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
          >
            <div className="text-4xl">🌐</div>
            <div>
              <h3 className="font-semibold text-lg">View Website</h3>
              <p className="text-gray-600">See your changes live</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
