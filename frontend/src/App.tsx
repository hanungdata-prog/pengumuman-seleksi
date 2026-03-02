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
  { nama: "Hanung Akbar Pramusintho", nim: "124140207", divisi: "Eksternal", status: "diterima" },
  { nama: "Dina Olivia", nim: "124140213", divisi: "Eksternal", status: "diterima" },
  { nama: "Habib Al Rasyid", nim: "125370047", divisi: "Web Development", status: "diterima" },
  { nama: "Adinda Syaira Fatima", nim: "125430037", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Muhammad Aditya Ilham", nim: "125120040", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Muthia Rabbani", nim: "125400002", divisi: "Data Science", status: "diterima" },
  { nama: "Ratna Azizah Ismail", nim: "125140058", divisi: "DevOps", status: "ditolak" },
  { nama: "Muhammad Haikal Farros", nim: "125450049", divisi: "Web Development", status: "diterima" },
  { nama: "Dwi Reva Qolbi Rahmayani", nim: "125120188", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Ilhami Nur Akbar", nim: "125370137", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Cantika Ramadhani", nim: "125230094", divisi: "Content Creator", status: "diterima" },
  { nama: "Naila Husna", nim: "125240083", divisi: "UI/UX Design", status: "ditolak" },
  { nama: "Revina Adha Putri", nim: "125250033", divisi: "Data Science", status: "diterima" },
  { nama: "Jihan Asyisyura", nim: "125120134", divisi: "Web Development", status: "diterima" },
  { nama: "Assyifa Nabiilah", nim: "125120024", divisi: "DevOps", status: "ditolak" },
  { nama: "Anisa Ramadani", nim: "125140018", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Adhy Ammara Fayaza", nim: "125190134", divisi: "Mobile Development", status: "diterima" },
  { nama: "Afif Ardean", nim: "125230009", divisi: "Web Development", status: "ditolak" },
  { nama: "Febrika Aulia", nim: "125310048", divisi: "Content Creator", status: "diterima" },
  { nama: "Almalia Putri", nim: "125310024", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Nur Aini", nim: "125130074", divisi: "Data Science", status: "ditolak" },
  { nama: "Syurya Husni", nim: "125190023", divisi: "Web Development", status: "diterima" },
  { nama: "Quratul Hafidza", nim: "125220052", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Zahra Salsabila", nim: "125140177", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Habil Habibi", nim: "125480011", divisi: "DevOps", status: "diterima" },
  { nama: "Dira Dwi Fimarta", nim: "125430068", divisi: "Content Creator", status: "ditolak" },
  { nama: "Nagita Safitri", nim: "125240019", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Zakiah Ulfa Haniah", nim: "125310069", divisi: "Data Science", status: "diterima" },
  { nama: "Ibnu Kamil Al Amin", nim: "125220115", divisi: "Web Development", status: "ditolak" },
  { nama: "Syaiyatul Husyaini", nim: "125190001", divisi: "Mobile Development", status: "diterima" },
  { nama: "Habyby Firmansyah", nim: "125170094", divisi: "DevOps", status: "ditolak" },
  { nama: "Abdul Rafi Afesa", nim: "125260195", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Regina Azqia Qalbi", nim: "125310095", divisi: "Content Creator", status: "diterima" },
  { nama: "Wiska Lukhfiah Irwani", nim: "125120022", divisi: "Web Development", status: "ditolak" },
  { nama: "Muhammad Dzaky Kasri", nim: "125120005", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Lutfi Fadilla", nim: "125230058", divisi: "Data Science", status: "diterima" },
  { nama: "Khairunnisa", nim: "125340023", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Chaisa Cahaya Putri Natali Shangun", nim: "125280065", divisi: "DevOps", status: "diterima" },
  { nama: "Fiola Dwi Martha", nim: "125410081", divisi: "Digital Marketing", status: "ditolak" },
  { nama: "Nabila Darma", nim: "125430032", divisi: "Content Creator", status: "diterima" },
  { nama: "Gibran Maulana", nim: "125130084", divisi: "Web Development", status: "diterima" },
  { nama: "Deni Wilastra", nim: "125140025", divisi: "UI/UX Design", status: "ditolak" },
  { nama: "Yusuf Anaqi", nim: "125230132", divisi: "Data Science", status: "diterima" },
  { nama: "Brian Hidayat", nim: "125120033", divisi: "Mobile Development", status: "diterima" },
  { nama: "Rizka Yuliatika", nim: "125310038", divisi: "DevOps", status: "ditolak" },
  { nama: "Rizki Aprilian Putra", nim: "125290012", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Dhea Amanda", nim: "125210057", divisi: "Content Creator", status: "ditolak" },
  { nama: "Irvan Hanif", nim: "125480028", divisi: "Web Development", status: "diterima" },
  { nama: "Muhammad Enggar At Thaariq", nim: "125370105", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Syarifatuhuda", nim: "1253900036", divisi: "Data Science", status: "ditolak" },
  { nama: "Zakhruf Muharwan Yanza", nim: "125480021", divisi: "Mobile Development", status: "diterima" },
  { nama: "Ramda Zaki Yulindra", nim: "125140134", divisi: "DevOps", status: "ditolak" },
  { nama: "Hanifha Aulia Putri", nim: "125510076", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Yahya Abdi Rahman", nim: "125390065", divisi: "Content Creator", status: "diterima" },
  { nama: "Muhammad Al-Farabi Putra Syahendri", nim: "125370008", divisi: "Web Development", status: "ditolak" },
  { nama: "Afriza Yulia Azra", nim: "125420080", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Muhammad Daffa Addinul Putra", nim: "125370065", divisi: "Data Science", status: "diterima" },
  { nama: "Hadits Wirdatuljannah Syafna", nim: "125180029", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Bunga Ramda Ruliesty", nim: "125430096", divisi: "DevOps", status: "diterima" },
  { nama: "Fika Armelia", nim: "125230072", divisi: "Digital Marketing", status: "ditolak" },
  { nama: "Bening Arianti", nim: "125450068", divisi: "Content Creator", status: "diterima" },
  { nama: "Ghandy Prasetia", nim: "125170115", divisi: "Web Development", status: "diterima" },
  { nama: "Suci Ramadhani", nim: "125470075", divisi: "UI/UX Design", status: "ditolak" },
  { nama: "Miftahul Jannah", nim: "125430012", divisi: "Data Science", status: "diterima" },
  { nama: "Salsabila Putri Ayunda", nim: "125430089", divisi: "Mobile Development", status: "diterima" },
  { nama: "Afi Zuhdi Azizi", nim: "125470016", divisi: "DevOps", status: "ditolak" },
  { nama: "Nayla Salsabila", nim: "125430108", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Caesa Lady Anelka", nim: "125260132", divisi: "Content Creator", status: "ditolak" },
  { nama: "Dimas Hadi Prasetiyo", nim: "125480047", divisi: "Web Development", status: "diterima" },
  { nama: "M. Naufal", nim: "125230141", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Muhammad Fathih Farhat", nim: "125340082", divisi: "Data Science", status: "ditolak" },
  { nama: "Rency Irfandasri", nim: "125400066", divisi: "Mobile Development", status: "diterima" },
  { nama: "Arifa Eka Nurrahma", nim: "125220166", divisi: "DevOps", status: "ditolak" },
  { nama: "M. Farhan Ramadhan", nim: "125310054", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Fauzi Rahman", nim: "125170042", divisi: "Content Creator", status: "diterima" },
  { nama: "Diva Febriani", nim: "125180076", divisi: "Web Development", status: "ditolak" },
  { nama: "Miftahul Gina", nim: "125260074", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Aina Nur Arifah", nim: "125210173", divisi: "Data Science", status: "diterima" },
  { nama: "Ariq Rais Alfarizy", nim: "125120031", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Nurul Hanifah", nim: "125420034", divisi: "DevOps", status: "diterima" },
  { nama: "Saula Tifa", nim: "125260039", divisi: "Digital Marketing", status: "ditolak" },
  { nama: "M. Fuad Aqil", nim: "125120174", divisi: "Content Creator", status: "diterima" },
  { nama: "Futiha Rahayu Wulandari", nim: "125150045", divisi: "Web Development", status: "diterima" },
  { nama: "Wahyu Oktrian Fernanda", nim: "125210117", divisi: "UI/UX Design", status: "ditolak" },
  { nama: "Diana Warman", nim: "125230047", divisi: "Data Science", status: "diterima" },
  { nama: "Zahla Utari Taufik", nim: "125500034", divisi: "Mobile Development", status: "diterima" },
  { nama: "Alya Zahwa Harnela", nim: "125150011", divisi: "DevOps", status: "ditolak" },
  { nama: "Alya Natasya", nim: "125120080", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Muhammad Rafiif Zulwi", nim: "125210121", divisi: "Content Creator", status: "diterima" },
  { nama: "Hafizul Zikri", nim: "125210181", divisi: "Web Development", status: "ditolak" },
  { nama: "Muhammad Abdul Hakim", nim: "125360037", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Faktur Rahman Yovindra", nim: "125130023", divisi: "Data Science", status: "diterima" },
  { nama: "Muhammad Abdul Roif", nim: "125150117", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Efni Rahayu", nim: "125260022", divisi: "DevOps", status: "diterima" },
  { nama: "Aidhila Gueto Rinata", nim: "125420022", divisi: "Digital Marketing", status: "ditolak" },
  { nama: "Chairan Fadjri", nim: "125460019", divisi: "Content Creator", status: "diterima" },
  { nama: "Inayatul Husna", nim: "125120026", divisi: "Web Development", status: "diterima" },
  { nama: "Intan Nofita Yusni", nim: "125360114", divisi: "UI/UX Design", status: "ditolak" },
  { nama: "Muhammad Alfo Siddiq", nim: "125130138", divisi: "Data Science", status: "diterima" },
  { nama: "Muhammad Syukri", nim: "125310066", divisi: "Mobile Development", status: "diterima" },
  { nama: "Raditya Viendra", nim: "125230119", divisi: "DevOps", status: "ditolak" },
  { nama: "Selvi Anggeraini", nim: "125520033", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Nggara Triarista", nim: "125360065", divisi: "Content Creator", status: "ditolak" },
  { nama: "Siska Ernawati", nim: "125370102", divisi: "Web Development", status: "diterima" },
  { nama: "Amira Fadhila Hanan", nim: "125310012", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Auza Ramadani", nim: "125310094", divisi: "Data Science", status: "ditolak" },
  { nama: "Bintang Nito Alfath", nim: "125230049", divisi: "Mobile Development", status: "diterima" },
  { nama: "Farras Abeldira Salsabila", nim: "125500082", divisi: "DevOps", status: "ditolak" },
  { nama: "M. Ilham Ghifari", nim: "125210140", divisi: "Digital Marketing", status: "diterima" },
  { nama: "Jupri Alfiandi", nim: "125130048", divisi: "Content Creator", status: "diterima" },
  { nama: "Riva Septia Nanda", nim: "125450114", divisi: "Web Development", status: "ditolak" },
  { nama: "Septivo Dhito Chandra", nim: "124410126", divisi: "UI/UX Design", status: "diterima" },
  { nama: "Muhammad Syafiq Rida", nim: "125400084", divisi: "Data Science", status: "diterima" },
  { nama: "Muhammad Rafka", nim: "124450089", divisi: "Mobile Development", status: "ditolak" },
  { nama: "Arijal Alfi Syahri", nim: "125170016", divisi: "DevOps", status: "diterima" }
]

const WHATSAPP_GROUPS: Record<string, string> = {
  "Eksternal": "https://chat.whatsapp.com/KcuLG70hPjSKWTwFYkjc7m?mode=gi_t",
  "Web Development": "https://chat.whatsapp.com/your-web-dev-group-link",
  "UI/UX Design": "https://chat.whatsapp.com/your-uiux-group-link",
  "Mobile Development": "https://chat.whatsapp.com/your-mobile-dev-group-link",
  "DevOps": "https://chat.whatsapp.com/your-devops-group-link",
  "Digital Marketing": "https://chat.whatsapp.com/your-digital-marketing-group-link",
  "Content Creator": "https://chat.whatsapp.com/your-content-creator-group-link"
}

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

  useEffect(() => {
    if (user) {
      setInputNim(user.nim)
    }
  }, [user])

  const API_URL = import.meta.env.VITE_API_URL || ''
  const isDevelopment = import.meta.env.DEV
  // Use relative path in production (Vercel proxy), absolute in development
  const baseURL = isDevelopment ? API_URL : ''

  useEffect(() => {
    if (!isLoadingAuth) return
    fetch(`${baseURL}/api/auth/status`, { cache: 'no-cache', credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user)
        setIsLoadingAuth(false)
      })
      .catch(() => setIsLoadingAuth(false))
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

    // Preload all audio files
    const sounds: HTMLAudioElement[] = []
      ;[5, 4, 3, 2, 1].forEach((num) => {
        const audio = new Audio(`/sounds/countdown-${num}.mp3`)
        audio.volume = 0.5
        sounds.push(audio)
      })

      // Play sounds with delay: 5, 4, 3, 2, 1 (1 second each)
      ;[0, 1, 2, 3, 4].forEach((index) => {
        setTimeout(() => {
          sounds[index].play().catch((err) => {
            console.error(`Audio countdown-${5 - index} failed:`, err)
          })
        }, index * 1000)
      })

    // Open curtains after countdown (6 seconds total)
    setTimeout(() => {
      setCurtainStage('open')
      if (result?.status === 'diterima') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
      }
    }, 6000)
  }

  if (!isLoadingAuth && !user) {
    return <Login onLoginSuccess={setUser} />
  }

  if (isLoadingAuth) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');
          :root {
            --black: #1D1D1E; --dark-red: #620A1A; --gold: #C6953F;
            --red: #A31E21; --cream: #E9E3D6; --white: #F9F7F5;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
        `}</style>
        <div style={{ minHeight: '100vh', background: '#1D1D1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, border: '3px solid #C6953F', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <p style={{ color: 'rgba(249,247,245,0.5)', fontFamily: 'Lato, sans-serif', fontSize: 14 }}>Memuat...</p>
          </div>
        </div>
      </>
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
      } else {
        setResult(null)
        setError('Data tidak ditemukan. Pastikan nama dan NIM dari email Anda sudah terdaftar di sistem seleksi.')
      }
      setIsLoading(false)
    }, 500)
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

        .app-root {
          min-height: 100vh;
          background-color: var(--black);
          font-family: 'Lato', sans-serif;
          padding: 24px 16px 48px;
          position: relative;
          overflow-x: hidden;
        }

        .app-root::before {
          content: '';
          position: fixed;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(98,10,26,0.35) 0%, transparent 70%);
          top: -200px; right: -200px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .app-root::after {
          content: '';
          position: fixed;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(163,30,33,0.15) 0%, transparent 70%);
          bottom: -150px; left: -100px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .app-content {
          position: relative;
          z-index: 1;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ---- User Bar ---- */
        .user-bar {
          background: rgba(249,247,245,0.04);
          border: 1px solid rgba(198,149,63,0.2);
          border-radius: 4px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          animation: fadeDown 0.5s ease forwards;
          opacity: 0;
          transform: translateY(-12px);
        }

        @keyframes fadeDown {
          to { opacity: 1; transform: translateY(0); }
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(198,149,63,0.4);
          object-fit: cover;
        }

        .user-avatar-fallback {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(198,149,63,0.4);
          background: rgba(163,30,33,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          font-weight: 700;
          font-size: 15px;
          font-family: 'Playfair Display', serif;
        }

        .user-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 2px;
        }

        .user-email {
          font-size: 12px;
          color: rgba(233,227,214,0.45);
          font-weight: 300;
        }

        .logout-btn {
          background: none;
          border: 1px solid rgba(163,30,33,0.4);
          border-radius: 3px;
          padding: 6px 8px;
          cursor: pointer;
          color: rgba(233,227,214,0.4);
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }

        .logout-btn:hover {
          border-color: var(--red);
          color: #f87171;
          background: rgba(163,30,33,0.15);
        }

        /* ---- Page Header ---- */
        .page-header {
          text-align: center;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease 0.1s forwards;
          opacity: 0;
          transform: translateY(16px);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .page-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
          font-weight: 400;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .page-subtitle {
          font-size: 14px;
          color: rgba(233,227,214,0.5);
          font-weight: 300;
        }

        /* Decorative line */
        .header-deco {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
        }

        .deco-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(198,149,63,0.5));
        }

        .deco-line.right {
          background: linear-gradient(90deg, rgba(198,149,63,0.5), transparent);
        }

        .deco-diamond {
          width: 6px; height: 6px;
          background: var(--gold);
          transform: rotate(45deg);
          opacity: 0.7;
        }

        /* ---- Form Card ---- */
        .form-card {
          background: rgba(249,247,245,0.03);
          border: 1px solid rgba(198,149,63,0.18);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20px;
          animation: fadeUp 0.6s ease 0.2s forwards;
          opacity: 0;
          transform: translateY(16px);
        }

        .form-card-top {
          height: 3px;
          background: linear-gradient(90deg, var(--dark-red), var(--gold), var(--dark-red));
        }

        .form-body {
          padding: 28px 28px 24px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .field-input {
          width: 100%;
          background: rgba(29,29,30,0.8);
          border: 1px solid rgba(198,149,63,0.2);
          border-radius: 3px;
          padding: 12px 16px;
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          color: var(--white);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 20px;
        }

        .field-input::placeholder {
          color: rgba(233,227,214,0.25);
        }

        .field-input:focus {
          border-color: rgba(198,149,63,0.5);
          box-shadow: 0 0 0 3px rgba(198,149,63,0.08);
        }

        .field-input:read-only {
          color: rgba(233,227,214,0.4);
          cursor: default;
          border-style: dashed;
        }

        .error-box {
          background: rgba(163,30,33,0.15);
          border: 1px solid rgba(163,30,33,0.4);
          border-left: 3px solid var(--red);
          border-radius: 3px;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px;
          color: rgba(248,113,113,0.9);
          line-height: 1.5;
        }

        .cek-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--dark-red) 0%, var(--red) 100%);
          border: none;
          border-radius: 3px;
          padding: 14px 20px;
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--cream);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .cek-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(198,149,63,0.15), transparent);
          transition: left 0.4s ease;
        }

        .cek-btn:hover::before {
          left: 100%;
        }

        .cek-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(163,30,33,0.4);
        }

        .cek-btn:active { transform: translateY(0); }

        .cek-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Spin */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }

        /* ---- Not Found Card ---- */
        .not-found-card {
          background: rgba(249,247,245,0.03);
          border: 1px solid rgba(163,30,33,0.35);
          border-top: 3px solid var(--red);
          border-radius: 4px;
          padding: 32px 24px;
          text-align: center;
          animation: fadeUp 0.4s ease forwards;
        }

        .not-found-icon {
          width: 56px; height: 56px;
          background: rgba(163,30,33,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border: 1px solid rgba(163,30,33,0.3);
        }

        .not-found-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--white);
          margin-bottom: 8px;
        }

        .not-found-text {
          font-size: 13px;
          color: rgba(233,227,214,0.5);
          line-height: 1.6;
          font-weight: 300;
        }

        /* ---- Footer ---- */
        .app-footer {
          text-align: center;
          margin-top: 40px;
          font-size: 12px;
          color: rgba(233,227,214,0.2);
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .app-footer span {
          color: rgba(198,149,63,0.4);
        }
      `}</style>

      <div className="app-root">
        <div className="app-content">

          {/* User Bar */}
          <div className="user-bar">
            <div className="user-info">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-avatar"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              ) : (
                <div className="user-avatar-fallback">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="user-name">{user?.name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          {/* Page Header */}
          <div className="page-header">
            <p className="page-eyebrow">BPH IKM · 2026 - 2027</p>
            <h1 className="page-title">Pengumuman Penetapan Staff</h1>
            <p className="page-subtitle">Cek status kelulusan Anda di sini</p>
            <div className="header-deco">
              <div className="deco-line" />
              <div className="deco-diamond" />
              <div className="deco-line right" />
            </div>
          </div>

          {/* Form Card */}
          <div className="form-card">
            <div className="form-card-top" />
            <div className="form-body">
              <label htmlFor="nama" className="field-label">Nama Lengkap</label>
              <input
                type="text"
                id="nama"
                value={inputNama}
                onChange={(e) => setInputNama(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="field-input"
                disabled={isLoading}
              />

              <label htmlFor="nim" className="field-label">NIM</label>
              <input
                type="text"
                id="nim"
                value={inputNim}
                onChange={(e) => setInputNim(e.target.value)}
                placeholder="Diisi otomatis dari email"
                className="field-input"
                disabled={isLoading}
                readOnly
              />

              {error && <div className="error-box">{error}</div>}

              <button onClick={handleCheck} disabled={isLoading} className="cek-btn">
                {isLoading ? (
                  <>
                    <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Cek Status
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Curtain Reveal */}
          {showCurtain && result && (
            <CurtainReveal
              result={result}
              onReset={handleReset}
              curtainStage={curtainStage}
              onOpenCurtain={handleOpenCurtain}
              whatsappGroupLink={result.status === 'diterima' ? WHATSAPP_GROUPS[result.divisi] : undefined}
            />
          )}

          {/* Not Found */}
          {!showCurtain && result === null && (
            <div className="not-found-card">
              <div className="not-found-icon">
                <svg width="24" height="24" fill="none" stroke="#f87171" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="not-found-title">Data Tidak Ditemukan</h2>
              <p className="not-found-text">
                Nama dan NIM dari email Anda tidak terdaftar.<br />
                Hubungi BPH IKM untuk konfirmasi.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="app-footer">
            © <span>BPH IKM 2026 - 2027</span>. All rights reserved.
          </footer>

        </div>
      </div>
    </>
  )
}

export default App