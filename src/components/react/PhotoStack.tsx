import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type TransitionEvent } from 'react'
import { createPortal } from 'react-dom'
import { photos } from '../../consts'

const PEEK_COUNT = 3

const initialOrder = photos.map((_, index) => index)
/** Modal top card is last in `order`; peek shows the same last N photos (bottom → top). */
const peekPhotos = photos.slice(-PEEK_COUNT)

const restRotations = photos.map((_, index) => {
  const pattern = [-7.5, 6.5, -3, 5, -5.5, 3.5, -2, 7, -4]
  return pattern[index % pattern.length] ?? 0
})

const photoOrientation = (photo: (typeof photos)[number]) =>
  photo.height > photo.width ? 'portrait' : 'landscape'

const LEAVE_MS = 420
const THROW_DISTANCE = 96

type Mode = 'idle' | 'entering' | 'open' | 'leaving'

export default function PhotoStack() {
  const [mode, setMode] = useState<Mode>('idle')
  const [order, setOrder] = useState(initialOrder)
  const [mounted, setMounted] = useState(false)
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const [phase, setPhase] = useState<'idle' | 'drag' | 'snap' | 'fly' | 'incoming' | 'settle'>('idle')
  const [origin, setOrigin] = useState({ x: 0, y: 0, s: 0.12 })
  const peekRef = useRef<HTMLButtonElement>(null)
  const startRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef({ x: 0, y: 0 })
  const phaseRef = useRef(phase)
  const modeRef = useRef(mode)
  const leaveTimer = useRef(0)
  const flyTimer = useRef(0)
  const settleTimer = useRef(0)

  useEffect(() => {
    setMounted(true)
    return () => {
      window.clearTimeout(leaveTimer.current)
      window.clearTimeout(flyTimer.current)
      window.clearTimeout(settleTimer.current)
    }
  }, [])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    if (mode === 'idle') return
    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [mode === 'idle'])

  const measureOrigin = () => {
    const peek = peekRef.current
    if (!peek) return { x: 0, y: 0, s: 0.12 }
    const rect = peek.getBoundingClientRect()
    const card = peek.querySelector('.polaroid-peek')?.getBoundingClientRect()
    const modalWidth = Math.min(240, window.innerWidth * 0.68)
    return {
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
      s: Math.max(0.08, (card?.width ?? 28) / modalWidth),
    }
  }

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const openModal = () => {
    if (modeRef.current !== 'idle') return
    window.clearTimeout(leaveTimer.current)
    setOrder(initialOrder)
    setOrigin(measureOrigin())
    setDrag({ x: 0, y: 0 })
    dragRef.current = { x: 0, y: 0 }
    setPhase('idle')
    if (prefersReducedMotion()) {
      modeRef.current = 'open'
      setMode('open')
      return
    }
    modeRef.current = 'entering'
    setMode('entering')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (modeRef.current === 'entering') {
          modeRef.current = 'open'
          setMode('open')
        }
      })
    })
  }

  const closeModal = () => {
    if (modeRef.current === 'idle' || modeRef.current === 'leaving') return
    setPhase('idle')
    setDrag({ x: 0, y: 0 })
    dragRef.current = { x: 0, y: 0 }
    window.clearTimeout(leaveTimer.current)
    window.clearTimeout(flyTimer.current)
    window.clearTimeout(settleTimer.current)
    if (prefersReducedMotion()) {
      modeRef.current = 'idle'
      setMode('idle')
      return
    }
    modeRef.current = 'leaving'
    setMode('leaving')
    leaveTimer.current = window.setTimeout(() => {
      modeRef.current = 'idle'
      setMode('idle')
    }, LEAVE_MS)
  }

  const onStackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'transform') return
    if (event.target !== event.currentTarget) return
    if (modeRef.current !== 'leaving') return
    window.clearTimeout(leaveTimer.current)
    modeRef.current = 'idle'
    setMode('idle')
  }

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (modeRef.current !== 'open' || phaseRef.current !== 'idle') return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    startRef.current = { x: event.clientX, y: event.clientY }
    dragRef.current = { x: 0, y: 0 }
    setDrag({ x: 0, y: 0 })
    setPhase('drag')
  }

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (phaseRef.current !== 'drag') return
    const next = {
      x: event.clientX - startRef.current.x,
      y: event.clientY - startRef.current.y,
    }
    dragRef.current = next
    setDrag(next)
  }

  const finishDrag = () => {
    if (phaseRef.current !== 'drag') return
    const { x, y } = dragRef.current
    const distance = Math.hypot(x, y)
    if (distance > THROW_DISTANCE) {
      setPhase('fly')
      const thrown = { x: x * 4.2, y: y * 4.2 }
      dragRef.current = thrown
      setDrag(thrown)
      window.clearTimeout(flyTimer.current)
      window.clearTimeout(settleTimer.current)
      flyTimer.current = window.setTimeout(() => {
        setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)])
        dragRef.current = { x: 0, y: 0 }
        setDrag({ x: 0, y: 0 })
        phaseRef.current = 'incoming'
        setPhase('incoming')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (phaseRef.current !== 'incoming') return
            phaseRef.current = 'settle'
            setPhase('settle')
            settleTimer.current = window.setTimeout(() => {
              if (phaseRef.current === 'settle') {
                phaseRef.current = 'idle'
                setPhase('idle')
              }
            }, 480)
          })
        })
      }, 320)
      return
    }
    setPhase('snap')
    dragRef.current = { x: 0, y: 0 }
    setDrag({ x: 0, y: 0 })
    window.setTimeout(() => setPhase('idle'), 280)
  }

  const busy = mode !== 'idle'
  const hidden = mode === 'entering' || mode === 'open'

  return (
    <>
      <button
        ref={peekRef}
        type="button"
        className={`photo-peek${busy ? ' is-busy' : ''}${hidden ? ' is-hidden' : ''}`}
        aria-label="查看照片"
        onClick={openModal}
      >
        {peekPhotos.map((photo, index) => (
          <span
            key={photo.src}
            className={`polaroid polaroid-peek is-${photoOrientation(photo)}`}
            style={{ '--i': index, zIndex: index + 1 } as CSSProperties}
          >
            <img src={photo.src} alt="" />
          </span>
        ))}
      </button>

      {mounted &&
        busy &&
        createPortal(
          <div
            className={`photo-modal${mode === 'open' ? ' is-open' : ''}${mode === 'leaving' ? ' is-leaving' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="照片"
            style={{
              '--ox': `${origin.x}px`,
              '--oy': `${origin.y}px`,
              '--os': String(origin.s),
            } as CSSProperties}
          >
            <div className="photo-modal-backdrop" />
            <div
              className="photo-modal-stack"
              onTransitionEnd={onStackTransitionEnd}
            >
              {order.map((photoIndex, stackIndex) => {
                const photo = photos[photoIndex]
                const isTop = stackIndex === order.length - 1
                const rest = restRotations[photoIndex] ?? 0
                const isIncoming = stackIndex === 0 && (phase === 'incoming' || phase === 'settle')
                const transform = isTop && (phase === 'drag' || phase === 'snap' || phase === 'fly')
                  ? `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${rest + drag.x * 0.08}deg)`
                  : isIncoming && phase === 'incoming'
                    ? `translate3d(0, 28px, 0) scale(0.86) rotate(${rest}deg)`
                    : `rotate(${rest}deg)`

                const cardPhase = isIncoming
                  ? phase
                  : isTop && (phase === 'drag' || phase === 'snap' || phase === 'fly')
                    ? phase
                    : ''

                return (
                  <button
                    type="button"
                    key={photo.src}
                    className={`polaroid polaroid-modal is-${photoOrientation(photo)}${cardPhase ? ` is-${cardPhase}` : ''}`}
                    style={{
                      transform,
                      zIndex: stackIndex + 1,
                      pointerEvents: isTop && mode === 'open' && phase === 'idle' ? 'auto' : 'none',
                      ['--ar' as string]: `${photo.width} / ${photo.height}`,
                    }}
                    onPointerDown={isTop ? onPointerDown : undefined}
                    onPointerMove={isTop ? onPointerMove : undefined}
                    onPointerUp={isTop ? finishDrag : undefined}
                    onPointerCancel={isTop ? finishDrag : undefined}
                  >
                    <img src={photo.src} alt={photo.caption || ''} draggable={false} />
                    {photo.caption ? <span>{photo.caption}</span> : null}
                  </button>
                )
              })}
            </div>
            <button type="button" className="photo-close" onClick={closeModal}>
              关闭
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
