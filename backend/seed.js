import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';
import Portfolio from './models/Portfolio.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Content.deleteMany({});
    await Portfolio.deleteMany({});
    console.log('Existing data cleared.');

    // Seed Content
    const content = await Content.create({
      homeTitle: 'Welcome to TechVision Solutions',
      homeSubtitle: 'Innovation Meets Excellence',
      homeDescription: 'We are a leading technology company providing cutting-edge solutions for businesses worldwide.',
      
      aboutTitle: 'About TechVision Solutions',
      aboutDescription: 'TechVision Solutions is a premier technology consulting firm with over 10 years of experience in delivering innovative digital solutions. We specialize in web development, mobile applications, cloud services, and digital transformation.',
      vision: 'To be the global leader in technology innovation, empowering businesses to achieve their full potential through cutting-edge digital solutions.',
      mission: 'To deliver exceptional value to our clients by providing innovative, reliable, and scalable technology solutions that drive business growth and success.',
      
      servicesTitle: 'Our Services',
      services: [
        {
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies and best practices.',
          icon: 'code'
        },
        {
          title: 'Mobile Applications',
          description: 'Native and cross-platform mobile apps for iOS and Android.',
          icon: 'mobile'
        },
        {
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and migration services.',
          icon: 'cloud'
        },
        {
          title: 'Digital Marketing',
          description: 'Strategic digital marketing campaigns to grow your brand.',
          icon: 'chart'
        },
        {
          title: 'UI/UX Design',
          description: 'Beautiful and intuitive user interfaces that enhance user experience.',
          icon: 'palette'
        },
        {
          title: 'Consulting',
          description: 'Expert technology consulting to guide your digital transformation.',
          icon: 'briefcase'
        }
      ],
      
      contactEmail: 'hello@techvision.com',
      contactPhone: '+1 (555) 123-4567',
      contactAddress: '123 Innovation Drive, Tech City, TC 12345, USA',
      
      socialMedia: {
        facebook: 'https://facebook.com/techvision',
        twitter: 'https://twitter.com/techvision',
        linkedin: 'https://linkedin.com/company/techvision',
        instagram: 'https://instagram.com/techvision'
      }
    });
    console.log('Content seeded successfully.');

    // Seed Portfolio
    const portfolios = await Portfolio.create([
      {
        client: 'Acme Corporation',
        title: 'E-Commerce Platform Redesign',
        description: 'Complete redesign and development of a modern e-commerce platform with integrated payment gateway, inventory management, and analytics dashboard. The platform handles over 10,000 daily transactions.',
        imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800',
        category: 'Web Development',
        stats: [
          { label: 'Daily Transactions', value: '10,000+' },
          { label: 'Performance Increase', value: '300%' },
          { label: 'User Satisfaction', value: '98%' }
        ],
        completedDate: new Date('2024-10-15')
      },
      {
        client: 'FitLife Gym',
        title: 'Fitness Tracking Mobile App',
        description: 'Native iOS and Android app for fitness tracking, workout planning, and nutrition monitoring. Features include social sharing, progress tracking, and personalized workout recommendations.',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
        category: 'Mobile App',
        stats: [
          { label: 'Active Users', value: '50,000+' },
          { label: 'App Rating', value: '4.8/5' },
          { label: 'Daily Active Users', value: '15,000' }
        ],
        completedDate: new Date('2024-09-20')
      },
      {
        client: 'GreenLeaf Organics',
        title: 'Brand Identity & Marketing Campaign',
        description: 'Complete brand identity redesign including logo, marketing materials, and digital marketing campaign. Resulted in 250% increase in brand awareness and 180% increase in sales.',
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
        category: 'Branding',
        stats: [
          { label: 'Brand Awareness', value: '+250%' },
          { label: 'Sales Increase', value: '+180%' },
          { label: 'Social Reach', value: '1M+' }
        ],
        completedDate: new Date('2024-08-10')
      },
      {
        client: 'CloudTech Systems',
        title: 'Cloud Migration & Infrastructure',
        description: 'Enterprise cloud migration from on-premise servers to AWS. Includes infrastructure setup, data migration, security implementation, and ongoing support.',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        category: 'Consulting',
        stats: [
          { label: 'Cost Reduction', value: '40%' },
          { label: 'Uptime', value: '99.99%' },
          { label: 'Migration Time', value: '3 months' }
        ],
        completedDate: new Date('2024-07-05')
      },
      {
        client: 'EduLearn Platform',
        title: 'Online Learning Management System',
        description: 'Comprehensive learning management system with video streaming, live classes, assignments, quizzes, and progress tracking. Supports over 100,000 concurrent users.',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
        category: 'Web Development',
        stats: [
          { label: 'Students', value: '100,000+' },
          { label: 'Courses', value: '5,000+' },
          { label: 'Completion Rate', value: '87%' }
        ],
        completedDate: new Date('2024-06-15')
      },
      {
        client: 'RetailHub',
        title: 'Inventory Management System',
        description: 'Real-time inventory management system with barcode scanning, automated reordering, supplier integration, and comprehensive reporting dashboard.',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
        category: 'Web Development',
        stats: [
          { label: 'Inventory Accuracy', value: '99.5%' },
          { label: 'Time Saved', value: '60%' },
          { label: 'Warehouses', value: '25' }
        ],
        completedDate: new Date('2024-05-20')
      }
    ]);
    console.log('Portfolio items seeded successfully.');

    console.log('\n=== Seeding Complete ===');
    console.log(`Content documents: ${(await Content.countDocuments())}`);
    console.log(`Portfolio documents: ${(await Portfolio.countDocuments())}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
