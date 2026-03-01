# Pengumuman Seleksi - Backend

Backend API untuk autentikasi Google OAuth menggunakan Express.js.

## Deployment ke Railway

### Cara 1: Deploy dari Monorepo
1. Login ke Railway
2. Deploy from GitHub
3. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm run start`

4. Environment Variables:
   ```
   CLIENT_ID=your-google-oauth-client-id
   CLIENT_SECRET=your-google-oauth-client-secret
   SESSION_SECRET=your-random-secret-key-min-32-chars
   FRONTEND_URL=https://your-app.vercel.app
   BACKEND_URL=https://your-backend.railway.app
   PORT=3000
   NODE_ENV=production
   ```

### Cara 2: Deploy sebagai Repository Terpisah
Jika Anda memisahkan repository:
1. Copy folder `backend` ke repository baru
2. Deploy ke Railway
3. Set semua environment variables di atas

## Google OAuth Setup

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru
3. Enable Google+ API
4. Buat OAuth 2.0 Credentials
5. Set Authorized redirect URIs:
   - Development: `http://localhost:3000/auth/google/callback`
   - Production: `https://your-backend.railway.app/auth/google/callback`
6. Copy Client ID dan Client Secret ke environment variables

## Development

```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

- `GET /auth/google` - Redirect ke Google OAuth
- `GET /auth/google/callback` - OAuth callback
- `GET /auth/logout` - Logout
- `GET /api/auth/status` - Check authentication status
- `GET /api/health` - Health check

## Tech Stack
- Express.js 5
- Passport.js
- passport-google-oauth20
- express-session
- cors
