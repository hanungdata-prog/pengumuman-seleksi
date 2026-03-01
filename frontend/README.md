# Pengumuman Seleksi - Frontend

Frontend aplikasi pengumuman seleksi menggunakan React + Vite.

## Deployment ke Vercel

### Cara 1: Deploy dari Monorepo
1. Login ke Vercel
2. Import repository GitHub Anda
3. Configure Project:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `cd .. && npm run install:all` (optional, jika perlu install root dependencies)

4. Environment Variables:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

### Cara 2: Deploy sebagai Repository Terpisah
Jika Anda memisahkan repository:
1. Copy folder `frontend` ke repository baru
2. Deploy ke Vercel seperti biasa
3. Set environment variable `VITE_API_URL`

## Development

```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Tech Stack
- React 19
- TypeScript
- Vite
- TailwindCSS 4
- canvas-confetti
