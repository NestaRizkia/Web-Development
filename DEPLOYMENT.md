# 🚀 Panduan Deploy ke Vercel

Project ini adalah fullstack application dengan Express.js backend dan React frontend yang sudah dikonfigurasi untuk deployment di Vercel.

## 📋 Prerequisites

1. **MongoDB Atlas Account** - Database cloud gratis
   - Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Buat cluster gratis
   - Dapatkan connection string

2. **Vercel Account** 
   - Daftar di [Vercel](https://vercel.com)
   - Install Vercel CLI (opsional):
     ```bash
     npm install -g vercel
     ```

3. **GitHub Repository**
   - Push project ke GitHub repository Anda

## 🔧 Langkah-langkah Deployment

### 1. Setup MongoDB Atlas

1. Login ke [MongoDB Atlas](https://cloud.mongodb.com)
2. Buat cluster baru (pilih Free Tier)
3. Buat database user:
   - Database Access → Add New Database User
   - Username & password (simpan kredensial ini!)
4. Whitelist IP address:
   - Network Access → Add IP Address
   - Pilih "Allow Access from Anywhere" (0.0.0.0/0)
5. Dapatkan connection string:
   - Cluster → Connect → Connect your application
   - Copy connection string (format: `mongodb+srv://...`)
   - Ganti `<password>` dengan password Anda

### 2. Deploy ke Vercel via Dashboard

1. **Push ke GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import di Vercel:**
   - Login ke [Vercel Dashboard](https://vercel.com/dashboard)
   - Klik "Add New..." → "Project"
   - Import repository GitHub Anda
   - Vercel akan otomatis detect framework (Vite)

3. **Configure Project:**
   - **Root Directory**: Biarkan default (kosong)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (otomatis terdeteksi)
   - **Output Directory**: `frontend/dist` (otomatis terdeteksi)

4. **Setup Environment Variables:**
   
   Klik "Environment Variables" dan tambahkan:
   
   ```env
   # Backend Environment Variables
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/company-profile
   SESSION_SECRET=ganti-dengan-random-string-yang-kuat-minimal-32-karakter
   ADMIN_PASSWORD=ganti-dengan-password-admin-yang-kuat
   NODE_ENV=production
   FRONTEND_URL=https://your-app-name.vercel.app
   ```

   **Penting:**
   - `MONGODB_URI`: Connection string dari MongoDB Atlas
   - `SESSION_SECRET`: Generate random string yang kuat (minimal 32 karakter)
   - `ADMIN_PASSWORD`: Password untuk login admin
   - `FRONTEND_URL`: Akan muncul setelah deploy pertama, update nanti

5. **Deploy:**
   - Klik "Deploy"
   - Tunggu proses build selesai (2-5 menit)

### 3. Update FRONTEND_URL

Setelah deployment berhasil:

1. Copy URL deployment Anda (contoh: `https://your-app.vercel.app`)
2. Kembali ke Settings → Environment Variables
3. Update `FRONTEND_URL` dengan URL yang benar
4. Redeploy (Deployments → tiga titik → Redeploy)

### 4. Seed Database (Optional)

Jika ingin menambahkan data awal:

1. **Via Vercel CLI:**
   ```bash
   vercel env pull .env.local
   cd backend
   npm install
   node seed.js
   ```

2. **Atau buat data manual** melalui aplikasi setelah login

## 🔒 Keamanan

Pastikan Anda sudah:
- ✅ Ganti `SESSION_SECRET` dengan string random yang kuat
- ✅ Ganti `ADMIN_PASSWORD` dengan password yang kuat
- ✅ Setup MongoDB network access dengan benar
- ✅ JANGAN commit file `.env` ke Git

## 🎯 Endpoint API

Setelah deploy, API Anda akan tersedia di:
- `https://your-app.vercel.app/api/auth/*`
- `https://your-app.vercel.app/api/content/*`
- `https://your-app.vercel.app/api/portfolio/*`

## 🧪 Testing

Setelah deployment:

1. **Health Check:**
   ```bash
   curl https://your-app.vercel.app/api/health
   ```

2. **Login Admin:**
   - Buka: `https://your-app.vercel.app/admin`
   - Username: `admin`
   - Password: sesuai `ADMIN_PASSWORD` Anda

## ⚙️ Auto Deploy

Setiap push ke branch `main` akan otomatis trigger deployment baru di Vercel.

## 🐛 Troubleshooting

### Database Connection Error
- Pastikan MongoDB Atlas connection string benar
- Cek IP whitelist di MongoDB Atlas
- Verifikasi username/password database

### Session/Cookie Issues
- Pastikan `SESSION_SECRET` sudah diset
- Pastikan `NODE_ENV=production`
- Cek browser cookies (harus ada session cookie)

### CORS Errors
- Pastikan `FRONTEND_URL` di environment variables benar
- Clear browser cache
- Cek Network tab di DevTools

### Build Errors
- Cek Vercel build logs
- Pastikan semua dependencies terinstall
- Verifikasi `vercel.json` configuration

## 📱 Deploy via CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts
# Set environment variables saat diminta
# Atau gunakan: vercel env add
```

## 🔄 Update Deployment

```bash
git add .
git commit -m "Update features"
git push origin main
# Vercel akan auto-deploy
```

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

**Catatan:** Simpan semua credentials Anda dengan aman. Jangan share di public repository!
