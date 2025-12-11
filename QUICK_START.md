# Quick Start Guide

## Switch Profile & Sync Config (One Command)

```bash
# Switch to hung.dang profile and fetch config
npm run profile -- hung.dang

# Switch to dung.pham.demo profile and fetch config
npm run profile -- dung.pham.demo

# Switch to any profile
npm run profile -- <profile-name>
```

## What it does

1. ✅ Saves profile to `.env` file
2. ✅ Tries to fetch config from ETCD server
3. ✅ Falls back to `ETCD.md` if ETCD not accessible
4. ✅ Updates `environment.ts` and `environment.prod.ts`
5. ✅ Ready to start development!

## Example Output

```
╔════════════════════════════════════════╗
║     ETCD Profile Switcher & Sync      ║
╚════════════════════════════════════════╝

📋 Target Profile: hung.dang

Step 1/3: Saving profile...
✓ Profile saved to .env

Step 2/3: Fetching config from ETCD...
🔗 ETCD Key: /Development/Profiles/hung.dang/Constants/Install

✓ Config fetched from ETCD server successfully!

Step 3/3: Finalizing...
✓ Environment files updated

╔════════════════════════════════════════╗
║          Switch Complete! ✓           ║
╚════════════════════════════════════════╝

📌 Current Profile: hung.dang
📁 Config Source: ETCD Server
📝 Files Updated:
   - src/environments/environment.ts
   - src/environments/environment.prod.ts
   - .env

🚀 Ready to start development!
```

## Then Start Development

```bash
npm start
```

## Available Profiles

- `dung.pham.demo` - Default development profile
- `hung.dang` - Hung's profile
- `<your-name>` - Your custom profile

## That's it!

Just one command to switch profile and sync config! 🎉
