import { useState, useEffect } from 'react';
import api from '../utils/api';
import Loading from '../components/Loading';

const Services = () => {
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

  const iconMap = {
    code: '💻',
    mobile: '📱',
    cloud: '☁️',
    chart: '📊',
    palette: '🎨',
    briefcase: '💼'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">
            {content?.servicesTitle || 'Our Services'}
          </h1>
          <p className="text-xl">Comprehensive solutions for your business needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content?.services && content.services.length > 0 ? (
              content.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-5xl mb-4">
                    {iconMap[service.icon] || '⚙️'}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                No services available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We can tailor our services to meet your specific requirements
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
