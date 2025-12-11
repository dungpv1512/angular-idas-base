/**
 * Script để fetch config từ ETCD và cập nhật environment.ts
 * 
 * Usage: 
 *   node scripts/fetch-etcd-config.js [profile]
 *   node scripts/fetch-etcd-config.js hung.dang
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Get profile from command line argument or use default
const profile = process.argv[2] || 'dung.pham.demo';

// ETCD Configuration
const ETCD_URL = 'http://192.168.100.108:2383/v3/get';
const CONFIG_KEY = `/Development/Profiles/${profile}/Constants/Install`;

console.log(`Using profile: ${profile}`);

// File paths
const ENV_FILE = path.join(__dirname, '../src/environments/environment.ts');
const ENV_PROD_FILE = path.join(__dirname, '../src/environments/environment.prod.ts');

/**
 * Fetch config từ ETCD
 */
function fetchETCDConfig() {
  return new Promise((resolve, reject) => {
    const url = `${ETCD_URL}?key=${encodeURIComponent(CONFIG_KEY)}`;
    
    console.log('Fetching config from ETCD...');
    console.log('URL:', url);

    const urlObj = new URL(url);
    const client = url.startsWith('https') ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'Cookie': 'ace-mode=json; _pk_id.1.b0fd=65101cb039aff696.1735879283.; tree-mode=path; etcd-endpoint=192.168.100.108:2379; _etcdkeeper_session=xCzOYmewZWruYY_nD10QBJMxGJL1yLSDHVsxj8Z2jec%3D',
        'Accept': 'application/json',
        'User-Agent': 'Node.js ETCD Config Fetcher'
      }
    };
    
    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          const config = JSON.parse(response.node.value);
          console.log('✓ Config fetched successfully');
          resolve(config);
        } catch (error) {
          reject(new Error('Failed to parse ETCD response: ' + error.message));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error('Failed to fetch from ETCD: ' + error.message));
    });

    req.end();
  });
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
 */
function parseEnvironmentObject(content) {
  const match = content.match(/export const environment = ({[\s\S]*?});/);
  if (match) {
    // Remove comments and parse
    const objStr = match[1]
      .replace(/\/\/.*$/gm, '') // Remove single line comments
      .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
    
    try {
      // Use Function constructor to safely evaluate the object
      return new Function('return ' + objStr)();
    } catch (error) {
      console.error('Error parsing environment object:', error.message);
      return {};
    }
  }
  return {};
}

/**
 * Merge ETCD config vào environment
 */
function mergeConfig(currentEnv, etcdConfig) {
  const newEnv = { ...currentEnv };

  // Add AppConfig
  if (etcdConfig.AppConfig) {
    newEnv.appConfig = {
      webAppName: etcdConfig.AppConfig.WebAppName
    };
  }

  // Add GlobalAPIConfig - chỉ thêm những API chưa có
  if (etcdConfig.GlobalAPIConfig) {
    newEnv.apiEndpoints = {};
    
    // Filter out localhost URLs (keys starting with any number) and empty values
    Object.keys(etcdConfig.GlobalAPIConfig).forEach(key => {
      if (!/^\d/.test(key) && etcdConfig.GlobalAPIConfig[key]) {
        // Convert key to camelCase
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
  
  let content = `export const environment = {\n`;
  content += `${indent}production: ${isProduction},\n`;
  
  // Add existing properties
  if (env.apiUrl) {
    content += `${indent}apiUrl: '${env.apiUrl}',\n`;
  }
  
  if (env.apiToken !== undefined) {
    content += `${indent}apiToken: ${isProduction ? "''" : `'${env.apiToken}'`},\n`;
  }

  // Add new properties from ETCD
  if (env.appConfig) {
    content += `\n${indent}// App Configuration\n`;
    content += `${indent}appConfig: {\n`;
    content += `${indent}${indent}webAppName: '${env.appConfig.webAppName}'\n`;
    content += `${indent}},\n`;
  }

  if (env.apiEndpoints) {
    content += `\n${indent}// API Endpoints from ETCD\n`;
    content += `${indent}apiEndpoints: {\n`;
    Object.keys(env.apiEndpoints).forEach((key, index, array) => {
      const comma = index < array.length - 1 ? ',' : '';
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
async function main() {
  try {
    console.log('=== ETCD Config Sync ===\n');

    // 1. Fetch config from ETCD
    const etcdConfig = await fetchETCDConfig();

    // 2. Read current environment files
    console.log('\nReading environment files...');
    const devContent = readEnvironmentFile(ENV_FILE);
    const prodContent = readEnvironmentFile(ENV_PROD_FILE);

    if (!devContent || !prodContent) {
      throw new Error('Failed to read environment files');
    }

    // 3. Parse current environments
    const currentDevEnv = parseEnvironmentObject(devContent);
    const currentProdEnv = parseEnvironmentObject(prodContent);

    // 4. Merge configs
    console.log('Merging configurations...');
    const newDevEnv = mergeConfig(currentDevEnv, etcdConfig);
    const newProdEnv = mergeConfig(currentProdEnv, etcdConfig);

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

  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
}

// Run
main();
