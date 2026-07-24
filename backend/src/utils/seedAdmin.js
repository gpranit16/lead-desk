import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

/**
 * Script to create/seed initial admin user
 * Usage: npm run seed
 */
const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is missing in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB Atlas...');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@leaddesk.pro';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminName = process.env.ADMIN_NAME || 'Super Admin';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`[Seed] Admin user already exists: ${adminEmail}`);
      process.exit(0);
    }

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword
    });

    console.log('----------------------------------------------------');
    console.log(' Successfully Created Default Admin Account!');
    console.log(` Email: ${admin.email}`);
    console.log(` Password: ${adminPassword}`);
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Failed to seed admin user: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
