# Deployment Guide

## 1. Push ke GitHub

```bash
# Ganti URL dengan repository GitHub kamu
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 2. Deploy Frontend ke Vercel

### Langkah:
1. Login ke [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import repository GitHub kamu
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `cd .. && npm install --workspace=frontend` (optional)

5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-production-url.railway.app
   ```

6. Click **"Deploy"**

## 3. Deploy Backend ke Railway

### Langkah:
1. Login ke [Railway](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Pilih repository kamu
4. **Settings**:
   - **Root Directory**: `backend`
   - **Start Command**: `npm run start`

5. **Environment Variables** (di tab Variables):
   ```
   CLIENT_ID=your-google-oauth-client-id
   CLIENT_SECRET=your-google-oauth-client-secret
   SESSION_SECRET=your-random-secret-key-min-32-chars
   FRONTEND_URL=https://your-app.vercel.app
   BACKEND_URL=https://your-backend-production-url.railway.app
   PORT=3000
   NODE_ENV=production
   ```

6. **Google OAuth Setup**:
   - Buka [Google Cloud Console](https://console.cloud.google.com/)
   - Buat project baru
   - Enable Google+ API
   - Buat OAuth 2.0 Credentials
   - **Authorized redirect URIs**:
     ```
     https://your-backend-production-url.railway.app/auth/google/callback
     ```
   - Copy Client ID dan Client Secret ke Railway

7. Deploy akan otomatis dimulai

## 4. Update Frontend URL

Setelah backend deploy:
1. Copy URL backend dari Railway (contoh: `https://your-backend-production-url.railway.app`)
2. Update environment variable di Vercel: `VITE_API_URL`
3. Redeploy frontend di Vercel

## 5. Update Google OAuth

Setelah frontend deploy:
1. Update **Authorized JavaScript origins** di Google Cloud Console:
   ```
   https://your-app.vercel.app
   ```
2. Update **Authorized redirect URIs**:
   ```
   https://your-backend-production-url.railway.app/auth/google/callback
   ```

## Testing

1. Buka `https://your-app.vercel.app`
2. Login dengan Google
3. Cek status seleksi

## Troubleshooting

### CORS Error
- Pastikan `FRONTEND_URL` di backend sudah benar
- Pastikan `VITE_API_URL` di frontend sudah benar

### OAuth Error
- Cek redirect URI di Google Cloud Console sesuai dengan backend URL
- Pastikan CLIENT_ID dan CLIENT_SECRET benar

### Session Error
- Pastikan SESSION_SECRET sudah di-set di Railway
