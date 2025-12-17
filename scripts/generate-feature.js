#!/usr/bin/env node

/**
 * Feature Generator Script
 * Tạo cấu trúc feature mới theo chuẩn
 *
 * Usage: node scripts/generate-feature.js <feature-name> [--domain <domain>]
 *
 * Ví dụ:
 *   node scripts/generate-feature.js employee
 *   node scripts/generate-feature.js employee --domain hr
 */

const fs = require('fs');
const path = require('path');

// Lấy arguments
const args = process.argv.slice(2);
const featureName = args[0];
const domainIndex = args.indexOf('--domain');
const domain = domainIndex !== -1 ? args[domainIndex + 1] : null;

if (!featureName) {
  console.error('❌ Vui lòng cung cấp tên feature');
  console.log('Usage: node scripts/generate-feature.js <feature-name> [--domain <domain>]');
  process.exit(1);
}

// Helper functions
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toUpperCase(str) {
  return str.toUpperCase().replace(/-/g, '_');
}

function toTitleCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Tạo các biến thay thế
const replacements = {
  '{{FEATURE_NAME}}': featureName,
  '{{FEATURE_NAME_PASCAL}}': toPascalCase(featureName),
  '{{FEATURE_NAME_UPPER}}': toUpperCase(featureName),
  '{{FEATURE_NAME_TITLE}}': toTitleCase(featureName),
  '{{FEATURE_NAME_PLURAL}}': featureName + 's',
  '{{FEATURE_DESCRIPTION}}': `Feature quản lý ${toTitleCase(featureName)}`
};

// Đường dẫn
const basePath = domain
  ? path.join(__dirname, '..', 'src', 'app', 'features', domain, featureName)
  : path.join(__dirname, '..', 'src', 'app', 'features', featureName);

const templatePath = path.join(__dirname, 'templates', 'feature');

// Cấu trúc thư mục cần tạo
const directories = ['routes', 'pages', 'components', 'services', 'models', 'store', 'constants'];

// Files cần tạo từ template
const templateFiles = [
  { template: 'feature.feature.ts.template', output: `${featureName}.feature.ts` },
  { template: 'feature.routes.ts.template', output: `routes/${featureName}.routes.ts` },
  { template: 'feature-api.service.ts.template', output: `services/${featureName}-api.service.ts` },
  { template: 'feature.store.ts.template', output: `store/${featureName}.store.ts` },
  { template: 'feature.model.ts.template', output: `models/${featureName}.model.ts` },
  { template: 'feature-filter.model.ts.template', output: `models/${featureName}-filter.model.ts` }
];

// Tạo thư mục
console.log(`\n🚀 Tạo feature: ${featureName}`);
if (domain) {
  console.log(`📁 Domain: ${domain}`);
}
console.log(`📍 Path: ${basePath}\n`);

// Tạo thư mục gốc
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

// Tạo các thư mục con
directories.forEach((dir) => {
  const dirPath = path.join(basePath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created: ${dir}/`);
  }
});

// Tạo files từ template
templateFiles.forEach(({ template, output }) => {
  const templateFilePath = path.join(templatePath, template);
  const outputFilePath = path.join(basePath, output);

  if (fs.existsSync(templateFilePath)) {
    let content = fs.readFileSync(templateFilePath, 'utf8');

    // Thay thế các placeholders
    Object.entries(replacements).forEach(([key, value]) => {
      content = content.replace(new RegExp(key, 'g'), value);
    });

    fs.writeFileSync(outputFilePath, content);
    console.log(`✅ Created: ${output}`);
  } else {
    console.log(`⚠️  Template not found: ${template}`);
  }
});

// Tạo README.md
const readmeContent = `# ${toPascalCase(featureName)} Feature

## Mô tả

Feature quản lý ${toTitleCase(featureName)}.

## Cấu trúc

\`\`\`
${featureName}/
├── routes/
│   └── ${featureName}.routes.ts
├── pages/
│   ├── ${featureName}-list/
│   ├── ${featureName}-detail/
│   ├── ${featureName}-create/
│   └── ${featureName}-edit/
├── components/
├── services/
│   └── ${featureName}-api.service.ts
├── models/
│   ├── ${featureName}.model.ts
│   └── ${featureName}-filter.model.ts
├── store/
│   └── ${featureName}.store.ts
├── constants/
├── ${featureName}.feature.ts
└── README.md
\`\`\`

## Routes

| Path | Component | Mô tả |
|------|-----------|-------|
| \`/list\` | ${toPascalCase(featureName)}ListPage | Danh sách |
| \`/create\` | ${toPascalCase(featureName)}CreatePage | Thêm mới |
| \`/:id\` | ${toPascalCase(featureName)}DetailPage | Chi tiết |
| \`/:id/edit\` | ${toPascalCase(featureName)}EditPage | Chỉnh sửa |

## Usage

\`\`\`typescript
// Trong app.routes.ts
{
  path: '${featureName}',
  loadChildren: () => import('@features/${domain ? domain + '/' : ''}${featureName}/${featureName}.feature')
    .then(m => m.${toUpperCase(featureName)}_ROUTES)
}
\`\`\`
`;

fs.writeFileSync(path.join(basePath, 'README.md'), readmeContent);
console.log(`✅ Created: README.md`);

// Tạo placeholder cho pages
const pages = ['list', 'detail', 'create', 'edit'];
pages.forEach((page) => {
  const pagePath = path.join(basePath, 'pages', `${featureName}-${page}`);
  if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath, { recursive: true });
  }

  // Tạo file .page.ts
  const pageContent = `import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ${toPascalCase(featureName)}Store } from '../../store/${featureName}.store';

/**
 * ${toPascalCase(featureName)} ${toPascalCase(page)} Page
 */
@Component({
  selector: 'app-${featureName}-${page}',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './${featureName}-${page}.page.html',
  styleUrl: './${featureName}-${page}.page.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${toPascalCase(featureName)}${toPascalCase(page)}Page {
  private readonly store = inject(${toPascalCase(featureName)}Store);

  // TODO: Implement page logic
}
`;

  fs.writeFileSync(path.join(pagePath, `${featureName}-${page}.page.ts`), pageContent);

  // Tạo file .page.html
  const htmlContent = `<!-- ${toPascalCase(featureName)} ${toPascalCase(page)} Page -->
<div class="${featureName}-${page}-page">
  <h1>{{ 'FEATURE.${toUpperCase(featureName)}.${page.toUpperCase()}' | translate }}</h1>
  <!-- TODO: Implement UI -->
</div>
`;
  fs.writeFileSync(path.join(pagePath, `${featureName}-${page}.page.html`), htmlContent);

  // Tạo file .page.less
  const lessContent = `// ${toPascalCase(featureName)} ${toPascalCase(page)} Page Styles
@import '@styles/variables.less';

.${featureName}-${page}-page {
  padding: @padding-lg;
}
`;
  fs.writeFileSync(path.join(pagePath, `${featureName}-${page}.page.less`), lessContent);

  console.log(`✅ Created: pages/${featureName}-${page}/`);
});

console.log(`\n✨ Feature "${featureName}" đã được tạo thành công!`);
console.log(`\n📝 Các bước tiếp theo:`);
console.log(`   1. Cập nhật models trong models/${featureName}.model.ts`);
console.log(`   2. Implement các pages trong pages/`);
console.log(`   3. Thêm route vào app.routes.ts`);
console.log(`   4. Thêm translations vào public/i18n/`);
