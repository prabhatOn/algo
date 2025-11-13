import { sequelize, User, Broker, PlansCatalog } from './src/models/index.js';
import bcrypt from 'bcryptjs';
import process from 'process';

async function testSeed() {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully\n');

    console.log('Syncing models...');
    await sequelize.sync();
    console.log('✅ Models synced\n');

    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    const [admin, created] = await User.findOrCreate({
      where: { email: 'admin@algotrading.com' },
      defaults: {
        name: 'System Administrator',
        username: 'admin',
        email: 'admin@algotrading.com',
        phone: '+1234567890',
        password: hashedPassword,
        role: 'admin',
        status: 'Active',
        currency: 'IND',
        emailVerified: 'Yes',
        phoneVerified: 'Yes',
        clientType: 'Individual',
        kycStatus: 'Verified',
        verified: 'Yes'
      }
    });
    
    if (created) {
      console.log('✅ Admin user created:', admin.email);
    } else {
      console.log('ℹ️  Admin user already exists:', admin.email);
    }

    console.log('\nChecking admin user...');
    const adminCheck = await User.findOne({ where: { email: 'admin@algotrading.com' } });
    console.log('Admin found:', adminCheck ? '✅' : '❌');
    if (adminCheck) {
      console.log('  - Name:', adminCheck.name);
      console.log('  - Email:', adminCheck.email);
      console.log('  - Role:', adminCheck.role);
    }

    await sequelize.close();
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during test:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testSeed();
