// Middleware to check if user is authenticated via session
export const requireAuth = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    return next();
  }
  
  return res.status(401).json({ 
    message: 'Unauthorized. Please login first.' 
  });
};
