import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';

const Home = () => {
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {content?.homeTitle || 'Welcome to Our Company'}
            </h1>
            <p className="text-2xl md:text-3xl mb-6">
              {content?.homeSubtitle || 'Innovation Meets Excellence'}
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {content?.homeDescription || 'Your trusted partner in business solutions'}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/services"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">We deliver excellence in everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-primary-600 text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge solutions using the latest technologies
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-primary-600 text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-3">Expertise</h3>
              <p className="text-gray-600">
                Over 10 years of industry experience and knowledge
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-primary-600 text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Results</h3>
              <p className="text-gray-600">
                Proven track record of delivering successful projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Let's work together to bring your vision to life
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
