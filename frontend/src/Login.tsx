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
    // Check for error in URL params
    const params = new URLSearchParams(window.location.search)
    const errorParam = params.get('error')

    if (errorParam) {
      setError(decodeURIComponent(errorParam))
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Check if user just logged in (auth status check)
    fetch(`${API_URL}/api/auth/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          onLoginSuccess(data.user)
        }
      })
      .catch(() => {})
  }, [API_URL, onLoginSuccess])

  const handleGoogleLogin = () => {
    // Use proxy in development, direct URL in production
    const loginUrl = isDevelopment ? '/auth/google' : `${API_URL}/auth/google`
    window.location.href = loginUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Login Dibutuhkan
            </h1>
            <p className="text-gray-600">
              Silahkan login dengan email student Anda untuk melanjutkan
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
              <p className="font-semibold mb-1">Login Gagal</p>
              <p>{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Catatan:</strong> Hanya email <strong>@student.itera.ac.id</strong> yang diizinkan untuk login.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              <strong>Format email:</strong> nama.nim@student.itera.ac.id
              <br />
              <span className="text-xs text-blue-600">Contoh: hanung.124140207@student.itera.ac.id</span>
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23.07c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23.07 12 23.07z" />
              <path fill="#FBBC05" d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.15H2.18C1.43 8.65 1 10.28 1 12s.43 3.35 1.18 4.85l3.66-2.68z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.54 2.18 7.15l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          {/* Alternative text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Dengan masuk, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-gray-500 text-sm">
          <p>&copy; 2026 Panitia Seleksi. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
