// Auth Controller
export const login = async (req, res) => {
  try {
    const { password } = req.body;
    
    console.log('Login attempt - Password provided:', !!password);
    console.log('Environment ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? 'Set' : 'Not set');
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    
    // Check password against environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      // Set session
      req.session.user = {
        isAdmin: true,
        loginTime: new Date()
      };
      
      // Save session explicitly
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      
      console.log('Login successful, session created:', req.sessionID);
      
      return res.status(200).json({ 
        message: 'Login successful',
        user: { isAdmin: true }
      });
    } else {
      console.log('Invalid password attempt');
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const verify = async (req, res) => {
  try {
    console.log('🔍 Verify request - Session ID:', req.sessionID);
    console.log('📦 Session data:', req.session);
    console.log('👤 Session user:', req.session?.user);
    
    if (req.session && req.session.user && req.session.user.isAdmin) {
      console.log('✅ Session valid - authenticated');
      return res.status(200).json({ 
        authenticated: true,
        user: { isAdmin: true }
      });
    } else {
      console.log('❌ Session invalid - not authenticated');
      return res.status(401).json({ 
        authenticated: false,
        message: 'Not authenticated'
      });
    }
  } catch (error) {
    console.error('❌ Verify error:', error);
    res.status(500).json({ message: 'Server error during verification' });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};
