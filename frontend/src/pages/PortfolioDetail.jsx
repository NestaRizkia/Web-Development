import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';

const PortfolioDetail = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  const fetchPortfolio = async () => {
    try {
      const response = await api.get(`/portfolio/${id}`);
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Portfolio not found</h2>
          <Link to="/portfolio" className="text-primary-600 hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/portfolio"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={portfolio.imageUrl}
              alt={portfolio.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold">
                {portfolio.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {portfolio.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Client: <span className="font-semibold">{portfolio.client}</span>
            </p>

            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {portfolio.description}
              </p>
            </div>

            {/* Stats */}
            {portfolio.stats && portfolio.stats.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Project Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {portfolio.stats.map((stat, index) => (
                    <div key={index} className="bg-primary-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-700 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completion Date */}
            <div className="mt-8 pt-8 border-t">
              <p className="text-gray-600">
                Completed: {new Date(portfolio.completedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;
