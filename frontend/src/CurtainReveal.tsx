interface CurtainRevealProps {
  result: {
    nama: string
    nim: string
    divisi: string
    status: 'diterima' | 'ditolak'
  } | null
  onReset: () => void
  curtainStage: 'closed' | 'opening' | 'open'
  onOpenCurtain?: () => void
}

export default function CurtainReveal({ result, onReset, curtainStage, onOpenCurtain }: CurtainRevealProps) {
  return (
    <div className="curtain-container fixed inset-0 z-50 overflow-hidden">
      {/* Stage Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7a4f00] via-[#3a2000] to-[#0a0704]" />

      {/* Floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[35%] bg-gradient-to-t from-[rgba(240,192,64,0.35)] to-transparent pointer-events-none" />

      {/* Spotlight */}
      <div className="spotlight absolute -top-1/2 left-1/2 -translate-x-1/2 w-[520px] h-[180%] bg-[conic-gradient(from_0deg_at_50%_0%,transparent_60%,rgba(255,220,80,0.08)_75%,rgba(255,220,80,0.14)_80%,rgba(255,220,80,0.08)_85%,transparent_100%)] animate-spotlight-flicker z-10" />

      {/* Left Curtain */}
      <div className={`curtain curtain-left absolute left-0 top-0 w-1/2 h-full z-20 transition-transform duration-[2000ms] ease-in-out will-change-transform ${curtainStage === 'open' ? 'open' : 'close'
        }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a00] via-[#5c1a00] to-[#1a0500]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(0,0,0,0.15)_18px,rgba(255,255,255,0.05)_36px,rgba(0,0,0,0.1)_54px)]" />
        <div className="absolute right-0 top-0 bottom-0 w-[14px] bg-gradient-to-b from-[#f0c040] via-[#b88a00] to-[#f0c040] shadow-[0_0_18px_4px_rgba(240,192,64,0.6)]" />
      </div>

      {/* Right Curtain */}
      <div className={`curtain curtain-right absolute right-0 top-0 w-1/2 h-full z-20 transition-transform duration-[2000ms] ease-in-out will-change-transform ${curtainStage === 'open' ? 'open' : 'close'
        }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a00] via-[#5c1a00] to-[#1a0500]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(0,0,0,0.15)_18px,rgba(255,255,255,0.05)_36px,rgba(0,0,0,0.1)_54px)]" />
        <div className="absolute left-0 top-0 bottom-0 w-[14px] bg-gradient-to-b from-[#f0c040] via-[#b88a00] to-[#f0c040] shadow-[0_0_18px_4px_rgba(240,192,64,0.6)]" />
      </div>

      {/* Pelmet (top decoration) */}
      <div className="pelmet absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#1a0700] to-[#3d1000] z-30 border-b border-[rgba(240,192,64,0.3)]">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f0c040] to-transparent" />
      </div>

      {/* Content */}
      <div className="content absolute inset-0 flex flex-col items-center justify-center z-40">
        {/* Open Curtain Button */}
        {curtainStage === 'closed' && result && (
          <button
            onClick={onOpenCurtain}
            className="open-curtain-btn px-10 py-5 bg-gradient-to-r from-[#f0c040] to-[#b88a00] text-[#0a0704] font-bold text-xl rounded-lg hover:brightness-110 transition-all font-['Cinzel_Decorative'] tracking-wider shadow-[0_0_30px_rgba(240,192,64,0.6)] hover:shadow-[0_0_50px_rgba(240,192,64,0.8)] hover:scale-105 active:scale-95"
            style={{
              animation: 'buttonPulse 2s ease-in-out infinite'
            }}
          >
            BUKA TIRAI
          </button>
        )}

        {/* Result */}
        {result && curtainStage === 'open' && (
          <div className="result-container text-center opacity-0" style={{
            animation: 'fadeInResult 0.5s ease 0.5s forwards'
          }}>
            <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${result.status === 'diterima'
                ? 'bg-green-100'
                : 'bg-orange-100'
              }`}>
              {result.status === 'diterima' ? (
                <svg className="w-10 h-10 md:w-12 md:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-10 h-10 md:w-12 md:h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Cinzel_Decorative'] bg-gradient-to-r from-[#ffe080] via-[#f0c040] to-[#b88a00] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(240,192,64,0.5)]">
              {result.status === 'diterima' ? 'SELAMAT!' : 'TETAP SEMANGAT!'}
            </h2>

            <p className="text-lg md:text-xl text-[#fff8e7] mb-1 font-['Cormorant_Garamond'] italic font-semibold">
              {result.nama}
            </p>
            <p className="text-sm md:text-base text-[#fff8e7]/60 mb-6 font-['Cormorant_Garamond']">
              NIM: {result.nim}
            </p>

            <div className={`px-6 md:px-8 py-4 rounded-xl border-2 ${result.status === 'diterima'
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
              }`}>
              <p className={`text-sm md:text-lg mb-2 ${result.status === 'diterima' ? 'text-green-700' : 'text-orange-700'
                }`}>
                Divisi:
              </p>
              <p className={`text-xl md:text-2xl font-bold ${result.status === 'diterima' ? 'text-green-700' : 'text-orange-700'
                }`}>
                {result.divisi}
              </p>
            </div>

            <p className={`mt-6 text-sm md:text-lg italic px-4 ${result.status === 'diterima' ? 'text-green-600' : 'text-orange-600'
              }`}>
              {result.status === 'diterima'
                ? 'Selamat bergabung! Kami tunggu kontribusi terbaik Anda.'
                : 'Jangan berkecil hati! Kegagalan hari ini adalah persimpangan menuju kesuksesan yang lebih besar.'}
            </p>

            <button
              onClick={onReset}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-[#f0c040] to-[#b88a00] text-[#0a0704] font-bold rounded-lg hover:brightness-110 transition-all font-['Cinzel_Decorative'] tracking-wider shadow-lg"
            >
              CEK LAGI
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(240,192,64,0.6);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 50px rgba(240,192,64,0.8);
          }
        }

        @keyframes fadeInResult {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .curtain-left {
          transform-origin: left top;
        }
        
        .curtain-right {
          transform-origin: right top;
        }
        
        .curtain-left.open {
          transform: translateX(-98%);
        }
        
        .curtain-right.open {
          transform: translateX(98%);
        }
        
        .curtain-left.close {
          transform: translateX(0);
        }
        
        .curtain-right.close {
          transform: translateX(0);
        }
      `}</style>
    </div>
  )
}
