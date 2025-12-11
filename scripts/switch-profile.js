/**
 * Script để switch profile và fetch config trong một lệnh
 * 
 * Usage: 
 *   npm run profile -- hung.dang
 *   npm run profile -- dung.pham.demo
 * 
 * Chức năng:
 * 1. Lưu profile vào .env
 * 2. Tự động fetch config từ ETCD server
 * 3. Nếu ETCD không available, fallback sang ETCD.md
 * 4. Cập nhật environment files
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get profile from command line
const profile = process.argv[2];

if (!profile) {
  console.error('❌ Error: Profile name is required\n');
  console.log('Usage:');
  console.log('  npm run profile -- hung.dang');
  console.log('  npm run profile -- dung.pham.demo');
  console.log('  npm run profile -- <profile-name>\n');
  console.log('Examples:');
  console.log('  npm run profile -- hung.dang          # Switch to hung.dang profile');
  console.log('  npm run profile -- dung.pham.demo     # Switch to dung.pham.demo profile');
  process.exit(1);
}

console.log('╔════════════════════════════════════════╗');
console.log('║     ETCD Profile Switcher & Sync      ║');
console.log('╚════════════════════════════════════════╝\n');
console.log(`📋 Target Profile: ${profile}\n`);

// Create .env file to store current profile
const envFile = path.join(__dirname, '../.env');
const envContent = `ETCD_PROFILE=${profile}\nETCD_URL=http://192.168.100.108:2383/v3/get\n`;

try {
  // Step 1: Save profile to .env
  console.log('Step 1/3: Saving profile...');
  fs.writeFileSync(envFile, envContent, 'utf8');
  console.log('✓ Profile saved to .env\n');

  // Step 2: Try to fetch from ETCD server first
  console.log('Step 2/3: Fetching config from ETCD...');
  console.log(`🔗 ETCD Key: /Development/Profiles/${profile}/Constants/Install\n`);
  
  let fetchSuccess = false;
  try {
    execSync(`node scripts/fetch-etcd-config.js ${profile}`, { 
      stdio: 'inherit',
      timeout: 5000 // 5 second timeout
    });
    fetchSuccess = true;
    console.log('\n✓ Config fetched from ETCD server successfully!\n');
  } catch (error) {
    // If ETCD fetch fails, try parsing from ETCD.md
    console.log('\n⚠️  ETCD server not accessible, using ETCD.md as fallback...\n');
    execSync(`node scripts/parse-etcd-from-md.js ${profile}`, { 
      stdio: 'inherit' 
    });
    console.log('\n✓ Config parsed from ETCD.md successfully!\n');
  }

  // Step 3: Summary
  console.log('Step 3/3: Finalizing...');
  console.log('✓ Environment files updated\n');

  console.log('╔════════════════════════════════════════╗');
  console.log('║          Switch Complete! ✓           ║');
  console.log('╚════════════════════════════════════════╝\n');
  console.log(`📌 Current Profile: ${profile}`);
  console.log(`📁 Config Source: ${fetchSuccess ? 'ETCD Server' : 'ETCD.md'}`);
  console.log(`📝 Files Updated:`);
  console.log(`   - src/environments/environment.ts`);
  console.log(`   - src/environments/environment.prod.ts`);
  console.log(`   - .env\n`);
  console.log('🚀 Ready to start development!\n');

} catch (error) {
  console.error('\n╔════════════════════════════════════════╗');
  console.error('║              Error! ✗                 ║');
  console.error('╚════════════════════════════════════════╝\n');
  console.error(`❌ ${error.message}\n`);
  process.exit(1);
}
