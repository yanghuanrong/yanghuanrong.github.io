import { useRef, type PointerEvent, type ReactNode } from 'react'

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
