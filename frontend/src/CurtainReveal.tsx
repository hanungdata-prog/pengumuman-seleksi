import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, PanInfo } from 'framer-motion'
import confetti from 'canvas-confetti'

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

export default function CurtainReveal({ result, curtainStage, onOpenCurtain, whatsappGroupLink }: CurtainRevealProps) {
  const controls = useAnimation()
  const ropeY = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [showCountdown, setShowCountdown] = useState(false)
  const [currentCount, setCurrentCount] = useState(5)
  const ropeRef = useRef<HTMLDivElement>(null)
  const audioRefs = useRef<HTMLAudioElement[]>([])
  
  // Maximum pull distance before curtain opens (in pixels)
  const MAX_PULL = 200
  const COUNTDOWN_START = 5

  useEffect(() => {
    // Preload audio files
    const sounds: HTMLAudioElement[] = []
    ;[5, 4, 3, 2, 1].forEach((num) => {
      const audio = new Audio(`/sounds/countdown-${num}.mp3`)
      audio.volume = 0.5
      sounds.push(audio)
    })
    audioRefs.current = sounds
  }, [])

  const playCountdownSound = (number: number) => {
    const index = 5 - number
    if (audioRefs.current[index]) {
      audioRefs.current[index].play().catch(err => 
        console.error(`Audio countdown-${number} failed:`, err)
      )
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
    setShowCountdown(true)
    setCurrentCount(COUNTDOWN_START)
    playCountdownSound(COUNTDOWN_START)
  }

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Calculate pull distance (only downward movement)
    const distance = Math.max(0, info.offset.y)
    const limitedDistance = Math.min(distance, MAX_PULL)
    setPullDistance(limitedDistance)
    ropeY.set(limitedDistance)

    // Calculate countdown based on pull distance
    const countdownStep = Math.floor((limitedDistance / MAX_PULL) * 5)
    const newCount = Math.max(1, 5 - countdownStep)
    
    if (newCount !== currentCount && newCount >= 1 && newCount <= 5) {
      setCurrentCount(newCount)
      playCountdownSound(newCount)
    }
  }

  const handleDragEnd = async () => {
    setIsDragging(false)
    setShowCountdown(false)

    // If pulled all the way, open curtain
    if (pullDistance >= MAX_PULL) {
      // Animate rope swinging back
      await controls.start({
        rotate: [0, -15, 15, -10, 10, -5, 5, 0],
        transition: { duration: 1.2, ease: "easeOut" }
      })
      
      // Open curtain
      if (onOpenCurtain) {
        onOpenCurtain()
      }
    } else {
      // Spring back if not pulled enough
      controls.start({
        y: 0,
        rotate: [0, -10, 8, -5, 3, 0],
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.8
        }
      })
    }
    
    setPullDistance(0)
    ropeY.set(0)
    setCurrentCount(5)
  }

  // Calculate rope length based on pull distance
  const ropeLength = 120 + pullDistance * 0.5
  const tasselOffset = pullDistance * 0.3

  return (
    <div className="curtain-container fixed inset-0 z-50 overflow-hidden">
      {/* Stage Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7a4f00] via-[#3a2000] to-[#0a0704]" />

      {/* Floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[35%] bg-gradient-to-t from-[rgba(240,192,64,0.35)] to-transparent pointer-events-none" />

      {/* Spotlight */}
      <div className="spotlight absolute -top-1/2 left-1/2 -translate-x-1/2 w-[520px] h-[180%] bg-[conic-gradient(from_0deg_at_50%_0%,transparent_60%,rgba(255,220,80,0.08)_75%,rgba(255,220,80,0.14)_80%,rgba(255,220,80,0.08)_85%,transparent_100%)] animate-spotlight-flicker z-10" />

      {/* Curtain Rings Rail */}
      <div className="absolute top-[80px] left-0 right-0 h-8 z-30">
        <div className="relative max-w-4xl mx-auto px-8">
          {/* Rail */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f0c040] via-[#ffd700] to-[#f0c040] rounded-full shadow-[0_0_15px_rgba(240,192,64,0.8)]" />
          
          {/* Decorative rings */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-[-8px] w-6 h-6 rounded-full border-4 border-[#f0c040] bg-[#8b6910] shadow-[0_0_10px_rgba(240,192,64,0.6)]"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Left Curtain with Physics */}
      <motion.div
        className="curtain curtain-left absolute left-0 top-0 w-1/2 h-full z-20"
        animate={{
          x: curtainStage === 'open' ? '-98%' : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20,
          duration: 2
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a00] via-[#5c1a00] to-[#1a0500]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(0,0,0,0.15)_18px,rgba(255,255,255,0.05)_36px,rgba(0,0,0,0.1)_54px)]" />
        <div className="absolute right-0 top-0 bottom-0 w-[14px] bg-gradient-to-b from-[#f0c040] via-[#b88a00] to-[#f0c040] shadow-[0_0_18px_4px_rgba(240,192,64,0.6)]" />
        
        {/* Curtain folds effect */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 41px)'
          }}
        />
      </motion.div>

      {/* Right Curtain with Physics */}
      <motion.div
        className="curtain curtain-right absolute right-0 top-0 w-1/2 h-full z-20"
        animate={{
          x: curtainStage === 'open' ? '98%' : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20,
          duration: 2
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a00] via-[#5c1a00] to-[#1a0500]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(0,0,0,0.15)_18px,rgba(255,255,255,0.05)_36px,rgba(0,0,0,0.1)_54px)]" />
        <div className="absolute left-0 top-0 bottom-0 w-[14px] bg-gradient-to-b from-[#f0c040] via-[#b88a00] to-[#f0c040] shadow-[0_0_18px_4px_rgba(240,192,64,0.6)]" />
        
        {/* Curtain folds effect */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 41px)'
          }}
        />
      </motion.div>

      {/* Pelmet */}
      <div className="pelmet absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#1a0700] to-[#3d1000] z-30 border-b border-[rgba(240,192,64,0.3)]">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f0c040] to-transparent" />
      </div>

      {/* Interactive Rope with Tassel */}
      {curtainStage === 'closed' && result && (
        <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
          {/* Rope */}
          <motion.div
            ref={ropeRef}
            drag="y"
            dragConstraints={{ top: 0, bottom: MAX_PULL }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ y: ropeY }}
            className="relative cursor-grab active:cursor-grabbing"
          >
            {/* Rope line with physics-based stretching */}
            <svg
              width="20"
              height={ropeLength}
              viewBox={`0 0 20 ${ropeLength}`}
              className="overflow-visible"
            >
              {/* Rope shadow */}
              <path
                d={`M10,0 Q15,${ropeLength * 0.3} 10,${ropeLength}`}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{
                  filter: 'blur(2px)'
                }}
              />
              
              {/* Main rope with twisted texture */}
              <path
                d={`M10,0 Q${isDragging ? 12 : 8},${ropeLength * 0.3} 10,${ropeLength}`}
                stroke="#8B7355"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M10,0 Q${isDragging ? 8 : 12},${ropeLength * 0.6} 10,${ropeLength}`}
                stroke="#A0522D"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              
              {/* Rope highlights */}
              <path
                d={`M10,2 Q${isDragging ? 13 : 7},${ropeLength * 0.4} 10,${ropeLength - 2}`}
                stroke="#D2691E"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>

            {/* Tassel */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{ 
                top: ropeLength - 30,
                rotate: isDragging ? pullDistance * 0.2 : 0
              }}
              animate={{
                rotate: [0, -5, 5, -3, 3, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Tassel cap */}
              <div className="w-12 h-8 bg-gradient-to-b from-[#DAA520] to-[#B8860B] rounded-t-full rounded-b-lg shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                <div className="w-full h-1 bg-[#FFD700] mt-1" />
              </div>
              
              {/* Tassel strands */}
              <div className="relative -mt-2">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 bg-gradient-to-b from-[#DAA520] to-[#8B6910] rounded-full"
                    style={{
                      height: 40 + Math.sin(i) * 10,
                      left: i * 3 - 20,
                      transformOrigin: 'top',
                      rotate: isDragging 
                        ? Math.sin(i + pullDistance * 0.05) * 15 
                        : Math.sin(i + Date.now() * 0.002) * 5
                    }}
                    animate={{
                      rotate: Math.sin(i) * 5
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Pull indicator */}
          <motion.div
            className="mt-8 text-[#f0c040] text-sm font-semibold"
            animate={{
              opacity: isDragging ? 1 : 0.6,
              scale: isDragging ? 1.1 : 1
            }}
          >
            {isDragging ? (
              <span className="flex items-center gap-2">
                <span className="w-16 h-1 bg-[#f0c040] rounded-full">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${(pullDistance / MAX_PULL) * 100}%` }}
                  />
                </span>
                <span>Tarik lebih {MAX_PULL - Math.round(pullDistance)}px lagi</span>
              </span>
            ) : (
              'Tarik Tali untuk Membuka Tirai'
            )}
          </motion.div>
        </div>
      )}

      {/* Countdown Display */}
      {showCountdown && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <motion.div
            key={currentCount}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-9xl font-bold text-[#f0c040] font-['Cinzel_Decorative']"
            style={{
              textShadow: '0 0 40px rgba(240,192,64,0.8), 0 0 80px rgba(240,192,64,0.4)'
            }}
          >
            {currentCount}
          </motion.div>
        </div>
      )}

      {/* Result Content */}
      {result && curtainStage === 'open' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-40 px-6"
        >
          <div className="w-full max-w-sm text-center">
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${
                result.status === 'diterima' ? 'bg-green-100' : 'bg-orange-100'
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
            <div className={`px-6 py-4 rounded-xl border-2 mb-6 ${
              result.status === 'diterima' 
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
            <p className={`text-sm md:text-base italic mb-8 leading-relaxed ${
              result.status === 'diterima' ? 'text-green-400' : 'text-orange-400'
            }`}>
              {result.status === 'diterima'
                ? 'Selamat bergabung! Kami tunggu kontribusi terbaik Anda.'
                : 'Jangan berkecil hati! Kegagalan hari ini adalah persimpangan menuju kesuksesan yang lebih besar.'}
            </p>

            {/* CTA Button */}
            {result.status === 'diterima' && whatsappGroupLink && (
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
            )}
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes spotlight-flicker {
          0%, 100% { opacity: 0.8; transform: scale(1) translateX(-50%); }
          25% { opacity: 0.9; transform: scale(1.02) translateX(-48%); }
          75% { opacity: 0.7; transform: scale(0.98) translateX(-52%); }
        }
        
        .animate-spotlight-flicker {
          animation: spotlight-flicker 4s ease-in-out infinite;
        }
        
        .curtain-left {
          transform-origin: left center;
          box-shadow: 5px 0 15px rgba(0,0,0,0.5);
        }
        
        .curtain-right {
          transform-origin: right center;
          box-shadow: -5px 0 15px rgba(0,0,0,0.5);
        }
        
        /* Rope glow effect when dragging */}
        .cursor-grabbing svg {
          filter: drop-shadow(0 0 10px rgba(240,192,64,0.8));
        }
      `}</style>
    </div>
  )
}
