import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Trust proxy - must be before session (for HTTPS detection)
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://*.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(orig => 
      orig === origin || (orig.includes('*') && origin?.match(new RegExp(orig.replace('*', '.*'))))
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true for HTTPS
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
const callbackURL = process.env.NODE_ENV === 'production'
  ? '/auth/google/callback'
  : '/auth/google/callback';

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: callbackURL
},
(accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;

    // Validate email domain for security
    if (!email || !email.endsWith('@student.itera.ac.id')) {
      return done(null, false, { message: 'Hanya email @student.itera.ac.id yang diizinkan' });
    }

    // Parse NIM from email using regex
    // Format: nama.nim@student.itera.ac.id (NIM must be 9 digits)
    const match = email.match(/^(.+)\.(\d{9})@student\.itera\.ac\.id$/);

    if (!match) {
      return done(null, false, { 
        message: 'Invalid email format. Expected: nama.nim@student.itera.ac.id (NIM must be 9 digits)' 
      });
    }

    const parsedNim = match[2];

    const user = {
      id: profile.id,
      name: profile.displayName,
      email,
      nim: parsedNim,
      picture: profile.photos?.[0]?.value
    };

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Auth routes
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'  // Allow user to choose account
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/auth/google/failure',
    successRedirect: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
);

// Handle failure with error message
app.get('/auth/google/failure', (req, res) => {
  const errorMsg = req.authInfo?.message || 'Authentication failed';
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendURL}/?error=${encodeURIComponent(errorMsg)}`);
});

// Logout route
app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(frontendURL);
  });
});

// Check auth status
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Production mode: ${process.env.BACKEND_URL || 'Railway'}`);
  }
});
