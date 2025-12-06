// Auth Controller
export const login = async (req, res) => {
  try {
    const { password } = req.body;
    
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
      
      return res.status(200).json({ 
        message: 'Login successful',
        user: { isAdmin: true }
      });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const verify = async (req, res) => {
  try {
    if (req.session && req.session.user && req.session.user.isAdmin) {
      return res.status(200).json({ 
        authenticated: true,
        user: { isAdmin: true }
      });
    } else {
      return res.status(401).json({ 
        authenticated: false,
        message: 'Not authenticated'
      });
    }
  } catch (error) {
    console.error('Verify error:', error);
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
