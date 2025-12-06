import { useState, useEffect } from 'react';
import api from '../utils/api';
import Loading from '../components/Loading';

const About = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">
            {content?.aboutTitle || 'About Us'}
          </h1>
          <p className="text-xl">Learn more about our company and what we do</p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {content?.aboutDescription || 'We are a leading company in our industry...'}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-primary-50 rounded-lg p-8">
              <div className="text-primary-600 text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-4 text-primary-800">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                {content?.vision || 'To be the leading provider of innovative solutions'}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-primary-50 rounded-lg p-8">
              <div className="text-primary-600 text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-primary-800">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                {content?.mission || 'To deliver exceptional value to our clients'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">We operate with honesty and transparency</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for the highest quality</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">We embrace new ideas and technologies</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p className="text-gray-600">We love what we do</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
