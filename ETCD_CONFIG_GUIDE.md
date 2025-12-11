# ETCD Configuration Guide

## Tổng quan

Hệ thống sử dụng ETCD để quản lý configuration tập trung. Config từ ETCD được sync vào environment files.

## Scripts

### 1. Switch Profile (Recommended)

```bash
# Switch to hung.dang profile
npm run config:profile -- hung.dang

# Switch to dung.pham.demo profile
npm run config:profile -- dung.pham.demo

# Switch to any profile
npm run config:profile -- <profile-name>
```

**Chức năng:**
- Tự động thử fetch từ ETCD server trước
- Nếu ETCD không accessible, fallback sang ETCD.md
- Lưu profile hiện tại vào `.env` file
- Cập nhật environment files

**Khi nào dùng:**
- Cần switch giữa các profiles khác nhau
- Development với nhiều environments
- Tự động fallback khi ETCD không available

### 2. Parse từ ETCD.md

```bash
# Default profile (dung.pham.demo)
npm run config:sync

# Specific profile
node scripts/parse-etcd-from-md.js hung.dang
```

**Chức năng:**
- Đọc config từ file `ETCD.md`
- Parse JSON từ ETCD response
- Merge vào environment files
- Không cần kết nối ETCD server

**Khi nào dùng:**
- Development local
- ETCD server không accessible
- Đã có config trong ETCD.md

### 3. Fetch trực tiếp từ ETCD Server

```bash
# Default profile (dung.pham.demo)
npm run config:sync-live

# Specific profile
node scripts/fetch-etcd-config.js hung.dang
```

**Chức năng:**
- Kết nối trực tiếp đến ETCD server
- Fetch config real-time từ `/Development/Profiles/<profile>/Constants/Install`
- Cập nhật environment files

**Khi nào dùng:**
- Production deployment
- Cần config mới nhất
- ETCD server accessible

## Configuration Structure

### App Config
```typescript
appConfig: {
  webAppName: string  // Tên ứng dụng
}
```

### API Endpoints (42 endpoints)
```typescript
apiEndpoints: {
  uI: string,                    // UI URL
  chiSos: string,                // Chỉ số gateway
  works: string,                 // Works gateway
  organizations: string,         // Organizations gateway
  heThongs: string,              // Hệ thống gateway
  files: string,                 // Files gateway
  notifications: string,         // Notifications gateway
  sSO: string,                   // SSO URL
  cDN: string,                   // CDN URL
  // ... và 33 endpoints khác
}
```

### Identity Server
```typescript
identity: {
  enabled: boolean,              // Bật/tắt Identity
  authority: string              // Identity Server URL
}
```

### Redis Cache
```typescript
redis: {
  enabled: boolean,              // Bật/tắt Redis
  connectionString: string       // Redis connection string
}
```

### RabbitMQ
```typescript
rabbitMQ: {
  virtualHost: string,           // Virtual host name
  connectionString: string       // RabbitMQ connection string
}
```

### Feature Flags
```typescript
features: {
  useOnlyOffice: boolean,        // Sử dụng OnlyOffice
  enableBieuMauDong: boolean,    // Bật biểu mẫu động
  menuISO: boolean               // Hiển thị menu ISO
}
```

## Sử dụng trong Code

### 1. Import environment

```typescript
import { environment } from '@environments/environment';

// App name
const appName = environment.appConfig.webAppName;

// API endpoint
const organizationsUrl = environment.apiEndpoints.organizations;

// Feature flag
if (environment.features.useOnlyOffice) {
  // Use OnlyOffice
}

// Identity
if (environment.identity.enabled) {
  const authority = environment.identity.authority;
}
```

### 2. Sử dụng với HttpClient

```typescript
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
export class MyService {
  constructor(private http: HttpClient) {}

  getData() {
    const url = `${environment.apiEndpoints.organizations}/api/data`;
    return this.http.get(url);
  }
}
```

### 3. Conditional Features

```typescript
import { environment } from '@environments/environment';

@Component({
  template: `
    @if (showOnlyOffice) {
      <only-office-editor />
    }
  `
})
export class MyComponent {
  showOnlyOffice = environment.features.useOnlyOffice;
}
```

## ETCD Service

Nếu cần fetch config runtime:

```typescript
import { EtcdConfigService } from '@app/core/services/etcd-config.service';

@Component({})
export class MyComponent {
  constructor(private etcdService: EtcdConfigService) {}

  ngOnInit() {
    // Get full config
    this.etcdService.getConfig().subscribe(config => {
      console.log(config);
    });

    // Get specific endpoint
    this.etcdService.getApiEndpoint('Organizations').subscribe(url => {
      console.log(url);
    });

    // Get all endpoints
    this.etcdService.getApiEndpoints().subscribe(endpoints => {
      console.log(endpoints);
    });
  }
}
```

## Files

### Environment Files
- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production

### Scripts
- `scripts/parse-etcd-from-md.js` - Parse từ ETCD.md
- `scripts/fetch-etcd-config.js` - Fetch từ ETCD server
- `scripts/README.md` - Chi tiết về scripts

### Services
- `src/app/core/services/etcd-config.service.ts` - Runtime ETCD service

### Config Source
- `ETCD.md` - ETCD response backup

## Workflow

### Development
1. Cập nhật `ETCD.md` với config mới từ ETCD
2. Chạy `npm run config:sync`
3. Environment files được cập nhật
4. Commit cả ETCD.md và environment files

### Production Build
1. Chạy `npm run config:sync-live` (nếu có access ETCD)
2. Hoặc dùng `npm run config:sync` với ETCD.md
3. Build: `npm run build`
4. Deploy

### CI/CD Integration

**Option 1: Sử dụng ETCD.md**
```yaml
# .github/workflows/build.yml
- name: Sync Config
  run: npm run config:sync

- name: Build
  run: npm run build
```

**Option 2: Fetch từ ETCD**
```yaml
# .github/workflows/build.yml
- name: Sync Config from ETCD
  run: npm run config:sync-live
  env:
    ETCD_URL: ${{ secrets.ETCD_URL }}

- name: Build
  run: npm run build
```

## Troubleshooting

### Config không cập nhật
```bash
# Xóa và sync lại
rm src/environments/environment.ts
npm run config:sync
```

### ETCD server không accessible
```bash
# Dùng ETCD.md thay thế
npm run config:sync
```

### Parse error
```bash
# Kiểm tra format JSON trong ETCD.md
# Đảm bảo escape characters đúng
```

## Best Practices

1. **Luôn commit ETCD.md** - Backup config cho team
2. **Không hardcode URLs** - Dùng environment.apiEndpoints
3. **Sử dụng feature flags** - Bật/tắt features dễ dàng
4. **Sync trước khi build** - Đảm bảo config mới nhất
5. **Không commit sensitive data** - Dùng environment variables cho secrets

## Security Notes

⚠️ **Lưu ý:**
- Redis password và RabbitMQ credentials được lưu trong environment files
- Không commit production credentials vào Git
- Sử dụng environment variables cho sensitive data
- Rotate credentials định kỳ

## Summary

✅ **42 API Endpoints** từ ETCD
✅ **Identity Server** configuration
✅ **Redis Cache** configuration
✅ **RabbitMQ** configuration
✅ **Feature Flags** cho conditional features
✅ **Runtime ETCD Service** cho dynamic config
✅ **Scripts** để sync config tự động
