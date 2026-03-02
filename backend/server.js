import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('trust proxy', 1);

// CORS - hanya izinkan dari frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://pengumuman-staff-ikm-itera.harch.site',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session - karena sudah diproxy Vercel, frontend & backend same-site
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth - callback URL menggunakan domain FRONTEND
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pengumuman-staff-ikm-itera.harch.site';
const callbackURL = process.env.NODE_ENV === 'production'
  ? `${FRONTEND_URL}/auth/google/callback`
  : '/auth/google/callback';

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: callbackURL
},
(accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;

    if (!email || !email.endsWith('@student.itera.ac.id')) {
      return done(null, false, { message: 'Hanya email @student.itera.ac.id yang diizinkan' });
    }

    const match = email.match(/^(.+)\.(\d{9})@student\.itera\.ac\.id$/);

    if (!match) {
      return done(null, false, {
        message: 'Format email tidak valid. Expected: nama.nim@student.itera.ac.id (NIM 9 digit)'
      });
    }

    const user = {
      id: profile.id,
      name: profile.displayName,
      email,
      nim: match[2],
      picture: profile.photos?.[0]?.value
    };

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Auth routes
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
    successRedirect: FRONTEND_URL
  })
);

app.get('/auth/google/failure', (req, res) => {
  const errorMsg = req.authInfo?.message || 'Authentication failed';
  res.redirect(`${FRONTEND_URL}/?error=${encodeURIComponent(errorMsg)}`);
});

app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(FRONTEND_URL);
  });
});

app.get('/api/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        nim: req.user.nim,
        picture: req.user.picture?.replace('=s96-c', '=s48-c')
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
