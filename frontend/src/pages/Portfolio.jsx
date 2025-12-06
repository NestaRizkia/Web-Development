import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App', 'Branding', 'Marketing', 'Consulting', 'Other'];

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

  const filteredPortfolios = selectedCategory === 'All'
    ? portfolios
    : portfolios.filter(p => p.category === selectedCategory);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl">Discover our successful projects and client stories</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPortfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolios.map((portfolio) => (
                <Link
                  key={portfolio._id}
                  to={`/portfolio/${portfolio._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={portfolio.imageUrl}
                      alt={portfolio.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-semibold mb-2">
                      {portfolio.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {portfolio.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {portfolio.client}
                    </p>
                    <p className="text-gray-700 line-clamp-2">
                      {portfolio.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl">No portfolio items found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
