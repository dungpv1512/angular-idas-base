/**
 * Script để parse config từ ETCD.md và cập nhật environment.ts
 * 
 * Usage: 
 *   node scripts/parse-etcd-from-md.js [profile]
 *   node scripts/parse-etcd-from-md.js hung.dang
 */

const fs = require('fs');
const path = require('path');

// Get profile from command line argument or use default
const profile = process.argv[2] || 'dung.pham.demo';

// File paths
const ETCD_MD_FILE = path.join(__dirname, '../ETCD.md');
const ENV_FILE = path.join(__dirname, '../src/environments/environment.ts');
const ENV_PROD_FILE = path.join(__dirname, '../src/environments/environment.prod.ts');

console.log(`Using profile: ${profile}`);

/**
 * Parse ETCD config từ markdown file
 */
function parseETCDFromMarkdown() {
  console.log('Reading ETCD.md file...');
  const content = fs.readFileSync(ETCD_MD_FILE, 'utf8');
  
  // Try to find profile-specific section
  // Pattern: # Response API - <profile> ... "value":"..."
  const profileSectionPattern = new RegExp(
    `# Response API - ${profile}[\\s\\S]*?"value":"({[^}]+}[\\s\\S]*?)"\}\}`,
    'i'
  );
  
  let match = content.match(profileSectionPattern);
  
  // If not found, try alternative pattern with "## Profile:"
  if (!match) {
    const altPattern = new RegExp(
      `## Profile: ${profile}[\\s\\S]*?"value":"({[^}]+}[\\s\\S]*?)"\}\}`,
      'i'
    );
    match = content.match(altPattern);
  }
  
  // If still not found, return null to indicate no config
  if (!match) {
    console.log(`⚠️  Profile '${profile}' not found in ETCD.md`);
    return null;
  }
  
  console.log(`✓ Found config for profile: ${profile}`);
  
  // Unescape JSON string
  const jsonStr = match[1]
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
  
  const config = JSON.parse(jsonStr);
  console.log('✓ Config parsed successfully');
  
  return config;
}

/**
 * Đọc file environment hiện tại
 */
function readEnvironmentFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Parse environment object từ file content
 * Đơn giản hóa: chỉ giữ lại production flag, không parse toàn bộ object
 */
function parseEnvironmentObject(content) {
  // Chỉ cần biết là production hay không
  const isProduction = content.includes('production: true');
  return { production: isProduction };
}

/**
 * Build environment object từ ETCD config
 */
function buildEnvironmentFromETCD(etcdConfig, isProduction = false) {
  const newEnv = { production: isProduction };

  // Add AppConfig
  if (etcdConfig.AppConfig) {
    newEnv.appConfig = {
      webAppName: etcdConfig.AppConfig.WebAppName
    };
  }

  // Add GlobalAPIConfig
  if (etcdConfig.GlobalAPIConfig) {
    newEnv.apiEndpoints = {};
    
    Object.keys(etcdConfig.GlobalAPIConfig).forEach(key => {
      // Skip localhost URLs (keys starting with any number)
      // Skip empty values
      if (!/^\d/.test(key) && etcdConfig.GlobalAPIConfig[key]) {
        const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
        newEnv.apiEndpoints[camelKey] = etcdConfig.GlobalAPIConfig[key];
      }
    });
  }

  // Add RabbitMQ Config
  if (etcdConfig.RabbitMQConfig) {
    newEnv.rabbitMQ = {
      virtualHost: etcdConfig.RabbitMQConfig.VirtualHost,
      connectionString: etcdConfig.RabbitMQConfig.ConnectionString
    };
  }

  // Add Redis Cache Config
  if (etcdConfig.DistributedCacheConfig) {
    newEnv.redis = {
      enabled: etcdConfig.DistributedCacheConfig.Enabled,
      connectionString: etcdConfig.DistributedCacheConfig.ConnectionString
    };
  }

  // Add Identity Config
  if (etcdConfig.IdentityClientConfig) {
    newEnv.identity = {
      enabled: etcdConfig.IdentityClientConfig.Enabled,
      authority: etcdConfig.IdentityClientConfig.Authority
    };
  }

  // Add Feature Flags
  newEnv.features = {
    useOnlyOffice: etcdConfig.CommonISOConfig?.UseOnlyOffice || false,
    enableBieuMauDong: etcdConfig.BieuMauConfig?.EnableBieuMauDong || false,
    menuISO: etcdConfig.MenuConfig?.MenuISO || false
  };

  return newEnv;
}

/**
 * Generate environment file content
 */
function generateEnvironmentContent(env, isProduction = false) {
  const indent = '  ';
  
  let content = `// ETCD Profile: ${profile}\n`;
  content += `// Generated: ${new Date().toISOString()}\n\n`;
  content += `export const environment = {\n`;
  content += `${indent}production: ${isProduction},\n`;
  
  // Existing properties
  if (env.apiUrl) {
    content += `${indent}apiUrl: '${env.apiUrl}',\n`;
  }
  
  if (env.apiToken !== undefined) {
    const tokenComment = isProduction ? ' // Token sẽ được lấy từ localStorage trong production' : '';
    content += `${indent}apiToken: ${isProduction ? "''" : `'${env.apiToken}'`}${tokenComment}\n`;
  }

  // New properties from ETCD
  if (env.appConfig) {
    content += `\n${indent}// App Configuration (Profile: ${profile})\n`;
    content += `${indent}appConfig: {\n`;
    content += `${indent}${indent}webAppName: '${env.appConfig.webAppName}'\n`;
    content += `${indent}},\n`;
  }

  if (env.apiEndpoints) {
    content += `\n${indent}// API Endpoints from ETCD (Profile: ${profile})\n`;
    content += `${indent}apiEndpoints: {\n`;
    const keys = Object.keys(env.apiEndpoints);
    keys.forEach((key, index) => {
      const comma = index < keys.length - 1 ? ',' : '';
      content += `${indent}${indent}${key}: '${env.apiEndpoints[key]}'${comma}\n`;
    });
    content += `${indent}},\n`;
  }

  if (env.identity) {
    content += `\n${indent}// Identity Server\n`;
    content += `${indent}identity: {\n`;
    content += `${indent}${indent}enabled: ${env.identity.enabled},\n`;
    content += `${indent}${indent}authority: '${env.identity.authority}'\n`;
    content += `${indent}},\n`;
  }

  if (env.redis) {
    content += `\n${indent}// Redis Cache\n`;
    content += `${indent}redis: {\n`;
    content += `${indent}${indent}enabled: ${env.redis.enabled},\n`;
    content += `${indent}${indent}connectionString: '${env.redis.connectionString}'\n`;
    content += `${indent}},\n`;
  }

  if (env.rabbitMQ) {
    content += `\n${indent}// RabbitMQ\n`;
    content += `${indent}rabbitMQ: {\n`;
    content += `${indent}${indent}virtualHost: '${env.rabbitMQ.virtualHost}',\n`;
    content += `${indent}${indent}connectionString: '${env.rabbitMQ.connectionString}'\n`;
    content += `${indent}},\n`;
  }

  if (env.features) {
    content += `\n${indent}// Feature Flags\n`;
    content += `${indent}features: {\n`;
    content += `${indent}${indent}useOnlyOffice: ${env.features.useOnlyOffice},\n`;
    content += `${indent}${indent}enableBieuMauDong: ${env.features.enableBieuMauDong},\n`;
    content += `${indent}${indent}menuISO: ${env.features.menuISO}\n`;
    content += `${indent}}\n`;
  }

  content += `};\n`;
  
  return content;
}

/**
 * Main function
 */
function main() {
  try {
    console.log('=== ETCD Config Sync (from ETCD.md) ===\n');

    // 1. Parse config from ETCD.md
    const etcdConfig = parseETCDFromMarkdown();
    
    // If no config found, create empty environment
    if (!etcdConfig) {
      console.log('⚠️  No config found for this profile');
      console.log('Creating empty environment files...\n');
      
      const emptyEnv = {
        production: false,
        appConfig: {
          webAppName: `Empty Config - Profile: ${profile}`
        },
        apiEndpoints: {},
        identity: { enabled: false, authority: '' },
        redis: { enabled: false, connectionString: '' },
        rabbitMQ: { virtualHost: '', connectionString: '' },
        features: {
          useOnlyOffice: false,
          enableBieuMauDong: false,
          menuISO: false
        }
      };
      
      const emptyDevContent = generateEnvironmentContent(emptyEnv, false);
      const emptyProdContent = generateEnvironmentContent(emptyEnv, true);
      
      fs.writeFileSync(ENV_FILE, emptyDevContent, 'utf8');
      fs.writeFileSync(ENV_PROD_FILE, emptyProdContent, 'utf8');
      
      console.log('✓ Empty environment files created');
      console.log(`  - ${ENV_FILE}`);
      console.log(`  - ${ENV_PROD_FILE}\n`);
      console.log('⚠️  Warning: No API endpoints configured!');
      console.log('   Please add config for this profile to ETCD or ETCD.md\n');
      return;
    }

    // 2. Read current environment files (optional, chỉ để lấy production flag)
    console.log('Reading environment files...');
    let devContent = readEnvironmentFile(ENV_FILE);
    let prodContent = readEnvironmentFile(ENV_PROD_FILE);

    // Nếu không đọc được, tạo mới
    if (!devContent) {
      console.log('⚠️  environment.ts not found, will create new file');
      devContent = 'export const environment = { production: false };';
    }
    if (!prodContent) {
      console.log('⚠️  environment.prod.ts not found, will create new file');
      prodContent = 'export const environment = { production: true };';
    }

    // 3. Parse current environments (chỉ lấy production flag)
    const currentDevEnv = parseEnvironmentObject(devContent);
    const currentProdEnv = parseEnvironmentObject(prodContent);

    // 4. Build new configs từ ETCD
    console.log('Building configurations from ETCD...');
    const newDevEnv = buildEnvironmentFromETCD(etcdConfig, false);
    const newProdEnv = buildEnvironmentFromETCD(etcdConfig, true);

    // 5. Generate new file contents
    const newDevContent = generateEnvironmentContent(newDevEnv, false);
    const newProdContent = generateEnvironmentContent(newProdEnv, true);

    // 6. Write to files
    console.log('Writing to environment files...');
    fs.writeFileSync(ENV_FILE, newDevContent, 'utf8');
    fs.writeFileSync(ENV_PROD_FILE, newProdContent, 'utf8');

    console.log('\n✓ Environment files updated successfully!');
    console.log(`  - ${ENV_FILE}`);
    console.log(`  - ${ENV_PROD_FILE}`);
    
    console.log('\n=== Summary ===');
    console.log(`App Name: ${etcdConfig.AppConfig.WebAppName}`);
    console.log(`API Endpoints: ${Object.keys(newDevEnv.apiEndpoints || {}).length}`);
    console.log(`Features: ${Object.keys(newDevEnv.features || {}).length}`);
    console.log('\n✓ Done!');

  } catch (error) {
    console.error('\n✗ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run
main();
