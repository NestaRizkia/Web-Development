import { useState, useEffect } from 'react';
import api from '../utils/api';

const PortfolioManager = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    client: '',
    title: '',
    description: '',
    imageUrl: '',
    category: 'Web Development',
    stats: []
  });

  const [newStat, setNewStat] = useState({ label: '', value: '' });

  const categories = ['Web Development', 'Mobile App', 'Branding', 'Marketing', 'Consulting', 'Other'];

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await api.get('/portfolio');
      setPortfolios(response.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStat = () => {
    if (newStat.label && newStat.value) {
      setFormData({
        ...formData,
        stats: [...formData.stats, { ...newStat }]
      });
      setNewStat({ label: '', value: '' });
    }
  };

  const removeStat = (index) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      if (editingId) {
        await api.put(`/portfolio/${editingId}`, formData);
        setMessage({ type: 'success', text: 'Portfolio item updated successfully!' });
      } else {
        await api.post('/portfolio', formData);
        setMessage({ type: 'success', text: 'Portfolio item created successfully!' });
      }
      
      fetchPortfolios();
      resetForm();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      setMessage({ type: 'error', text: 'Failed to save portfolio item' });
    }
  };

  const handleEdit = (portfolio) => {
    setFormData({
      client: portfolio.client,
      title: portfolio.title,
      description: portfolio.description,
      imageUrl: portfolio.imageUrl,
      category: portfolio.category,
      stats: portfolio.stats || []
    });
    setEditingId(portfolio._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      await api.delete(`/portfolio/${id}`);
      setMessage({ type: 'success', text: 'Portfolio item deleted successfully!' });
      fetchPortfolios();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      setMessage({ type: 'error', text: 'Failed to delete portfolio item' });
    }
  };

  const resetForm = () => {
    setFormData({
      client: '',
      title: '',
      description: '',
      imageUrl: '',
      category: 'Web Development',
      stats: []
    });
    setEditingId(null);
    setIsFormOpen(false);
    setNewStat({ label: '', value: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Portfolio Manager</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
        >
          + Add Portfolio Item
        </button>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-400'
              : 'bg-red-100 text-red-800 border border-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Client Name</label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stats Section */}
              <div>
                <label className="label">Project Stats</label>
                <div className="space-y-2 mb-3">
                  {formData.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                      <span className="flex-1">{stat.label}: {stat.value}</span>
                      <button
                        type="button"
                        onClick={() => removeStat(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Label (e.g., Users)"
                    value={newStat.label}
                    onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                    className="input-field flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., 10,000+)"
                    value={newStat.value}
                    onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    onClick={addStat}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Portfolio List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <tr key={portfolio._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={portfolio.imageUrl}
                      alt={portfolio.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{portfolio.title}</td>
                  <td className="px-6 py-4">{portfolio.client}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                      {portfolio.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(portfolio)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(portfolio._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No portfolio items found. Click "Add Portfolio Item" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioManager;
