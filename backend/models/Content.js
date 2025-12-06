import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  // Home Page
  homeTitle: {
    type: String,
    default: 'Welcome to Our Company'
  },
  homeSubtitle: {
    type: String,
    default: 'We provide excellent services'
  },
  homeDescription: {
    type: String,
    default: 'Your trusted partner in business solutions'
  },
  
  // About Page
  aboutTitle: {
    type: String,
    default: 'About Us'
  },
  aboutDescription: {
    type: String,
    default: 'We are a leading company in our industry...'
  },
  vision: {
    type: String,
    default: 'To be the leading provider of innovative solutions'
  },
  mission: {
    type: String,
    default: 'To deliver exceptional value to our clients'
  },
  
  // Services Page
  servicesTitle: {
    type: String,
    default: 'Our Services'
  },
  services: [{
    title: String,
    description: String,
    icon: String
  }],
  
  // Contact Page
  contactEmail: {
    type: String,
    default: 'contact@company.com'
  },
  contactPhone: {
    type: String,
    default: '+1 234 567 890'
  },
  contactAddress: {
    type: String,
    default: '123 Business Street, City, Country'
  },
  
  // Social Media
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  }
}, {
  timestamps: true
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
