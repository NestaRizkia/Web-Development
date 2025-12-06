import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/600x400'
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile App', 'Branding', 'Marketing', 'Consulting', 'Other']
  },
  stats: [{
    label: String,
    value: String
  }],
  completedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
