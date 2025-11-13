import bcrypt from 'bcryptjs';
import process from 'process';
import { User } from './src/models/index.js';

async function testLogin() {
  try {
    console.log('🔍 Testing admin login...\n');

    // Find admin user
    const admin = await User.findOne({ where: { email: 'admin@algotrading.com' } });
    
    if (!admin) {
      console.log('❌ Admin user not found in database');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log('   - Email:', admin.email);
    console.log('   - Role:', admin.role);
    console.log('   - Status:', admin.status);
    console.log('   - Password hash exists:', !!admin.password);
    console.log('   - Password hash length:', admin.password?.length);
    console.log('   - Password hash starts with $2a$:', admin.password?.startsWith('$2a$'));
    console.log('   - Password hash:', admin.password?.substring(0, 20) + '...\n');

    // Test password comparison
    const testPassword = 'Admin@123';
    console.log('🔑 Testing password:', testPassword);
    
    const isValid = await bcrypt.compare(testPassword, admin.password);
    console.log('   - Password match:', isValid ? '✅ YES' : '❌ NO');

    if (!isValid) {
      console.log('\n🔧 Fixing password...');
      const newHash = await bcrypt.hash(testPassword, 12);
      await admin.update({ password: newHash });
      console.log('✅ Password updated successfully');
      
      // Test again
      const admin2 = await User.findOne({ where: { email: 'admin@algotrading.com' } });
      const isValid2 = await bcrypt.compare(testPassword, admin2.password);
      console.log('   - Password match after fix:', isValid2 ? '✅ YES' : '❌ NO');
    }

    console.log('\n✅ Test completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testLogin();
