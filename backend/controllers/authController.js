// Auth Controller
export const login = async (req, res) => {
  try {
    const { password } = req.body;
    
    console.log('🔐 Login attempt');
    console.log('Session ID:', req.sessionID);
    console.log('Password provided:', !!password);
    console.log('ADMIN_PASSWORD set:', !!process.env.ADMIN_PASSWORD);
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    
    // Check password against environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      // Regenerate session to prevent session fixation
      req.session.regenerate((err) => {
        if (err) {
          console.error('❌ Session regenerate error:', err);
          return res.status(500).json({ message: 'Session error' });
        }
        
        // Set session data
        req.session.user = {
          isAdmin: true,
          loginTime: new Date().toISOString()
        };
        
        // Explicitly save session
        req.session.save((err) => {
          if (err) {
            console.error('❌ Session save error:', err);
            return res.status(500).json({ message: 'Session save failed' });
          }
          
          console.log('✅ Login successful');
          console.log('New Session ID:', req.sessionID);
          console.log('Session data:', req.session.user);
          
          return res.status(200).json({ 
            message: 'Login successful',
            user: { isAdmin: true }
          });
        });
      });
    } else {
      console.log('❌ Invalid password');
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('❌ Login error:', error);
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
