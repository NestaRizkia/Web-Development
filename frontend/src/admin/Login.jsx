import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔐 Attempting login...');
      const response = await api.post('/auth/login', { password });
      
      console.log('✅ Login response:', response.data);
      
      if (response.data && response.data.message === 'Login successful') {
        console.log('🔄 Waiting for session to persist...');
        // Tunggu 2 detik untuk memastikan session tersimpan ke MongoDB
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verifikasi session multiple times jika perlu
        console.log('🔍 Verifying session...');
        let attempts = 0;
        let verified = false;
        
        while (attempts < 3 && !verified) {
          try {
            const verifyResponse = await api.get('/auth/verify');
            console.log(`✅ Verification attempt ${attempts + 1}:`, verifyResponse.data);
            
            if (verifyResponse.data.authenticated) {
              verified = true;
              console.log('🎉 Session verified! Navigating to dashboard...');
              navigate('/admin/dashboard', { replace: true });
              return;
            }
          } catch (verifyErr) {
            console.log(`❌ Verification attempt ${attempts + 1} failed:`, verifyErr);
          }
          
          attempts++;
          if (!verified && attempts < 3) {
            console.log('⏳ Waiting before retry...');
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        if (!verified) {
          console.error('❌ Session verification failed after 3 attempts');
          setError('Session verification failed. Please try again or check console logs.');
        }
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Enter your password to access the CMS</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-primary-600 hover:text-primary-700">
            ← Back to Home
          </a>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
          <p className="font-semibold mb-1">Default credentials:</p>
          <p>Password: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
