import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import Login from './Login'
import CurtainReveal from './CurtainReveal'

interface User {
  id: string
  name: string
  email: string
  nim: string
  picture?: string
}

interface PengumumanData {
  nama: string
  nim: string
  divisi: string
  status: 'diterima' | 'ditolak'
}

const PENGUMUMAN_DATA: PengumumanData[] = [
  {
    nama: "Budi Santoso",
    nim: "22010101",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Siti Aminah",
    nim: "22010102",
    divisi: "UI/UX Design",
    status: "ditolak"
  },
  {
    nama: "Ahmad Rizki",
    nim: "22010103",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Dewi Lestari",
    nim: "22010104",
    divisi: "Data Science",
    status: "ditolak"
  },
  {
    nama: "Hanung Akbar Pramusintho",
    nim: "124140207",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Eko Prasetyo",
    nim: "22010105",
    divisi: "DevOps",
    status: "diterima"
  }
]

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [inputNama, setInputNama] = useState('')
  const [inputNim, setInputNim] = useState('')
  const [result, setResult] = useState<PengumumanData | null | undefined>(undefined)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showCurtain, setShowCurtain] = useState(false)
  const [curtainStage, setCurtainStage] = useState<'closed' | 'opening' | 'open'>('closed')

  // Auto-fill NIM when user data is loaded
  useEffect(() => {
    if (user) {
      setInputNim(user.nim)
    }
  }, [user])

  const API_URL = import.meta.env.VITE_API_URL || ''
  const isDevelopment = import.meta.env.DEV
  const baseURL = isDevelopment ? '' : API_URL

  // Check authentication status on mount
  useEffect(() => {
    // Skip if already loaded
    if (!isLoadingAuth) return;

    fetch(`${baseURL}/api/auth/status`, { cache: 'no-cache', credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user)
        }
        setIsLoadingAuth(false)
      })
      .catch(() => {
        setIsLoadingAuth(false)
      })
  }, [baseURL, isLoadingAuth])

  const handleLogout = () => {
    window.location.href = `${baseURL}/auth/logout`
  }

  const handleReset = () => {
    setShowCurtain(false)
    setCurtainStage('closed')
    setResult(undefined)
    setInputNama('')
    setInputNim(user?.nim || '')
  }

  const handleOpenCurtain = () => {
    setCurtainStage('opening')
    setTimeout(() => {
      setCurtainStage('open')
      if (result?.status === 'diterima') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }, 2000)
  }

  // Show login screen if not authenticated
  if (!isLoadingAuth && !user) {
    return <Login onLoginSuccess={setUser} />
  }

  // Show loading while checking auth
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const handleCheck = () => {
    setError('')
    setResult(undefined)
    setShowCurtain(false)
    setCurtainStage('closed')

    if (!inputNama.trim() || !inputNim.trim()) {
      setError('Data nama dan NIM tidak ditemukan dari email Anda. Pastikan format email benar (nama.nim@student.itera.ac.id).')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const hasil = PENGUMUMAN_DATA.find(
        (item) =>
          item.nim === inputNim.trim() &&
          item.nama.toLowerCase() === inputNama.trim().toLowerCase()
      )

      if (hasil) {
        setResult(hasil)
        setShowCurtain(true)
        // Wait for user to click button to open curtain
      } else {
        setResult(null)
        setError('Data tidak ditemukan. Pastikan nama dan NIM dari email Anda sudah terdaftar di sistem seleksi.')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header with User Info */}
        <header className="mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pengumuman Seleksi
          </h1>
          <p className="text-gray-600">
            Cek status kelulusan Anda di sini
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                value={inputNama}
                onChange={(e) => setInputNama(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="nim"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                NIM
              </label>
              <input
                type="text"
                id="nim"
                value={inputNim}
                onChange={(e) => setInputNim(e.target.value)}
                placeholder="Diisi otomatis dari email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-gray-50"
                disabled={isLoading}
                readOnly
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCheck}
                disabled={isLoading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Cek Status'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Curtain Reveal */}
        {showCurtain && result && (
          <CurtainReveal
            result={result}
            onReset={handleReset}
            curtainStage={curtainStage}
            onOpenCurtain={handleOpenCurtain}
          />
        )}

        {/* Data Not Found State */}
        {!showCurtain && result === null && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-red-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Data Tidak Ditemukan
              </h2>
              <p className="text-gray-600 mb-4">
                Nama dan NIM dari email Anda tidak terdaftar. Hubungi panitia seleksi untuk konfirmasi.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2026 Panitia Seleksi. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
