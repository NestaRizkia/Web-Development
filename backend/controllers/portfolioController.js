import Portfolio from '../models/Portfolio.js';

// Get all portfolio items (public)
export const getAllPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ completedDate: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    console.error('Get all portfolio error:', error);
    res.status(500).json({ message: 'Error fetching portfolio items' });
  }
};

// Get single portfolio item (public)
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Get portfolio by ID error:', error);
    res.status(500).json({ message: 'Error fetching portfolio item' });
  }
};

// Create portfolio item (protected - admin only)
export const createPortfolio = async (req, res) => {
  try {
    const { client, title, description, imageUrl, category, stats } = req.body;
    
    const portfolio = await Portfolio.create({
      client,
      title,
      description,
      imageUrl,
      category,
      stats
    });
    
    res.status(201).json({
      message: 'Portfolio item created successfully',
      portfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ message: 'Error creating portfolio item' });
  }
};

// Update portfolio item (protected - admin only)
export const updatePortfolio = async (req, res) => {
  try {
    const { client, title, description, imageUrl, category, stats } = req.body;
    
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { client, title, description, imageUrl, category, stats },
      { new: true, runValidators: true }
    );
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.status(200).json({
      message: 'Portfolio item updated successfully',
      portfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Error updating portfolio item' });
  }
};

// Delete portfolio item (protected - admin only)
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.status(200).json({
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ message: 'Error deleting portfolio item' });
  }
};
