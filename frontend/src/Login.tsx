import { useEffect, useState } from 'react'

interface LoginProps {
  onLoginSuccess: (user: User) => void
}

interface User {
  id: string
  name: string
  email: string
  nim: string
  picture?: string
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [error, setError] = useState<string>('')
  const API_URL = import.meta.env.VITE_API_URL || ''
  const isDevelopment = import.meta.env.DEV

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const errorParam = params.get('error')

    if (errorParam) {
      setError(decodeURIComponent(errorParam))
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    fetch(`${API_URL}/api/auth/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          onLoginSuccess(data.user)
        }
      })
      .catch(() => { })
  }, [API_URL, onLoginSuccess])

  const handleGoogleLogin = () => {
    const loginUrl = isDevelopment ? '/auth/google' : `${API_URL}/auth/google`
    window.location.href = loginUrl
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

        :root {
          --black: #1D1D1E;
          --dark-red: #620A1A;
          --gold: #C6953F;
          --red: #A31E21;
          --cream: #E9E3D6;
          --white: #F9F7F5;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          background-color: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Lato', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        /* Decorative background orbs */
        .login-root::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(98,10,26,0.45) 0%, transparent 70%);
          top: -120px;
          right: -120px;
          border-radius: 50%;
          pointer-events: none;
        }

        .login-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(163,30,33,0.2) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          border-radius: 50%;
          pointer-events: none;
        }

        .gold-orb {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(198,149,63,0.12) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: rgba(249,247,245,0.04);
          border: 1px solid rgba(198,149,63,0.25);
          border-radius: 4px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(24px);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Top gold bar */
        .card-top-bar {
          height: 4px;
          background: linear-gradient(90deg, var(--dark-red), var(--gold), var(--dark-red));
        }

        .card-body {
          padding: 44px 40px 36px;
        }

        .logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .logo-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 2px solid rgba(198,149,63,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(198,149,63,0.08);
          padding: 8px;
        }

        .logo-circle img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--white);
          text-align: center;
          margin-bottom: 8px;
          letter-spacing: 0.3px;
        }

        .card-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: rgba(233,227,214,0.6);
          text-align: center;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .info-box {
          background: rgba(98,10,26,0.3);
          border: 1px solid rgba(163,30,33,0.4);
          border-left: 3px solid var(--gold);
          border-radius: 3px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .info-box p {
          font-size: 13px;
          color: rgba(233,227,214,0.8);
          line-height: 1.5;
        }

        .info-box strong {
          color: var(--gold);
        }

        .error-box {
          background: rgba(163,30,33,0.2);
          border: 1px solid rgba(163,30,33,0.5);
          border-left: 3px solid var(--red);
          border-radius: 3px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .error-title {
          font-size: 13px;
          font-weight: 700;
          color: #f87171;
          margin-bottom: 4px;
        }

        .error-msg {
          font-size: 13px;
          color: rgba(248,113,113,0.8);
        }

        /* Google button */
        .google-btn {
          width: 100%;
          background: var(--white);
          border: none;
          border-radius: 3px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--black);
          letter-spacing: 0.3px;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }

        .google-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(198,149,63,0.12) 100%);
          pointer-events: none;
        }

        .google-btn:hover {
          background: var(--cream);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }

        .google-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .google-btn svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(198,149,63,0.2);
        }

        .divider-text {
          font-size: 11px;
          color: rgba(233,227,214,0.3);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .terms-text {
          font-size: 12px;
          color: rgba(233,227,214,0.35);
          text-align: center;
          line-height: 1.6;
          font-weight: 300;
        }

        /* Footer */
        .card-footer {
          border-top: 1px solid rgba(198,149,63,0.12);
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 12px;
          color: var(--gold);
          opacity: 0.7;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .footer-copy {
          font-size: 11px;
          color: rgba(233,227,214,0.25);
          font-weight: 300;
        }

        @media (max-width: 480px) {
          .card-body { padding: 36px 28px 28px; }
          .card-footer { padding: 16px 28px; flex-direction: column; gap: 4px; text-align: center; }
        }
      `}</style>

      <div className="login-root">
        <div className="gold-orb" />

        <div className="login-card">
          <div className="card-top-bar" />

          <div className="card-body">
            {/* Logo */}
            <div className="logo-wrap">
              <div className="logo-circle">
                <img src="/logo/Logo-IKM-PNG.png" alt="Logo IKM" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="card-title">Login Dibutuhkan</h1>
            <p className="card-subtitle">
              Silahkan login dengan email student Anda<br />untuk melanjutkan
            </p>

            {/* Error */}
            {error && (
              <div className="error-box">
                <p className="error-title">Login Gagal</p>
                <p className="error-msg">{error}</p>
              </div>
            )}

            {/* Info */}
            <div className="info-box">
              <p>
                <strong>Catatan:</strong> Hanya email{' '}
                <strong>@student.itera.ac.id</strong> yang diizinkan untuk login.
              </p>
            </div>

            {/* Google Button */}
            <button onClick={handleGoogleLogin} className="google-btn">
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23.07c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23.07 12 23.07z" />
                <path fill="#FBBC05" d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.15H2.18C1.43 8.65 1 10.28 1 12s.43 3.35 1.18 4.85l3.66-2.68z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.54 2.18 7.15l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">atau</span>
              <div className="divider-line" />
            </div>

            <p className="terms-text">
              Dengan masuk, Anda menyetujui Ketentuan Layanan<br />dan Kebijakan Privasi kami.
            </p>
          </div>

          <div className="card-footer">
            <span className="footer-brand">Panitia Seleksi</span>
            <span className="footer-copy">© 2026 All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  )
}