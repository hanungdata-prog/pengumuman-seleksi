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
  whatsappGroupLink?: string
}

export default function CurtainReveal({ result, onReset, curtainStage, onOpenCurtain, whatsappGroupLink }: CurtainRevealProps) {
  return (
    <div className="curtain-container fixed inset-0 z-50 overflow-hidden">
      {/* Stage Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7a4f00] via-[#3a2000] to-[#0a0704]" />

      {/* Floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[35%] bg-gradient-to-t from-[rgba(240,192,64,0.35)] to-transparent pointer-events-none" />

      {/* Spotlight */}
      <div className="spotlight absolute -top-1/2 left-1/2 -translate-x-1/2 w-[520px] h-[180%] bg-[conic-gradient(from_0deg_at_50%_0%,transparent_60%,rgba(255,220,80,0.08)_75%,rgba(255,220,80,0.14)_80%,rgba(255,220,80,0.08)_85%,transparent_100%)] animate-spotlight-flicker z-10" />

      {/* Left Curtain */}
      <div className={`curtain curtain-left absolute left-0 top-0 w-1/2 h-full z-20 transition-transform duration-[2000ms] ease-in-out will-change-transform ${curtainStage === 'open' ? 'open' : 'close'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a00] via-[#5c1a00] to-[#1a0500]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(0,0,0,0.15)_18px,rgba(255,255,255,0.05)_36px,rgba(0,0,0,0.1)_54px)]" />
        <div className="absolute right-0 top-0 bottom-0 w-[14px] bg-gradient-to-b from-[#f0c040] via-[#b88a00] to-[#f0c040] shadow-[0_0_18px_4px_rgba(240,192,64,0.6)]" />
      </div>

      {/* Right Curtain */}
      <div className={`curtain curtain-right absolute right-0 top-0 w-1/2 h-full z-20 transition-transform duration-[2000ms] ease-in-out will-change-transform ${curtainStage === 'open' ? 'open' : 'close'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a00] via-[#5c1a00] to-[#1a0500]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(0,0,0,0.15)_18px,rgba(255,255,255,0.05)_36px,rgba(0,0,0,0.1)_54px)]" />
        <div className="absolute left-0 top-0 bottom-0 w-[14px] bg-gradient-to-b from-[#f0c040] via-[#b88a00] to-[#f0c040] shadow-[0_0_18px_4px_rgba(240,192,64,0.6)]" />
      </div>

      {/* Pelmet (top decoration) */}
      <div className="pelmet absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#1a0700] to-[#3d1000] z-30 border-b border-[rgba(240,192,64,0.3)]">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f0c040] to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-6">

        {/* Open Curtain Button */}
        {curtainStage === 'closed' && result && (
          <button
            onClick={onOpenCurtain}
            className="px-10 py-5 bg-gradient-to-r from-[#f0c040] to-[#b88a00] text-[#0a0704] font-bold text-xl rounded-lg hover:brightness-110 transition-all font-['Cinzel_Decorative'] tracking-wider shadow-[0_0_30px_rgba(240,192,64,0.6)] hover:shadow-[0_0_50px_rgba(240,192,64,0.8)] hover:scale-105 active:scale-95"
            style={{ animation: 'buttonPulse 2s ease-in-out infinite' }}
          >
            BUKA TIRAI
          </button>
        )}

        {/* Result */}
        {result && curtainStage === 'open' && (
          <div
            className="w-full max-w-sm text-center opacity-0"
            style={{ animation: 'fadeInResult 0.5s ease 0.5s forwards' }}
          >
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${result.status === 'diterima' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                {result.status === 'diterima' ? (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Cinzel_Decorative'] bg-gradient-to-r from-[#ffe080] via-[#f0c040] to-[#b88a00] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(240,192,64,0.5)]">
              {result.status === 'diterima' ? 'SELAMAT!' : 'TETAP SEMANGAT!'}
            </h2>

            {/* Name & NIM */}
            <p className="text-lg md:text-xl text-[#fff8e7] mb-1 font-['Cormorant_Garamond'] italic font-semibold">
              {result.nama}
            </p>
            <p className="text-sm md:text-base text-[#fff8e7]/60 mb-6 font-['Cormorant_Garamond']">
              NIM: {result.nim}
            </p>

            {/* Divisi Box */}
            <div className={`px-6 py-4 rounded-xl border-2 mb-6 ${result.status === 'diterima'
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
              }`}>
              <p className={`text-sm mb-1 ${result.status === 'diterima' ? 'text-green-700' : 'text-orange-700'}`}>
                Divisi:
              </p>
              <p className={`text-xl md:text-2xl font-bold ${result.status === 'diterima' ? 'text-green-700' : 'text-orange-700'}`}>
                {result.divisi}
              </p>
            </div>

            {/* Message */}
            <p className={`text-sm md:text-base italic mb-8 leading-relaxed ${result.status === 'diterima' ? 'text-green-400' : 'text-orange-400'
              }`}>
              {result.status === 'diterima'
                ? 'Selamat bergabung! Kami tunggu kontribusi terbaik Anda.'
                : 'Jangan berkecil hati! Kegagalan hari ini adalah persimpangan menuju kesuksesan yang lebih besar.'}
            </p>

            {/* CTA Button */}
            {result.status === 'diterima' && whatsappGroupLink ? (
              <a
                href={whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl transition-all font-['Cinzel_Decorative'] tracking-wider shadow-lg hover:shadow-green-900/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                GABUNG KE GROUP
              </a>
            ) : (
              <button
                onClick={onReset}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#f0c040] to-[#b88a00] text-[#0a0704] font-bold text-base rounded-xl hover:brightness-110 transition-all font-['Cinzel_Decorative'] tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                CEK LAGI
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(240,192,64,0.6); }
          50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(240,192,64,0.8); }
        }
        @keyframes fadeInResult {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .curtain-left { transform-origin: left top; }
        .curtain-right { transform-origin: right top; }
        .curtain-left.open { transform: translateX(-98%); }
        .curtain-right.open { transform: translateX(98%); }
        .curtain-left.close { transform: translateX(0); }
        .curtain-right.close { transform: translateX(0); }
      `}</style>
    </div>
  )
}