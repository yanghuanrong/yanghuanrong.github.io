import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

function replayTap(event: PointerEvent<HTMLSpanElement>, element: HTMLSpanElement | null) {
  if (event.pointerType === 'mouse') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!element) return
  element.classList.remove('is-tap')
  void element.offsetWidth
  element.classList.add('is-tap')
}

export function RolePhrase({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  return (
    <span
      ref={ref}
      className="hero-role-trigger"
      onPointerDown={(event) => replayTap(event, ref.current)}
    >
      <span className="hero-role">{children}</span>
    </span>
  )
}

export function HopPhrase({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const chars = Array.from(text)
  return (
    <span
      ref={ref}
      className="hero-hop-trigger"
      onPointerDown={(event) => replayTap(event, ref.current)}
    >
      <span className="hero-hop-units">
        {chars.map((char, index) => (
          <span key={`${char}-${index}`} className="hero-hop-unit">
            {char}
          </span>
        ))}
      </span>
    </span>
  )
}

export function WavePhrase({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  return (
    <span
      ref={ref}
      className="hero-wave-trigger"
      onPointerDown={(event) => replayTap(event, ref.current)}
    >
      <span className="hero-wave">{children}</span>
    </span>
  )
}

export function ShutterPhrase({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  const start = () => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    element.classList.add('is-shutter')
  }

  const stop = () => {
    ref.current?.classList.remove('is-shutter')
  }

  return (
    <span
      ref={ref}
      className="hero-shutter-trigger"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') start()
      }}
      onPointerLeave={stop}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse') return
        start()
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      <span className="hero-shutter">{children}</span>
    </span>
  )
}

export function DrivePhrase({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const lines = [
    { y: '-0.58em', w: '1.35em', h: '2.5px', d: '0ms', s: '0.22s' },
    { y: '-0.2em', w: '1.8em', h: '1.5px', d: '40ms', s: '0.18s' },
    { y: '0.16em', w: '1.5em', h: '2px', d: '20ms', s: '0.26s' },
    { y: '0.5em', w: '1.1em', h: '1.25px', d: '70ms', s: '0.2s' },
    { y: '0em', w: '1.05em', h: '3px', d: '55ms', s: '0.24s' },
  ]

  const start = () => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    element.classList.add('is-drive')
  }

  const stop = () => {
    ref.current?.classList.remove('is-drive')
  }

  return (
    <span
      ref={ref}
      className="hero-drive-trigger"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') start()
      }}
      onPointerLeave={stop}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse') return
        start()
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      <span className="hero-drive">
        <span className="hero-drive-text">{children}</span>
        {lines.map((line, index) => (
          <span
            key={index}
            className="hero-drive-line"
            style={
              {
                '--ly': line.y,
                '--lw': line.w,
                '--lh': line.h,
                '--delay': line.d,
                '--speed': line.s,
              } as CSSProperties
            }
            aria-hidden="true"
          />
        ))}
      </span>
    </span>
  )
}
