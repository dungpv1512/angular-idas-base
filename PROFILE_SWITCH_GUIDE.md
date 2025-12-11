# Profile Switch Guide

## Tổng quan

Hệ thống hỗ trợ switch giữa các profiles khác nhau để load config tương ứng từ ETCD.

## Cách sử dụng

### Switch Profile đơn giản

```bash
# Switch sang profile hung.dang
npm run config:profile -- hung.dang

# Switch sang profile dung.pham.demo
npm run config:profile -- dung.pham.demo

# Switch sang bất kỳ profile nào
npm run config:profile -- <tên-profile>
```

### Cách hoạt động

1. **Lưu profile** vào file `.env`
2. **Thử fetch từ ETCD server** trước
   - URL: `http://192.168.100.108:2383/v3/get`
   - Key: `/Development/Profiles/<profile>/Constants/Install`
3. **Nếu ETCD không accessible**, tự động fallback sang `ETCD.md`
4. **Cập nhật** `environment.ts` và `environment.prod.ts`

## Ví dụ

### Switch sang hung.dang

```bash
npm run config:profile -- hung.dang
```

**Output:**
```
=== Profile Switcher ===

Switching to profile: hung.dang

✓ Profile saved to .env

Attempting to fetch from ETCD server...
Using profile: hung.dang
Fetching config from ETCD...
✓ Config fetched successfully
...

✓ Config fetched from ETCD server successfully!

=== Profile Switch Complete ===
Current profile: hung.dang
Environment files updated.
```

### Switch khi ETCD không available

```bash
npm run config:profile -- hung.dang
```

**Output:**
```
=== Profile Switcher ===

Switching to profile: hung.dang

✓ Profile saved to .env

Attempting to fetch from ETCD server...
⚠ ETCD server not accessible, trying ETCD.md...

Using profile: hung.dang
Reading ETCD.md file...
✓ Config parsed successfully
...

✓ Config parsed from ETCD.md successfully!

=== Profile Switch Complete ===
Current profile: hung.dang
Environment files updated.
```

## Profile Structure trong ETCD

Mỗi profile có config riêng tại:

```
/Development/Profiles/
├── dung.pham.demo/
│   └── Constants/
│       └── Install
├── hung.dang/
│   └── Constants/
│       └── Install
└── <other-profiles>/
    └── Constants/
        └── Install
```

## ETCD.md với Multiple Profiles

Nếu muốn support nhiều profiles trong `ETCD.md`, format như sau:

```markdown
# API Endpoint
http://192.168.100.108:2383/v3/get?key=%2FDevelopment%2FProfiles%2Fdung.pham.demo%2FConstants%2FInstall

## Profile: dung.pham.demo

{"node":{"value":"{ ... config ... }"}}

## Profile: hung.dang

{"node":{"value":"{ ... config ... }"}}
```

Script sẽ tự động tìm section tương ứng với profile.

## File .env

Profile hiện tại được lưu trong `.env`:

```env
ETCD_PROFILE=hung.dang
```

File này được gitignore để mỗi developer có thể dùng profile riêng.

## Sử dụng trong Code

### Đọc profile hiện tại

```typescript
// Không cần đọc profile trong code
// Chỉ cần dùng environment đã được sync
import { environment } from '@environments/environment';

const appName = environment.appConfig.webAppName;
```

### Runtime profile detection (nếu cần)

```typescript
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  getCurrentProfile(): string {
    // Read from .env or API
    return 'hung.dang';
  }
}
```

## Workflow

### Development

```bash
# Mỗi developer chọn profile của mình
npm run config:profile -- hung.dang

# Start development
npm start
```

### Team Collaboration

```bash
# Developer A
npm run config:profile -- dev.user.a

# Developer B  
npm run config:profile -- dev.user.b

# Mỗi người có config riêng, không conflict
```

### CI/CD

```yaml
# .github/workflows/build.yml
- name: Switch to production profile
  run: npm run config:profile -- production

- name: Build
  run: npm run build
```

## Advanced Usage

### Script trực tiếp

```bash
# Parse từ ETCD.md với profile cụ thể
node scripts/parse-etcd-from-md.js hung.dang

# Fetch từ ETCD server với profile cụ thể
node scripts/fetch-etcd-config.js hung.dang
```

### Programmatic Usage

```javascript
const { execSync } = require('child_process');

// Switch profile programmatically
execSync('npm run config:profile -- hung.dang', { stdio: 'inherit' });
```

## Troubleshooting

### Profile không tồn tại

```bash
npm run config:profile -- invalid-profile
```

**Error:**
```
✗ Error: Cannot find JSON config in ETCD.md
```

**Solution:** Đảm bảo profile tồn tại trong ETCD hoặc ETCD.md

### ETCD server timeout

```bash
npm run config:profile -- hung.dang
```

**Output:**
```
⚠ ETCD server not accessible, trying ETCD.md...
```

**Solution:** Script tự động fallback sang ETCD.md, không cần làm gì

### .env file không được tạo

**Solution:**
```bash
# Tạo thủ công
echo "ETCD_PROFILE=hung.dang" > .env
```

## Best Practices

1. **Mỗi developer dùng profile riêng** - Tránh conflict
2. **Commit ETCD.md** - Backup config cho team
3. **Không commit .env** - File này là local config
4. **Switch trước khi start** - Đảm bảo config đúng
5. **Document profiles** - Ghi chú profile nào dùng cho gì

## Available Profiles

| Profile | Description | Usage |
|---------|-------------|-------|
| `dung.pham.demo` | Default development | Development |
| `hung.dang` | Hung's environment | Development |
| `production` | Production config | Production build |
| `staging` | Staging environment | Testing |

## Summary

✅ **One command** để switch profile: `npm run config:profile -- <profile>`
✅ **Auto fallback** từ ETCD server sang ETCD.md
✅ **Profile persistence** trong .env file
✅ **No conflicts** giữa developers
✅ **CI/CD ready** với profile switching
