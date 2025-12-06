import { useState, useEffect } from 'react';
import api from '../utils/api';
import Loading from '../components/Loading';

const Contact = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with us - we'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">{content?.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">{content?.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">{content?.contactAddress}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {content?.socialMedia && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {content.socialMedia.facebook && (
                      <a
                        href={content.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl hover:text-primary-600 transition-colors"
                      >
                        📘
                      </a>
                    )}
                    {content.socialMedia.twitter && (
                      <a
                        href={content.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl hover:text-primary-600 transition-colors"
                      >
                        🐦
                      </a>
                    )}
                    {content.socialMedia.linkedin && (
                      <a
                        href={content.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl hover:text-primary-600 transition-colors"
                      >
                        💼
                      </a>
                    )}
                    {content.socialMedia.instagram && (
                      <a
                        href={content.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl hover:text-primary-600 transition-colors"
                      >
                        📷
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="input-field resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
