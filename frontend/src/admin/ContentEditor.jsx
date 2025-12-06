import { useState, useEffect } from 'react';
import api from '../utils/api';

const ContentEditor = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setContent({ ...content, [field]: value });
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...content.services];
    newServices[index][field] = value;
    setContent({ ...content, services: newServices });
  };

  const addService = () => {
    setContent({
      ...content,
      services: [
        ...content.services,
        { title: '', description: '', icon: 'code' }
      ]
    });
  };

  const removeService = (index) => {
    const newServices = content.services.filter((_, i) => i !== index);
    setContent({ ...content, services: newServices });
  };

  const handleSocialMediaChange = (platform, value) => {
    setContent({
      ...content,
      socialMedia: {
        ...content.socialMedia,
        [platform]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put('/content', content);
      setMessage({ type: 'success', text: 'Content saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Failed to save content' });
    } finally {
      setSaving(false);
    }
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
      <h1 className="text-4xl font-bold mb-8">Content Editor</h1>

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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Home Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Home Page</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={content.homeTitle || ''}
                onChange={(e) => handleChange('homeTitle', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Subtitle</label>
              <input
                type="text"
                value={content.homeSubtitle || ''}
                onChange={(e) => handleChange('homeSubtitle', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                value={content.homeDescription || ''}
                onChange={(e) => handleChange('homeDescription', e.target.value)}
                className="input-field"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">About Page</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={content.aboutTitle || ''}
                onChange={(e) => handleChange('aboutTitle', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                value={content.aboutDescription || ''}
                onChange={(e) => handleChange('aboutDescription', e.target.value)}
                className="input-field"
                rows="5"
              />
            </div>
            <div>
              <label className="label">Vision</label>
              <textarea
                value={content.vision || ''}
                onChange={(e) => handleChange('vision', e.target.value)}
                className="input-field"
                rows="3"
              />
            </div>
            <div>
              <label className="label">Mission</label>
              <textarea
                value={content.mission || ''}
                onChange={(e) => handleChange('mission', e.target.value)}
                className="input-field"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Services</h2>
            <button
              type="button"
              onClick={addService}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Service
            </button>
          </div>
          <div>
            <label className="label">Services Title</label>
            <input
              type="text"
              value={content.servicesTitle || ''}
              onChange={(e) => handleChange('servicesTitle', e.target.value)}
              className="input-field mb-4"
            />
          </div>
          <div className="space-y-4">
            {content.services?.map((service, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Service {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="label">Title</label>
                    <input
                      type="text"
                      value={service.title || ''}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Description</label>
                    <textarea
                      value={service.description || ''}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="input-field"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="label">Icon</label>
                    <select
                      value={service.icon || 'code'}
                      onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                      className="input-field"
                    >
                      <option value="code">💻 Code</option>
                      <option value="mobile">📱 Mobile</option>
                      <option value="cloud">☁️ Cloud</option>
                      <option value="chart">📊 Chart</option>
                      <option value="palette">🎨 Palette</option>
                      <option value="briefcase">💼 Briefcase</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={content.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                type="text"
                value={content.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Address</label>
              <textarea
                value={content.contactAddress || ''}
                onChange={(e) => handleChange('contactAddress', e.target.value)}
                className="input-field"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Facebook URL</label>
              <input
                type="url"
                value={content.socialMedia?.facebook || ''}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Twitter URL</label>
              <input
                type="url"
                value={content.socialMedia?.twitter || ''}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">LinkedIn URL</label>
              <input
                type="url"
                value={content.socialMedia?.linkedin || ''}
                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Instagram URL</label>
              <input
                type="url"
                value={content.socialMedia?.instagram || ''}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentEditor;
