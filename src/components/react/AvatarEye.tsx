import { useEffect, useId, useRef } from 'react'

const MAX_OFFSET = 1.8
const LERP = 0.22

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function isTouchDevice() {
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) return true
  if (/android/.test(ua)) return true
  if (ua.includes('mac os') && 'ontouchend' in document) return true
  return false
}

function nextBlinkDelay() {
  // Resting blink cadence sits around every 4–7s; sometimes quicker.
  return 3200 + Math.random() * 3600
}

export default function AvatarEye() {
  const socketRef = useRef<HTMLSpanElement>(null)
  const irisRef = useRef<HTMLSpanElement>(null)
  const glowId = useId().replace(/:/g, '')

  useEffect(() => {
    const socket = socketRef.current
    const iris = irisRef.current
    if (!socket || !iris) return
    if (isTouchDevice()) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const frame = socket.closest('.avatar-frame')
    if (!(frame instanceof HTMLElement)) return

    let raf = 0
    let current = { x: 0, y: 0 }
    let pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    const apply = (x: number, y: number) => {
      iris.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const targetFromPointer = () => {
      const rect = frame.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 }

      const nx = ((pointer.x - rect.left) / rect.width) * 2 - 1
      const ny = ((pointer.y - rect.top) / rect.height) * 2 - 1
      return {
        x: clamp(nx * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET),
        y: clamp(ny * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET),
      }
    }

    const tick = () => {
      const target = targetFromPointer()
      const next = {
        x: current.x + (target.x - current.x) * LERP,
        y: current.y + (target.y - current.y) * LERP,
      }
      const settled =
        Math.abs(target.x - next.x) < 0.05 && Math.abs(target.y - next.y) < 0.05
      current = settled ? target : next
      apply(current.x, current.y)
      raf = settled ? 0 : requestAnimationFrame(tick)
    }

    const kick = () => {
      if (raf === 0) raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY }
      kick()
    }

    const onReset = () => {
      const rect = frame.getBoundingClientRect()
      pointer = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onReset)
    window.addEventListener('blur', onReset)
    onReset()

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onReset)
      window.removeEventListener('blur', onReset)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer = 0
    let clearClassTimer = 0

    const schedule = (delay = nextBlinkDelay()) => {
      timer = window.setTimeout(() => {
        const doubleBlink = Math.random() < 0.18
        socket.classList.remove('is-blink', 'is-blink-double')
        void socket.offsetWidth
        socket.classList.add(doubleBlink ? 'is-blink-double' : 'is-blink')
        clearClassTimer = window.setTimeout(
          () => {
            socket.classList.remove('is-blink', 'is-blink-double')
            schedule()
          },
          doubleBlink ? 460 : 180,
        )
      }, delay)
    }

    schedule(1400 + Math.random() * 1200)

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(clearClassTimer)
      socket.classList.remove('is-blink', 'is-blink-double')
    }
  }, [])

  return (
    <span ref={socketRef} className="avatar-eye" aria-hidden="true">
      <span ref={irisRef} className="avatar-sharingan">
        <svg viewBox="0 0 64 64" width="100%" height="100%">
          <circle cx="32" cy="32" r="31" fill="#b01020" />
          <circle cx="32" cy="32" r="31" fill={`url(#${glowId})`} />
          <g fill="#120406">
            <path d="M32 10c5.2 0 8.8 4.4 7.4 9.1-1.2 4.1-5.6 5.6-9.4 3.4-2.1-1.2-3.3-2.9-3.6-5.1C25.8 13.2 28.4 10 32 10Z" />
            <path
              d="M32 10c5.2 0 8.8 4.4 7.4 9.1-1.2 4.1-5.6 5.6-9.4 3.4-2.1-1.2-3.3-2.9-3.6-5.1C25.8 13.2 28.4 10 32 10Z"
              transform="rotate(120 32 32)"
            />
            <path
              d="M32 10c5.2 0 8.8 4.4 7.4 9.1-1.2 4.1-5.6 5.6-9.4 3.4-2.1-1.2-3.3-2.9-3.6-5.1C25.8 13.2 28.4 10 32 10Z"
              transform="rotate(240 32 32)"
            />
          </g>
          <circle cx="32" cy="32" r="7.2" fill="#0a0304" />
          <circle cx="32" cy="32" r="30.2" fill="none" stroke="#2a070c" strokeWidth="1.4" />
          <defs>
            <radialGradient id={glowId} cx="35%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#ff4d5e" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#c41828" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7a0a14" stopOpacity="0.35" />
            </radialGradient>
          </defs>
        </svg>
      </span>
      <span className="avatar-lid" />
    </span>
  )
}
