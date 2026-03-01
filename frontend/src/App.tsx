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
    nama: "Hanung Akbar Pramusintho",
    nim: "124140207",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Habib Al Rasyid",
    nim: "125370047",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Adinda Syaira Fatima",
    nim: "125430037",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Muhammad Aditya Ilham",
    nim: "125120040",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Muthia Rabbani",
    nim: "125400002",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Ratna Azizah Ismail",
    nim: "125140058",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Muhammad Haikal Farros",
    nim: "125450049",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Dwi Reva Qolbi Rahmayani",
    nim: "125120188",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Ilhami Nur Akbar",
    nim: "125370137",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Cantika Ramadhani",
    nim: "125230094",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Naila Husna",
    nim: "125240083",
    divisi: "UI/UX Design",
    status: "ditolak"
  },
  {
    nama: "Revina Adha Putri",
    nim: "125250033",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Jihan Asyisyura",
    nim: "125120134",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Assyifa Nabiilah",
    nim: "125120024",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Anisa Ramadani",
    nim: "125140018",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Adhy Ammara Fayaza",
    nim: "125190134",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Afif Ardean",
    nim: "125230009",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Febrika Aulia",
    nim: "125310048",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Almalia Putri",
    nim: "125310024",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Nur Aini",
    nim: "125130074",
    divisi: "Data Science",
    status: "ditolak"
  },
  {
    nama: "Syurya Husni",
    nim: "125190023",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Quratul Hafidza",
    nim: "125220052",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Zahra Salsabila",
    nim: "125140177",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Habil Habibi",
    nim: "125480011",
    divisi: "DevOps",
    status: "diterima"
  },
  {
    nama: "Dira Dwi Fimarta",
    nim: "125430068",
    divisi: "Content Creator",
    status: "ditolak"
  },
  {
    nama: "Nagita Safitri",
    nim: "125240019",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Zakiah Ulfa Haniah",
    nim: "125310069",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Ibnu Kamil Al Amin",
    nim: "125220115",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Syaiyatul Husyaini",
    nim: "125190001",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Habyby Firmansyah",
    nim: "125170094",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Abdul Rafi Afesa",
    nim: "125260195",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Regina Azqia Qalbi",
    nim: "125310095",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Wiska Lukhfiah Irwani",
    nim: "125120022",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Muhammad Dzaky Kasri",
    nim: "125120005",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Lutfi Fadilla",
    nim: "125230058",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Khairunnisa",
    nim: "125340023",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Chaisa Cahaya Putri Natali Shangun",
    nim: "125280065",
    divisi: "DevOps",
    status: "diterima"
  },
  {
    nama: "Fiola Dwi Martha",
    nim: "125410081",
    divisi: "Digital Marketing",
    status: "ditolak"
  },
  {
    nama: "Nabila Darma",
    nim: "125430032",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Gibran Maulana",
    nim: "125130084",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Deni Wilastra",
    nim: "125140025",
    divisi: "UI/UX Design",
    status: "ditolak"
  },
  {
    nama: "Yusuf Anaqi",
    nim: "125230132",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Brian Hidayat",
    nim: "125120033",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Rizka Yuliatika",
    nim: "125310038",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Rizki Aprilian Putra",
    nim: "125290012",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Dhea Amanda",
    nim: "125210057",
    divisi: "Content Creator",
    status: "ditolak"
  },
  {
    nama: "Irvan Hanif",
    nim: "125480028",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Muhammad Enggar At Thaariq",
    nim: "125370105",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Syarifatuhuda",
    nim: "1253900036",
    divisi: "Data Science",
    status: "ditolak"
  },
  {
    nama: "Zakhruf Muharwan Yanza",
    nim: "125480021",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Ramda Zaki Yulindra",
    nim: "125140134",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Hanifha Aulia Putri",
    nim: "125510076",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Yahya Abdi Rahman",
    nim: "125390065",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Muhammad Al-Farabi Putra Syahendri",
    nim: "125370008",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Afriza Yulia Azra",
    nim: "125420080",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Muhammad Daffa Addinul Putra",
    nim: "125370065",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Hadits Wirdatuljannah Syafna",
    nim: "125180029",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Bunga Ramda Ruliesty",
    nim: "125430096",
    divisi: "DevOps",
    status: "diterima"
  },
  {
    nama: "Fika Armelia",
    nim: "125230072",
    divisi: "Digital Marketing",
    status: "ditolak"
  },
  {
    nama: "Bening Arianti",
    nim: "125450068",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Ghandy Prasetia",
    nim: "125170115",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Suci Ramadhani",
    nim: "125470075",
    divisi: "UI/UX Design",
    status: "ditolak"
  },
  {
    nama: "Miftahul Jannah",
    nim: "125430012",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Salsabila Putri Ayunda",
    nim: "125430089",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Afi Zuhdi Azizi",
    nim: "125470016",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Nayla Salsabila",
    nim: "125430108",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Caesa Lady Anelka",
    nim: "125260132",
    divisi: "Content Creator",
    status: "ditolak"
  },
  {
    nama: "Dimas Hadi Prasetiyo",
    nim: "125480047",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "M. Naufal",
    nim: "125230141",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Muhammad Fathih Farhat",
    nim: "125340082",
    divisi: "Data Science",
    status: "ditolak"
  },
  {
    nama: "Rency Irfandasri",
    nim: "125400066",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Arifa Eka Nurrahma",
    nim: "125220166",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "M. Farhan Ramadhan",
    nim: "125310054",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Fauzi Rahman",
    nim: "125170042",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Diva Febriani",
    nim: "125180076",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Miftahul Gina",
    nim: "125260074",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Aina Nur Arifah",
    nim: "125210173",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Ariq Rais Alfarizy",
    nim: "125120031",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Nurul Hanifah",
    nim: "125420034",
    divisi: "DevOps",
    status: "diterima"
  },
  {
    nama: "Saula Tifa",
    nim: "125260039",
    divisi: "Digital Marketing",
    status: "ditolak"
  },
  {
    nama: "M. Fuad Aqil",
    nim: "125120174",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Futiha Rahayu Wulandari",
    nim: "125150045",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Wahyu Oktrian Fernanda",
    nim: "125210117",
    divisi: "UI/UX Design",
    status: "ditolak"
  },
  {
    nama: "Diana Warman",
    nim: "125230047",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Zahla Utari Taufik",
    nim: "125500034",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Alya Zahwa Harnela",
    nim: "125150011",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Alya Natasya",
    nim: "125120080",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Muhammad Rafiif Zulwi",
    nim: "125210121",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Hafizul Zikri",
    nim: "125210181",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Muhammad Abdul Hakim",
    nim: "125360037",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Faktur Rahman Yovindra",
    nim: "125130023",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Muhammad Abdul Roif",
    nim: "125150117",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Efni Rahayu",
    nim: "125260022",
    divisi: "DevOps",
    status: "diterima"
  },
  {
    nama: "Aidhila Gueto Rinata",
    nim: "125420022",
    divisi: "Digital Marketing",
    status: "ditolak"
  },
  {
    nama: "Chairan Fadjri",
    nim: "125460019",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Inayatul Husna",
    nim: "125120026",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Intan Nofita Yusni",
    nim: "125360114",
    divisi: "UI/UX Design",
    status: "ditolak"
  },
  {
    nama: "Muhammad Alfo Siddiq",
    nim: "125130138",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Muhammad Syukri",
    nim: "125310066",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Raditya Viendra",
    nim: "125230119",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "Selvi Anggeraini",
    nim: "125520033",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Nggara Triarista",
    nim: "125360065",
    divisi: "Content Creator",
    status: "ditolak"
  },
  {
    nama: "Siska Ernawati",
    nim: "125370102",
    divisi: "Web Development",
    status: "diterima"
  },
  {
    nama: "Amira Fadhila Hanan",
    nim: "125310012",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Auza Ramadani",
    nim: "125310094",
    divisi: "Data Science",
    status: "ditolak"
  },
  {
    nama: "Bintang Nito Alfath",
    nim: "125230049",
    divisi: "Mobile Development",
    status: "diterima"
  },
  {
    nama: "Farras Abeldira Salsabila",
    nim: "125500082",
    divisi: "DevOps",
    status: "ditolak"
  },
  {
    nama: "M. Ilham Ghifari",
    nim: "125210140",
    divisi: "Digital Marketing",
    status: "diterima"
  },
  {
    nama: "Jupri Alfiandi",
    nim: "125130048",
    divisi: "Content Creator",
    status: "diterima"
  },
  {
    nama: "Riva Septia Nanda",
    nim: "125450114",
    divisi: "Web Development",
    status: "ditolak"
  },
  {
    nama: "Septivo Dhito Chandra",
    nim: "124410126",
    divisi: "UI/UX Design",
    status: "diterima"
  },
  {
    nama: "Muhammad Syafiq Rida",
    nim: "125400084",
    divisi: "Data Science",
    status: "diterima"
  },
  {
    nama: "Muhammad Rafka",
    nim: "124450089",
    divisi: "Mobile Development",
    status: "ditolak"
  },
  {
    nama: "Arijal Alfi Syahri",
    nim: "125170016",
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
