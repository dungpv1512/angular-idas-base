# Scripts

## fetch-etcd-config.js

Script để fetch configuration từ ETCD server và cập nhật vào environment files.

### Sử dụng

```bash
# Chạy script
node scripts/fetch-etcd-config.js
```

### Chức năng

1. **Fetch config từ ETCD**
   - Kết nối đến ETCD server: `http://192.168.100.108:2383`
   - Lấy config từ key: `/Development/Profiles/dung.pham.demo/Constants/Install`

2. **Parse và merge config**
   - Đọc environment files hiện tại
   - Merge config mới từ ETCD (không ghi đè config cũ)
   - Chỉ thêm những config chưa có

3. **Cập nhật environment files**
   - `src/environments/environment.ts` - Development
   - `src/environments/environment.prod.ts` - Production

### Config được thêm

#### AppConfig
```typescript
appConfig: {
  webAppName: string
}
```

#### API Endpoints
```typescript
apiEndpoints: {
  ui: string,
  chiSos: string,
  works: string,
  organizations: string,
  // ... và nhiều endpoints khác
}
```

#### Identity Server
```typescript
identity: {
  enabled: boolean,
  authority: string
}
```

#### Redis Cache
```typescript
redis: {
  enabled: boolean,
  connectionString: string
}
```

#### RabbitMQ
```typescript
rabbitMQ: {
  virtualHost: string,
  connectionString: string
}
```

#### Feature Flags
```typescript
features: {
  useOnlyOffice: boolean,
  enableBieuMauDong: boolean,
  menuISO: boolean
}
```

### Lưu ý

- Script sẽ **không ghi đè** config hiện có (apiUrl, apiToken)
- Chỉ **thêm mới** những config chưa có từ ETCD
- Tự động filter localhost URLs (keys bắt đầu bằng "1")
- Convert keys sang camelCase format

### Troubleshooting

**Lỗi kết nối ETCD:**
```bash
Error: Failed to fetch from ETCD: connect ECONNREFUSED
```
→ Kiểm tra ETCD server có đang chạy không

**Lỗi parse config:**
```bash
Error: Failed to parse ETCD response
```
→ Kiểm tra format JSON trong ETCD có đúng không

### Tích hợp vào build process

Thêm vào `package.json`:

```json
{
  "scripts": {
    "config:sync": "node scripts/fetch-etcd-config.js",
    "prebuild": "npm run config:sync",
    "prestart": "npm run config:sync"
  }
}
```

Như vậy config sẽ tự động sync trước khi build hoặc start.
