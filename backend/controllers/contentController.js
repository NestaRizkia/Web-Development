import Content from '../models/Content.js';

// Get all content (public)
export const getContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    
    // If no content exists, create default content
    if (!content) {
      content = await Content.create({});
    }
    
    res.status(200).json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Error fetching content' });
  }
};

// Update content (protected - admin only)
export const updateContent = async (req, res) => {
  try {
    const updateData = req.body;
    
    let content = await Content.findOne();
    
    if (!content) {
      content = await Content.create(updateData);
    } else {
      content = await Content.findOneAndUpdate(
        {},
        updateData,
        { new: true, runValidators: true }
      );
    }
    
    res.status(200).json({
      message: 'Content updated successfully',
      content
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Error updating content' });
  }
};
