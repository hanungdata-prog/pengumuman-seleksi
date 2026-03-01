# Pengumuman Seleksi - Monorepo

Monorepo untuk aplikasi pengumuman seleksi dengan frontend dan backend terpisah.

## Struktur

```
pengumuman/
├── frontend/          # React + Vite (Deploy ke Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── backend/           # Express.js (Deploy ke Railway)
│   ├── server.js
│   ├── package.json
│   └── railway.json
└── package.json       # Root package.json untuk monorepo
```

## Development

### Install semua dependencies
```bash
npm run install:all
```

### Jalankan development server (frontend + backend)
```bash
npm run dev
```

### Jalankan frontend saja
```bash
npm run dev:client
```

### Jalankan backend saja
```bash
npm run dev:server
```

### Build frontend
```bash
npm run build
```

## Deployment

### Frontend (Vercel)
1. Push kode ke repository
2. Hubungkan repository ke Vercel
3. Set root directory ke `frontend`
4. Set environment variable:
   - `VITE_API_URL` = URL backend di Railway

### Backend (Railway)
1. Push kode ke repository
2. Hubungkan repository ke Railway
3. Set root directory ke `backend`
4. Set environment variables:
   - `CLIENT_ID` = Google OAuth Client ID
   - `CLIENT_SECRET` = Google OAuth Client Secret
   - `SESSION_SECRET` = Secret key untuk session
   - `PORT` = 3000 (atau port dari Railway)
   - `NODE_ENV` = production

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

### Backend (.env)
```
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret-key
PORT=3000
NODE_ENV=development
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS
- **Backend**: Express.js, Passport.js (Google OAuth)
